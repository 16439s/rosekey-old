import define from "@/server/api/define.js";
import { ApiError } from "@/server/api/error.js";
import { GalleryPosts } from "@/models/index.js";

export const meta = {
	tags: ["gallery"],

	requireCredential: false,
	requireCredentialPrivateMode: true,

	errors: {
		noSuchPost: {
			message: "No such post.",
			code: "NO_SUCH_POST",
			id: "1137bf14-c5b0-4604-85bb-5b5371b1cd45",
		},
	},

	res: {
		type: "object",
		optional: false,
		nullable: false,
		ref: "GalleryPost",
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		postId: { type: "string", format: "misskey:id" },
	},
	required: ["postId"],
} as const;

export default define(meta, paramDef, async (ps, me) => {
	const post = await GalleryPosts.findOneBy({
		id: ps.postId,
	});

	if (post == null) {
		throw new ApiError(meta.errors.noSuchPost);
	}

	return await GalleryPosts.pack(post, me);
});
