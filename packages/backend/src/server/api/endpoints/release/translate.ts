import * as fs from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import define from "@/server/api/define.js";
import translate from "@/misc/translate.js";
import type { Language } from "@/misc/langmap.js";
import RE2 from "re2";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

export const meta = {
	tags: ["meta"],
	description: "Translate changelog",

	requireCredential: true,
	requireCredentialPrivateMode: true,

	res: {
		type: "array",
		optional: false,
		nullable: false,
		items: {
			type: "string",
			optional: false,
			nullable: false,
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		targetLang: { type: "string" },
	},
	required: ["targetLang"],
} as const;

async function translateCommitMsg(msg: string, targetLang: Language) {
	const regex = new RE2(/^(.*) (\(by .*\))$/);
	const matches = regex.match(msg);

	if (matches == null) return msg;

	if (targetLang.startsWith("ja")) {
		const prefixes = {
			chore: "雑務",
			dev: "開発",
			docker: "Docker",
			docs: "ドキュメント",
			feat: "新機能",
			fix: "修正",
			hotfix: "緊急修正",
			locale: "翻訳",
			perf: "パフォーマンス",
			refactor: "再設計",
			style: "体裁",
		};

		for (const [prefix, translatedPrefix] of Object.entries(prefixes)) {
			if (msg.startsWith(`${prefix}:`))
				return `${translatedPrefix}: ${
					(await translate(matches[1].split(":")[1].trim(), "en", "ja")).text
				} ${matches[2]}`;
			if (msg.startsWith(`${prefix} (minor):`))
				return `${translatedPrefix}（小規模）: ${
					(await translate(matches[1].split(":")[1].trim(), "en", "ja")).text
				} ${matches[2]}`;
		}
	}
	return `${(await translate(matches[1], "en", targetLang)).text} ${
		matches[2]
	}`;
}

export default define(meta, paramDef, async (ps) => {
	const releaseNotes = (
		await fs.readFile(
			`${_dirname}/../../../../../../../neko/volume/CHANGELOG`,
			"utf-8",
		)
	)
		.trim()
		.split("\n");

	const promises = [];

	for (const msg of releaseNotes)
		promises.push(translateCommitMsg(msg, ps.targetLang as Language));

	return await Promise.all(promises);
});
