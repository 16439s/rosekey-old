<template>
	<MkStickyContainer>
		<template #header
			><MkPageHeader :actions="headerActions" :tabs="headerTabs"
		/></template>
		<MkSpacer :content-max="600" :margin-min="16">
			<FormInfo warn>{{
				i18n.ts.editTheseSettingsMayBreakAccount
			}}</FormInfo>

			<template v-if="value">
				<FormSplit>
					<MkKeyValue class="_formBlock">
						<template #key>{{ i18n.ts._registry.domain }}</template>
						<template #value>{{ i18n.ts.system }}</template>
					</MkKeyValue>
					<MkKeyValue class="_formBlock">
						<template #key>{{ i18n.ts._registry.scope }}</template>
						<template #value>{{ scope.join("/") }}</template>
					</MkKeyValue>
					<MkKeyValue class="_formBlock">
						<template #key>{{ i18n.ts._registry.key }}</template>
						<template #value>{{ key }}</template>
					</MkKeyValue>
				</FormSplit>

				<FormTextarea
					v-model="valueForEditor"
					tall
					class="_formBlock _monospace"
				>
					<template #label>{{ i18n.ts.value }} (JSON)</template>
				</FormTextarea>

				<MkButton class="_formBlock" primary @click="save"
					><i :class="icon('ph-floppy-disk-back')"></i>
					{{ i18n.ts.save }}</MkButton
				>

				<MkKeyValue class="_formBlock">
					<template #key>{{ i18n.ts.updatedAt }}</template>
					<template #value
						><MkTime :time="value.updatedAt" mode="detail"
					/></template>
				</MkKeyValue>

				<MkButton danger @click="del"
					><i :class="icon('ph-trash')"></i>
					{{ i18n.ts.delete }}</MkButton
				>
			</template>
		</MkSpacer>
	</MkStickyContainer>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import JSON5 from "json5";
import * as os from "@/os";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import MkButton from "@/components/MkButton.vue";
import MkKeyValue from "@/components/MkKeyValue.vue";
import FormTextarea from "@/components/form/textarea.vue";
import FormSplit from "@/components/form/split.vue";
import FormInfo from "@/components/MkInfo.vue";
import icon from "@/scripts/icon";

const props = defineProps<{
	path: string;
}>();

const scope = computed(() => props.path.split("/").slice(0, -1));
const key = computed(() => props.path.split("/").at(-1));

const value = ref(null);
const valueForEditor = ref(null);

function fetchValue() {
	os.api("i/registry/get-detail", {
		scope: scope.value,
		key: key.value,
	}).then((res) => {
		value.value = res;
		valueForEditor.value = JSON5.stringify(res.value, null, "\t");
	});
}

async function save() {
	try {
		JSON5.parse(valueForEditor.value);
	} catch (err) {
		os.alert({
			type: "error",
			text: i18n.ts.invalidValue,
		});
		return;
	}
	os.confirm({
		type: "warning",
		text: i18n.ts.saveConfirm,
	}).then(({ canceled }) => {
		if (canceled) return;
		os.apiWithDialog("i/registry/set", {
			scope: scope.value,
			key: key.value,
			value: JSON5.parse(valueForEditor.value),
		});
	});
}

function del() {
	os.confirm({
		type: "warning",
		text: i18n.ts.deleteConfirm,
	}).then(({ canceled }) => {
		if (canceled) return;
		os.apiWithDialog("i/registry/remove", {
			scope: scope.value,
			key: key.value,
		});
	});
}

watch(() => props.path, fetchValue, { immediate: true });

const headerActions = computed(() => []);

const headerTabs = computed(() => []);

definePageMetadata({
	title: i18n.ts.registry,
	icon: `${icon("ph-gear-six")}`,
});
</script>
