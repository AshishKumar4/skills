#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const yes = args.has("--yes") || args.has("-y");
const force = args.has("--force") || args.has("-f");
const listOnly = args.has("--list");
const verifyOnly = args.has("--verify");

const skillNames = fs.readdirSync(path.join(repoRoot, "skills"))
	.filter((name) => fs.existsSync(path.join(repoRoot, "skills", name, "SKILL.md")))
	.sort();

function usage() {
	console.log(`OpenCode Agent Rules installer

Usage:
  opencode-agent-rules                 interactive install
  opencode-agent-rules --yes           install defaults
  opencode-agent-rules --dry-run       show what would happen
  opencode-agent-rules --list          list bundled skills
  opencode-agent-rules --verify        verify repo structure

Options:
  --target=global-opencode             ~/.config/opencode (default)
  --target=project-opencode            ./.opencode in current directory
  --target=global-claude               ~/.claude compatibility target
  --skills=all                         install all bundled skills (default)
  --skills=name1,name2                 install selected skills
  --no-agents                          install skills only
  --force                              overwrite without backups
`);
}

function getOption(prefix, fallback = undefined) {
	const found = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
	return found ? found.slice(prefix.length) : fallback;
}

function verifyRepo() {
	const required = ["AGENTS.md", "README.md", "skills"];
	for (const rel of required) {
		if (!fs.existsSync(path.join(repoRoot, rel))) throw new Error(`Missing ${rel}`);
	}
	for (const name of skillNames) {
		const skillPath = path.join(repoRoot, "skills", name, "SKILL.md");
		const content = fs.readFileSync(skillPath, "utf8");
		if (!content.includes(`name: ${name}`)) throw new Error(`Skill ${name} has mismatched frontmatter name`);
		if (!content.includes("description:")) throw new Error(`Skill ${name} is missing a description`);
	}
	return true;
}

function targetInfo(target) {
	if (target === "project-opencode") {
		return {
			label: "project OpenCode",
			base: path.resolve(process.cwd(), ".opencode"),
			agents: path.resolve(process.cwd(), "AGENTS.md"),
			skills: path.resolve(process.cwd(), ".opencode", "skills"),
		};
	}
	if (target === "global-claude") {
		return {
			label: "global Claude-compatible",
			base: path.join(process.env.HOME, ".claude"),
			agents: path.join(process.env.HOME, ".claude", "CLAUDE.md"),
			skills: path.join(process.env.HOME, ".claude", "skills"),
		};
	}
	return {
		label: "global OpenCode",
		base: path.join(process.env.HOME, ".config", "opencode"),
		agents: path.join(process.env.HOME, ".config", "opencode", "AGENTS.md"),
		skills: path.join(process.env.HOME, ".config", "opencode", "skills"),
	};
}

function backupIfNeeded(filePath) {
	if (force || dryRun || !fs.existsSync(filePath)) return;
	const stamp = new Date().toISOString().replace(/[:.]/g, "-");
	const backup = `${filePath}.backup-${stamp}`;
	fs.cpSync(filePath, backup, { recursive: true });
	console.log(`backup ${filePath} -> ${backup}`);
}

function copyDir(src, dest) {
	if (path.resolve(src) === path.resolve(dest)) {
		console.log(`skip ${dest} (source and destination are the same)`);
		return;
	}
	if (dryRun) {
		console.log(`[dry-run] copy ${src} -> ${dest}`);
		return;
	}
	backupIfNeeded(dest);
	fs.rmSync(dest, { recursive: true, force: true });
	fs.cpSync(src, dest, { recursive: true });
}

function copyFile(src, dest) {
	if (path.resolve(src) === path.resolve(dest)) {
		console.log(`skip ${dest} (source and destination are the same)`);
		return;
	}
	if (dryRun) {
		console.log(`[dry-run] copy ${src} -> ${dest}`);
		return;
	}
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	backupIfNeeded(dest);
	fs.copyFileSync(src, dest);
}

async function askChoices() {
	if (yes) {
		return {
			target: getOption("--target=", "global-opencode"),
			installAgents: !args.has("--no-agents"),
			skills: parseSkills(getOption("--skills=", "all")),
		};
	}
	const rl = readline.createInterface({ input, output });
	try {
		console.log("OpenCode Agent Rules installer\n");
		console.log("Targets:");
		console.log("  1. global OpenCode        ~/.config/opencode");
		console.log("  2. project OpenCode       ./AGENTS.md + ./.opencode/skills");
		console.log("  3. global Claude-compatible ~/.claude");
		const targetAnswer = (await rl.question("Target [1]: ")).trim();
		const target = targetAnswer === "2" ? "project-opencode" : targetAnswer === "3" ? "global-claude" : "global-opencode";
		const installAgents = !/^n/i.test((await rl.question("Install AGENTS.md/CLAUDE.md? [Y/n]: ")).trim());
		console.log(`\nSkills:\n  ${skillNames.join("\n  ")}`);
		const skillAnswer = (await rl.question("Skills to install [all]: ")).trim();
		return { target, installAgents, skills: parseSkills(skillAnswer || "all") };
	} finally {
		rl.close();
	}
}

function parseSkills(value) {
	if (!value || value === "all") return skillNames;
	const requested = value.split(",").map((item) => item.trim()).filter(Boolean);
	for (const name of requested) {
		if (!skillNames.includes(name)) throw new Error(`Unknown skill: ${name}`);
	}
	return requested;
}

async function main() {
	if (args.has("--help") || args.has("-h")) {
		usage();
		return;
	}
	if (listOnly) {
		for (const name of skillNames) console.log(name);
		return;
	}
	verifyRepo();
	if (verifyOnly) {
		console.log("OK: repo structure valid");
		return;
	}
	const choices = await askChoices();
	const target = targetInfo(choices.target);
	console.log(`\nInstalling to ${target.label}: ${target.base}`);
	if (choices.installAgents) {
		const src = path.join(repoRoot, "AGENTS.md");
		copyFile(src, target.agents);
	}
	if (!dryRun) fs.mkdirSync(target.skills, { recursive: true });
	else console.log(`[dry-run] mkdir -p ${target.skills}`);
	for (const name of choices.skills) {
		copyDir(path.join(repoRoot, "skills", name), path.join(target.skills, name));
	}
	console.log("\nDone.");
	console.log(`Installed skills: ${choices.skills.join(", ")}`);
	if (dryRun) console.log("Dry run only. No files were changed.");
}

main().catch((error) => {
	console.error(`error: ${error.message}`);
	process.exit(1);
});
