import define from "../define.js";

export const meta = {
	tags: ["meta"],

	requireCredential: false,
	requireCredentialPrivateMode: true,
} as const;

export const paramDef = {
	type: "object",
	properties: {},
	required: [],
} as const;

export default define(meta, paramDef, async () => {
	let tag_name: string;
	const pattern = /&quot;version&quot;: &quot;(.*)&quot;,$/m;

	await fetch(
		"https://code.naskya.net/naskya/firefish/source-by/main/package.json",
	)
		.then((response) => response.text())
		.then((text) => {
			tag_name = pattern.exec(text)[1];
		});

	return {
		tag_name,
	};
});
