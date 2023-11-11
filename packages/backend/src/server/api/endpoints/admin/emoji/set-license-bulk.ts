import define from "../../../define.js";
import { Emojis } from "@/models/index.js";
import { In } from "typeorm";
import { ApiError } from "../../../error.js";
import { db } from "@/db/postgre.js";

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
		license: {
			type: "string",
			nullable: true,
			description: "Use `null` to reset the license.",
		},
	},
	required: ["ids"],
} as const;

export default define(meta, paramDef, async (ps, me) => {
	// require emoji mod permission (or add permission if there is no license)
	if (!(me.isAdmin || me.isModerator || me.emojiModPerm === "unauthorized"))
		throw new ApiError(meta.errors.accessDenied);

	const emojis = await Emojis.findBy({
		id: In(ps.ids),
	});

	if (me.emojiModPerm === "add") {
		for (const emoji of emojis)
			if (emoji.license != null) throw new ApiError(meta.errors.accessDenied);
	}

	await Emojis.update(
		{
			id: In(ps.ids),
		},
		{
			updatedAt: new Date(),
			license: ps.license,
		},
	);

	await db.queryResultCache!.remove(["meta_emojis"]);
});
