import { Users, Followings } from "@/models/index.js";
import define from "@/server/api/define.js";
import { generateMutedUserQueryForUsers } from "@/server/api/common/generate-muted-user-query.js";
import {
	generateBlockedUserQuery,
	generateBlockQueryForUsers,
} from "@/server/api/common/generate-block-query.js";
import { DAY } from "@/const.js";

export const meta = {
	tags: ["users"],

	requireCredential: true,

	kind: "read:account",

	description:
		"Show users that the authenticated user might be interested to follow.",

	res: {
		type: "array",
		optional: false,
		nullable: false,
		items: {
			type: "object",
			optional: false,
			nullable: false,
			ref: "UserDetailed",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		limit: { type: "integer", minimum: 1, maximum: 100, default: 10 },
		offset: { type: "integer", default: 0 },
	},
	required: [],
} as const;

export default define(meta, paramDef, async (ps, me) => {
	const query = Users.createQueryBuilder("user")
		.where("user.isLocked = FALSE")
		.andWhere("user.isExplorable = TRUE")
		.andWhere("user.host IS NULL")
		.andWhere("user.updatedAt >= :date", {
			date: new Date(Date.now() - 7 * DAY),
		})
		.andWhere("user.id != :meId", { meId: me.id })
		.orderBy("user.followersCount", "DESC");

	generateMutedUserQueryForUsers(query, me);
	generateBlockQueryForUsers(query, me);
	generateBlockedUserQuery(query, me);

	const followingQuery = Followings.createQueryBuilder("following")
		.select("following.followeeId")
		.where("following.followerId = :followerId", { followerId: me.id });

	query.andWhere(`user.id NOT IN (${followingQuery.getQuery()})`);

	query.setParameters(followingQuery.getParameters());

	const users = await query.take(ps.limit).skip(ps.offset).getMany();

	return await Users.packMany(users, me, { detail: true });
});
