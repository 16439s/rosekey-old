import { NoteFavorites } from "@/models/index.js";
import define from "@/server/api/define.js";
import { ApiError } from "@/server/api/error.js";
import { getNote } from "@/server/api/common/getters.js";

export const meta = {
	tags: ["notes", "favorites"],

	requireCredential: true,

	kind: "write:favorites",

	errors: {
		noSuchNote: {
			message: "No such note.",
			code: "NO_SUCH_NOTE",
			id: "80848a2c-398f-4343-baa9-df1d57696c56",
		},

		notFavorited: {
			message: "You have not marked that note a favorite.",
			code: "NOT_FAVORITED",
			id: "b625fc69-635e-45e9-86f4-dbefbef35af5",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		noteId: { type: "string", format: "misskey:id" },
	},
	required: ["noteId"],
} as const;

export default define(meta, paramDef, async (ps, user) => {
	// Get favoritee
	const note = await getNote(ps.noteId, user).catch((err) => {
		if (err.id === "9725d0ce-ba28-4dde-95a7-2cbb2c15de24")
			throw new ApiError(meta.errors.noSuchNote);
		throw err;
	});

	// if already favorited
	const favorite = await NoteFavorites.findOneBy({
		noteId: note.id,
		userId: user.id,
	});

	if (favorite == null) {
		throw new ApiError(meta.errors.notFavorited);
	}

	// Delete favorite
	await NoteFavorites.delete(favorite.id);
});
