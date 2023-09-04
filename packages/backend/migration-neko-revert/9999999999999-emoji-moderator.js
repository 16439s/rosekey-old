export class EmojiModeratorRevert9999999999999 {
	name = "EmojiModeratorRevert9999999999999";

	async down(queryRunner) {
		await queryRunner.query(
			`CREATE TYPE "public"."user_emojimodperm_enum" AS ENUM('none', 'add', 'mod', 'full')`,
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "emojiModPerm" "public"."user_emojimodperm_enum" NOT NULL DEFAULT 'none'`,
		);
	}

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emojiModPerm"`);
		await queryRunner.query(`DROP TYPE "public"."user_emojimodperm_enum"`);
	}
}
