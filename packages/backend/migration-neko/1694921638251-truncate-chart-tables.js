export class TruncateChartTables1694921638251 {
	name = "TruncateChartTables1694921638251";

	async up(queryRunner) {
		await queryRunner.query(
			`TRUNCATE TABLE "__chart__ap_request" RESTART IDENTITY`,
		);
		await queryRunner.query(`TRUNCATE TABLE "__chart__drive" RESTART IDENTITY`);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart__federation" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart__hashtag" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart__instance" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart__network" RESTART IDENTITY`,
		);
		await queryRunner.query(`TRUNCATE TABLE "__chart__notes" RESTART IDENTITY`);
		await queryRunner.query(`TRUNCATE TABLE "__chart__users" RESTART IDENTITY`);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart__per_user_drive" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart__per_user_following" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart__per_user_notes" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart__per_user_reaction" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__ap_request" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__drive" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__federation" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__hashtag" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__instance" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__network" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__notes" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__users" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__per_user_following" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__per_user_notes" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__per_user_drive" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart_day__per_user_reaction" RESTART IDENTITY`,
		);
		await queryRunner.query(`TRUNCATE TABLE "__chart__test" RESTART IDENTITY`);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart__test_unique" RESTART IDENTITY`,
		);
		await queryRunner.query(
			`TRUNCATE TABLE "__chart__test_grouped" RESTART IDENTITY`,
		);
	}

	async down(queryRunner) {}
}
