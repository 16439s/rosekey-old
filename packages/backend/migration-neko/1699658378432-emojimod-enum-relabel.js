export class EmojimodEnumRelabel1699658378432 {
	name = "EmojimodEnumRelabel1699658378432";

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TYPE "public"."user_emojimodperm_enum" RENAME VALUE 'none' TO 'unauthorized'`,
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TYPE "public"."user_emojimodperm_enum" RENAME VALUE 'unauthorized' TO 'none'`,
		);
	}
}
