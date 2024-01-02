import { ApiError } from "@/server/api/error.js";
import { getNote } from "@/server/api/common/getters.js";
import define from "@/server/api/define.js";
import translate from "@/misc/translate.js";
import type { Language } from "@/misc/langmap";

export const meta = {
	tags: ["notes"],

	requireCredential: true,
	requireCredentialPrivateMode: true,

	res: {
		type: "object",
		optional: false,
		nullable: false,
	},

	errors: {
		noSuchNote: {
			message: "No such note.",
			code: "NO_SUCH_NOTE",
			id: "bea9b03f-36e0-49c5-a4db-627a029f8971",
		},
		noteTextIsNull: {
			message: "The text of this note is null.",
			code: "NOTE_TEXT_IS_NULL",
			id: "c2794117-1a8d-4fe5-8925-0eca24ba47d0",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		noteId: { type: "string", format: "misskey:id" },
		targetLang: { type: "string" },
	},
	required: ["noteId", "targetLang"],
} as const;

export default define(meta, paramDef, async (ps, user) => {
	const note = await getNote(ps.noteId, user).catch((err) => {
		if (err.id === "9725d0ce-ba28-4dde-95a7-2cbb2c15de24")
			throw new ApiError(meta.errors.noSuchNote);
		throw err;
	});

	if (note.text == null) {
		throw new ApiError(meta.errors.noteTextIsNull);
	}

	return translate(
		note.text,
		note.lang as Language | null,
		ps.targetLang as Language,
	);
});
