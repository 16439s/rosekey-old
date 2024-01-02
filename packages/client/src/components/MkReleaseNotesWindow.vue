<template>
	<XWindow
		:initial-width="800"
		:can-resize="true"
		:front="true"
		:buttons-right="buttonsRight"
		@closed="emit('closed')"
	>
		<template #header>
			{{ i18n.ts.releaseNotes }}
		</template>
		<div v-if="!translating && translations.length === 0" class="asnohbod">
			<ul>
				<li v-for="(item, i) in notes" :key="i">{{ item }}</li>
			</ul>
		</div>
		<MkLoading v-else-if="translating" mini />
		<div v-else class="asnohbod">
			<ul>
				<li v-for="(item, i) in translations" :key="i">
					{{ item }}
				</li>
			</ul>
		</div>
	</XWindow>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import XWindow from "@/components/MkWindow.vue";
import { i18n } from "@/i18n";
import { api } from "@/os";
import icon from "@/scripts/icon";

defineProps<{
	notes: string[];
}>();

const emit = defineEmits<{
	(ev: "closed"): void;
}>();

const translating = ref(false);
const translations = ref([] as string[]);

const lang = localStorage.getItem("lang");
const translateLang = localStorage.getItem("translateLang");

async function translate() {
	translating.value = true;
	translations.value = await api("release/translate", {
		targetLang: translateLang ?? lang ?? navigator.language,
	});
	translating.value = false;
}

const buttonsRight = computed(() => [
	{
		icon: `${icon("ph-translate")}`,
		title: i18n.ts.translate,
		onClick: translate,
	},
]);
</script>

<style lang="scss" scoped>
.asnohbod {
	white-space: pre-wrap;
	font-size: 1.2em;
	padding: 5px 20px 10px;
}
</style>
