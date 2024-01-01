import * as fs from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import define from "@/server/api/define.js";
import config from "@/config/index.js";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

export const meta = {
	tags: ["meta"],
	description: "Get changelog",

	requireCredential: false,
	requireCredentialPrivateMode: false,
} as const;

export const paramDef = {
	type: "object",
	properties: {},
	required: [],
} as const;

export default define(meta, paramDef, async () => ({
	version: config.version,
	notes: await fs.readFile(
		`${_dirname}/../../../../../../neko/volume/CHANGELOG`,
		"utf-8",
	),
	screenshots: [],
}));
