import define from "@/server/api/define.js";
import { Ads } from "@/models/index.js";
import { makePaginationQuery } from "@/server/api/common/make-pagination-query.js";

export const meta = {
	tags: ["admin"],

	requireCredential: true,
	requireModerator: true,
} as const;

export const paramDef = {
	type: "object",
	properties: {
		limit: { type: "integer", minimum: 1, maximum: 100, default: 10 },
		sinceId: { type: "string", format: "misskey:id" },
		untilId: { type: "string", format: "misskey:id" },
	},
	required: [],
} as const;

export default define(meta, paramDef, async (ps) => {
	const query = makePaginationQuery(
		Ads.createQueryBuilder("ad"),
		ps.sinceId,
		ps.untilId,
	).andWhere("ad.expiresAt > :now", { now: new Date() });

	const ads = await query.take(ps.limit).getMany();

	return ads;
});
