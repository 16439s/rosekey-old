<template>
	<XWindow
		:initial-width="800"
		:can-resize="true"
		:front="true"
		@closed="emit('closed')"
	>
		<template #header>
			{{ i18n.ts.releaseNotes }}
		</template>
		<div class="asnohbod">
			<ul>
				<li v-for="(item, i) in notes" :key="i">{{ item }}</li>
			</ul>
		</div>
	</XWindow>
</template>

<script lang="ts" setup>
import XWindow from "@/components/MkWindow.vue";
import { i18n } from "@/i18n";

defineProps<{
	notes: string[];
}>();

const emit = defineEmits<{
	(ev: "closed"): void;
}>();
</script>

<style lang="scss" scoped>
.asnohbod {
	white-space: pre-wrap;
	font-size: 1.2em;
	padding: 5px 20px 10px;
}
</style>
