<template>
	<MkModal
		ref="modal"
		:z-priority="'middle'"
		@click="$refs.modal.close()"
		@closed="$emit('closed')"
	>
		<div :class="$style.root">
			<div :class="$style.title">
				<MkSparkle>{{ i18n.ts.misskeyUpdated }}</MkSparkle>
			</div>
			<div :class="$style.version">✨ {{ version }} 🚀</div>
			<!-- <div :class="$style.releaseNotes">
				<Mfm :text="data.notes" />
				<div v-if="data.screenshots.length > 0" style="max-width: 500">
					<img
						v-for="i in data.screenshots"
						:key="i"
						:src="i"
						alt="screenshot"
					/>
				</div>
			</div> -->
			<MkButton
				v-if="notes.length > 0"
				:class="$style.gotIt"
				full
				@click="openReleaseNotes"
				>{{ i18n.ts.whatIsNew }}</MkButton
			>
			<MkButton
				:class="$style.gotIt"
				primary
				full
				@click="$refs.modal.close()"
				>{{ i18n.ts.gotIt }}</MkButton
			>
		</div>
	</MkModal>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, shallowRef } from "vue";
import MkModal from "@/components/MkModal.vue";
import MkSparkle from "@/components/MkSparkle.vue";
import MkButton from "@/components/MkButton.vue";
import { version } from "@/config";
import { i18n } from "@/i18n";
import * as os from "@/os";

const modal = shallowRef<InstanceType<typeof MkModal>>();

const notes = ref([] as string[]);

os.api("release").then((res) => {
	notes.value = res.notes.trim().split("\n");
});

function openReleaseNotes(): void {
	os.popup(
		defineAsyncComponent(
			() => import("@/components/MkReleaseNotesWindow.vue"),
		),
		{
			notes: notes.value,
		},
		{},
		"closed",
	);
}
</script>

<style lang="scss" module>
.root {
	margin: auto;
	position: relative;
	padding: 32px;
	min-width: 320px;
	max-width: 480px;
	box-sizing: border-box;
	text-align: center;
	background: var(--panel);
	border-radius: var(--radius);
}

.title {
	font-weight: bold;
}

.version {
	margin: 1em 0;
}

.gotIt {
	margin: 8px 0 0 0;
}

.releaseNotes {
	> img {
		border-radius: 10px;
	}
}
</style>
