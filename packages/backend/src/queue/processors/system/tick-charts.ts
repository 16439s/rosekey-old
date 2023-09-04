import type Bull from "bull";

import { queueLogger } from "../../logger.js";
import { activeUsersChart } from "@/services/chart/index.js";

const logger = queueLogger.createSubLogger("tick-charts");

export async function tickCharts(
	job: Bull.Job<Record<string, unknown>>,
	done: any,
): Promise<void> {
	logger.info("Tick charts...");
	await activeUsersChart.tick(false);
	logger.succ("All charts successfully ticked.");
	done();
}
