import { db } from "@/db/postgre.js";
import { Emojis } from "@/models/index.js";
import define from "@/server/api/define.js";
import { In } from "typeorm";

export const meta = {
	tags: ["admin", "emoji"],

	requireCredential: true,
	requireModerator: false,

	errors: {
		accessDenied: {
			message: "Access denied.",
			code: "ACCESS_DENIED",
			id: "fe8d7103-0ea8-4ec3-814d-f8b401dc69e9",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		ids: {
			type: "array",
			items: {
				type: "string",
				format: "misskey:id",
			},
		},
		aliases: {
			type: "array",
			items: {
				type: "string",
			},
		},
	},
	required: ["ids", "aliases"],
} as const;

export default define(meta, paramDef, async (ps, me) => {
	// require emoji mod permission (or add permission if there is no alias)
	if (!(me.isAdmin || me.isModerator || me.emojiModPerm === "unauthorized"))
		throw new ApiError(meta.errors.accessDenied);

	const emojis = await Emojis.findBy({
		id: In(ps.ids),
	});

	if (me.emojiModPerm === "add") {
		for (const emoji of emojis)
			if (emoji.aliases.length > 0)
				throw new ApiError(meta.errors.accessDenied);
	}

	for (const emoji of emojis) {
		await Emojis.update(emoji.id, {
			updatedAt: new Date(),
			aliases: [...new Set(emoji.aliases.concat(ps.aliases))],
		});
	}

	await db.queryResultCache?.remove(["meta_emojis"]);
});
