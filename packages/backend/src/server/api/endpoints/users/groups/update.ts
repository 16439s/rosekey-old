import { UserGroups } from "@/models/index.js";
import define from "@/server/api/define.js";
import { ApiError } from "@/server/api/error.js";

export const meta = {
	tags: ["groups"],

	requireCredential: true,

	kind: "write:user-groups",

	description: "Update the properties of a group.",

	res: {
		type: "object",
		optional: false,
		nullable: false,
		ref: "UserGroup",
	},

	errors: {
		noSuchGroup: {
			message: "No such group.",
			code: "NO_SUCH_GROUP",
			id: "9081cda3-7a9e-4fac-a6ce-908d70f282f6",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		groupId: { type: "string", format: "misskey:id" },
		name: { type: "string", minLength: 1, maxLength: 100 },
	},
	required: ["groupId", "name"],
} as const;

export default define(meta, paramDef, async (ps, me) => {
	// Fetch the group
	const userGroup = await UserGroups.findOneBy({
		id: ps.groupId,
		userId: me.id,
	});

	if (userGroup == null) {
		throw new ApiError(meta.errors.noSuchGroup);
	}

	await UserGroups.update(userGroup.id, {
		name: ps.name,
	});

	return await UserGroups.pack(userGroup.id);
});
