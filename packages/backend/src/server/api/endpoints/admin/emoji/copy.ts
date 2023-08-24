import define from "../../../define.js";
import { Emojis } from "@/models/index.js";
import { genId } from "@/misc/gen-id.js";
import { ApiError } from "../../../error.js";
import type { DriveFile } from "@/models/entities/drive-file.js";
import { uploadFromUrl } from "@/services/drive/upload-from-url.js";
import { publishBroadcastStream } from "@/services/stream.js";
import { db } from "@/db/postgre.js";
import { getEmojiSize } from "@/misc/emoji-meta.js";

export const meta = {
	tags: ["admin", "emoji"],

	requireCredential: true,
	requireModerator: false,

	errors: {
		noSuchEmoji: {
			message: "No such emoji.",
			code: "NO_SUCH_EMOJI",
			id: "e2785b66-dca3-4087-9cac-b93c541cc425",
		},
		accessDenied: {
			message: "Access denied.",
			code: "ACCESS_DENIED",
			id: "fe8d7103-0ea8-4ec3-814d-f8b401dc69e9",
		},
	},

	res: {
		type: "object",
		optional: false,
		nullable: false,
		properties: {
			id: {
				type: "string",
				optional: false,
				nullable: false,
				format: "id",
			},
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		emojiId: { type: "string", format: "misskey:id" },
	},
	required: ["emojiId"],
} as const;

export default define(meta, paramDef, async (ps, me) => {
	// require emoji mod permission
	if (
		!(me.isAdmin || me.isModerator || ["mod", "full"].includes(me.emojiModPerm))
	)
		throw new ApiError(meta.errors.accessDenied);

	const emoji = await Emojis.findOneBy({ id: ps.emojiId });

	if (emoji == null) {
		throw new ApiError(meta.errors.noSuchEmoji);
	}

	let driveFile: DriveFile;

	try {
		// Create file
		driveFile = await uploadFromUrl({
			url: emoji.originalUrl,
			user: null,
			force: true,
		});
	} catch (e) {
		throw new ApiError();
	}

	const size = await getEmojiSize(driveFile.url);

	const copied = await Emojis.insert({
		id: genId(),
		updatedAt: new Date(),
		name: emoji.name,
		host: null,
		aliases: [],
		originalUrl: driveFile.url,
		publicUrl: driveFile.webpublicUrl ?? driveFile.url,
		type: driveFile.webpublicType ?? driveFile.type,
		license: emoji.license,
		width: size.width || null,
		height: size.height || null,
	}).then((x) => Emojis.findOneByOrFail(x.identifiers[0]));

	await db.queryResultCache!.remove(["meta_emojis"]);

	publishBroadcastStream("emojiAdded", {
		emoji: await Emojis.pack(copied.id),
	});

	return {
		id: copied.id,
	};
});
