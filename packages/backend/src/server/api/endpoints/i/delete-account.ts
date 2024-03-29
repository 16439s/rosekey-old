import { UserProfiles, Users } from "@/models/index.js";
import { deleteAccount } from "@/services/delete-account.js";
import define from "@/server/api/define.js";
import { comparePassword } from "@/misc/password.js";

export const meta = {
	requireCredential: true,

	secure: true,
} as const;

export const paramDef = {
	type: "object",
	properties: {
		password: { type: "string" },
	},
	required: ["password"],
} as const;

export default define(meta, paramDef, async (ps, user) => {
	const profile = await UserProfiles.findOneByOrFail({ userId: user.id });
	const userDetailed = await Users.findOneByOrFail({ id: user.id });
	if (userDetailed.isDeleted) {
		return;
	}

	// Compare password
	const same = await comparePassword(ps.password, profile.password!);

	if (!same) {
		throw new Error("incorrect password");
	}

	await deleteAccount(user);
});
