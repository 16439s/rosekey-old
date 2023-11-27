import type Bull from "bull";

import { activeUsersChart } from "@/services/chart/index.js";
import { queueLogger } from "../../logger.js";

const logger = queueLogger.createSubLogger("clean-charts");

export async function cleanCharts(
	job: Bull.Job<Record<string, unknown>>,
	done: any,
): Promise<void> {
	logger.info("Clean charts...");
	await activeUsersChart.clean();
	logger.succ("All charts successfully cleaned.");
	done();
}
