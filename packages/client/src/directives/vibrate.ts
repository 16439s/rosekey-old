import { vibrate } from "@/scripts/vibrate";
import type { Directive } from "vue";

export default ({
	mounted(el, binding) {
		const pattern = (binding.value as VibratePattern) ?? 20;
		el.addEventListener("mousedown", () => {
			vibrate(pattern);
		});
	},
} as Directive);
