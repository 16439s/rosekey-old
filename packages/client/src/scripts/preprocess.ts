import { expandKaTeXMacro } from "@/scripts/katex-macro";
import { defaultStore } from "@/store";
import * as mfm from "mfm-js";

export default function (text: string): string {
	if (defaultStore.state.enableCustomKaTeXMacro) {
		const parsedKaTeXMacro =
			localStorage.getItem("customKaTeXMacroParsed") ?? "{}";
		const maxNumberOfExpansions = 200; // to prevent infinite expansion loops

		const nodes = mfm.parse(text);

		for (const node of nodes) {
			if (node.type === "mathInline" || node.type === "mathBlock") {
				node.props.formula = expandKaTeXMacro(
					node.props.formula,
					parsedKaTeXMacro,
					maxNumberOfExpansions,
				);
			}
		}

		text = mfm.toString(nodes);
	}

	return text;
}
