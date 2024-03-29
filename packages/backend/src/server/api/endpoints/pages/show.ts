import { IsNull } from "typeorm";
import { Pages, Users } from "@/models/index.js";
import type { Page } from "@/models/entities/page.js";
import define from "@/server/api/define.js";
import { ApiError } from "@/server/api/error.js";

export const meta = {
	tags: ["pages"],

	requireCredential: false,
	requireCredentialPrivateMode: true,

	res: {
		type: "object",
		optional: false,
		nullable: false,
		ref: "Page",
	},

	errors: {
		noSuchPage: {
			message: "No such page.",
			code: "NO_SUCH_PAGE",
			id: "222120c0-3ead-4528-811b-b96f233388d7",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	anyOf: [
		{
			properties: {
				pageId: { type: "string", format: "misskey:id" },
			},
			required: ["pageId"],
		},
		{
			properties: {
				name: { type: "string" },
				username: { type: "string" },
			},
			required: ["name", "username"],
		},
	],
} as const;

export default define(meta, paramDef, async (ps, user) => {
	let page: Page | null = null;

	if (ps.pageId) {
		page = await Pages.findOneBy({ id: ps.pageId });
	} else if (ps.name && ps.username) {
		const author = await Users.findOneBy({
			host: IsNull(),
			usernameLower: ps.username.toLowerCase(),
		});
		if (author) {
			page = await Pages.findOneBy({
				name: ps.name,
				userId: author.id,
			});
		}
	}

	if (page == null) {
		throw new ApiError(meta.errors.noSuchPage);
	}

	if (!page.isPublic && (user == null || page.userId !== user.id)) {
		throw new ApiError(meta.errors.noSuchPage);
	}

	return await Pages.pack(page, user);
});
