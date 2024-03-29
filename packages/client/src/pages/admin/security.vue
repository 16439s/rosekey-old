<template>
	<MkStickyContainer>
		<template #header
			><MkPageHeader
				:actions="headerActions"
				:tabs="headerTabs"
				:display-back-button="true"
		/></template>
		<MkSpacer :content-max="700" :margin-min="16" :margin-max="32">
			<FormSuspense :p="init">
				<div class="_formRoot">
					<FormFolder class="_formBlock">
						<template #icon
							><i :class="icon('ph-robot')"></i
						></template>
						<template #label>{{ i18n.ts.botProtection }}</template>
						<template v-if="enableHcaptcha" #suffix
							>hCaptcha</template
						>
						<template v-else-if="enableRecaptcha" #suffix
							>reCAPTCHA</template
						>
						<template v-else #suffix
							>{{ i18n.ts.none }} ({{
								i18n.ts.notRecommended
							}})</template
						>

						<XBotProtection />
					</FormFolder>

					<FormFolder class="_formBlock">
						<template #icon
							><i :class="icon('ph-eye-slash')"></i
						></template>
						<template #label>{{
							i18n.ts.sensitiveMediaDetection
						}}</template>
						<template
							v-if="sensitiveMediaDetection === 'all'"
							#suffix
							>{{ i18n.ts.all }}</template
						>
						<template
							v-else-if="sensitiveMediaDetection === 'local'"
							#suffix
							>{{ i18n.ts.localOnly }}</template
						>
						<template
							v-else-if="sensitiveMediaDetection === 'remote'"
							#suffix
							>{{ i18n.ts.remoteOnly }}</template
						>
						<template v-else #suffix>{{ i18n.ts.none }}</template>

						<div class="_formRoot">
							<span class="_formBlock">{{
								i18n.ts._sensitiveMediaDetection.description
							}}</span>

							<FormRadios
								v-model="sensitiveMediaDetection"
								class="_formBlock"
							>
								<option value="none">{{ i18n.ts.none }}</option>
								<option value="all">{{ i18n.ts.all }}</option>
								<option value="local">
									{{ i18n.ts.localOnly }}
								</option>
								<option value="remote">
									{{ i18n.ts.remoteOnly }}
								</option>
							</FormRadios>

							<FormRange
								v-model="sensitiveMediaDetectionSensitivity"
								:min="0"
								:max="4"
								:step="1"
								:text-converter="(v) => `${v + 1}`"
								class="_formBlock"
							>
								<template #label>{{
									i18n.ts._sensitiveMediaDetection.sensitivity
								}}</template>
								<template #caption>{{
									i18n.ts._sensitiveMediaDetection
										.sensitivityDescription
								}}</template>
							</FormRange>

							<FormSwitch
								v-model="enableSensitiveMediaDetectionForVideos"
								class="_formBlock"
							>
								<template #label
									>{{
										i18n.ts._sensitiveMediaDetection
											.analyzeVideos
									}}<span class="_beta">{{
										i18n.ts.beta
									}}</span></template
								>
								<template #caption>{{
									i18n.ts._sensitiveMediaDetection
										.analyzeVideosDescription
								}}</template>
							</FormSwitch>

							<FormSwitch
								v-model="setSensitiveFlagAutomatically"
								class="_formBlock"
							>
								<template #label
									>{{
										i18n.ts._sensitiveMediaDetection
											.setSensitiveFlagAutomatically
									}}
									({{ i18n.ts.notRecommended }})</template
								>
								<template #caption>{{
									i18n.ts._sensitiveMediaDetection
										.setSensitiveFlagAutomaticallyDescription
								}}</template>
							</FormSwitch>

							<!-- 現状 false positive が多すぎて実用に耐えない
						<FormSwitch v-model="disallowUploadWhenPredictedAsPorn" class="_formBlock">
							<template #label>{{ i18n.ts._sensitiveMediaDetection.disallowUploadWhenPredictedAsPorn }}</template>
						</FormSwitch>
						-->

							<FormButton primary class="_formBlock" @click="save"
								><i :class="icon('ph-floppy-disk-back')"></i>
								{{ i18n.ts.save }}</FormButton
							>
						</div>
					</FormFolder>

					<FormFolder class="_formBlock">
						<template #label>Active Email Validation</template>
						<template v-if="enableActiveEmailValidation" #suffix
							>Enabled</template
						>
						<template v-else #suffix>Disabled</template>

						<div class="_formRoot">
							<span class="_formBlock">{{
								i18n.ts.activeEmailValidationDescription
							}}</span>
							<FormSwitch
								v-model="enableActiveEmailValidation"
								class="_formBlock"
								@update:modelValue="save"
							>
								<template #label>Enable</template>
							</FormSwitch>
						</div>
					</FormFolder>

					<FormFolder class="_formBlock">
						<template #label>Log IP address</template>
						<template v-if="enableIpLogging" #suffix
							>Enabled</template
						>
						<template v-else #suffix>Disabled</template>

						<div class="_formRoot">
							<FormSwitch
								v-model="enableIpLogging"
								class="_formBlock"
								@update:modelValue="save"
							>
								<template #label>Enable</template>
							</FormSwitch>
						</div>
					</FormFolder>

					<FormFolder class="_formBlock">
						<template #label>Summaly Proxy</template>

						<div class="_formRoot">
							<FormInput
								v-model="summalyProxy"
								class="_formBlock"
							>
								<template #prefix
									><i :class="icon('ph-link-simple')"></i
								></template>
								<template #label>Summaly Proxy URL</template>
							</FormInput>

							<FormButton primary class="_formBlock" @click="save"
								><i :class="icon('ph-floppy-disk-back')"></i>
								{{ i18n.ts.save }}</FormButton
							>
						</div>
					</FormFolder>

					<FormFolder class="_formBlock">
						<template #label>{{
							i18n.ts.instanceSecurity
						}}</template>

						<div class="_formRoot">
							<FormSwitch
								v-if="!privateMode"
								v-model="secureMode"
							>
								<template #label>{{
									i18n.ts.secureMode
								}}</template>
								<template #caption>{{
									i18n.ts.secureModeInfo
								}}</template>
							</FormSwitch>
							<FormSwitch v-model="privateMode">
								<template #label>{{
									i18n.ts.privateMode
								}}</template>
								<template #caption>{{
									i18n.ts.privateModeInfo
								}}</template>
							</FormSwitch>
							<FormTextarea
								v-if="privateMode"
								v-model="allowedHosts"
							>
								<template #label>{{
									i18n.ts.allowedInstances
								}}</template>
								<template #caption>{{
									i18n.ts.allowedInstancesDescription
								}}</template>
							</FormTextarea>
							<FormButton
								primary
								class="_formBlock"
								@click="saveInstance"
								><i :class="icon('ph-floppy-disk-back')"></i>
								{{ i18n.ts.save }}</FormButton
							>
						</div>
					</FormFolder>
				</div>
			</FormSuspense>
		</MkSpacer>
	</MkStickyContainer>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import XBotProtection from "./bot-protection.vue";
import FormFolder from "@/components/form/folder.vue";
import FormRadios from "@/components/form/radios.vue";
import FormSwitch from "@/components/form/switch.vue";
import FormSuspense from "@/components/form/suspense.vue";
import FormRange from "@/components/form/range.vue";
import FormInput from "@/components/form/input.vue";
import FormTextarea from "@/components/form/textarea.vue";
import FormButton from "@/components/MkButton.vue";
import * as os from "@/os";
import { fetchInstance } from "@/instance";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import icon from "@/scripts/icon";

const summalyProxy = ref("");
const enableHcaptcha = ref(false);
const enableRecaptcha = ref(false);
const sensitiveMediaDetection = ref("none");
const sensitiveMediaDetectionSensitivity = ref(0);
const setSensitiveFlagAutomatically = ref(false);
const enableSensitiveMediaDetectionForVideos = ref(false);
const enableIpLogging = ref(false);
const enableActiveEmailValidation = ref(false);

const secureMode = ref(false);
const privateMode = ref(false);
const allowedHosts = ref("");

async function init() {
	const meta = await os.api("admin/meta");
	summalyProxy.value = meta.summalyProxy;
	enableHcaptcha.value = meta.enableHcaptcha;
	enableRecaptcha.value = meta.enableRecaptcha;
	sensitiveMediaDetection.value = meta.sensitiveMediaDetection;
	sensitiveMediaDetectionSensitivity.value =
		meta.sensitiveMediaDetectionSensitivity === "veryLow"
			? 0
			: meta.sensitiveMediaDetectionSensitivity === "low"
				? 1
				: meta.sensitiveMediaDetectionSensitivity === "medium"
					? 2
					: meta.sensitiveMediaDetectionSensitivity === "high"
						? 3
						: meta.sensitiveMediaDetectionSensitivity === "veryHigh"
							? 4
							: 0;
	setSensitiveFlagAutomatically.value = meta.setSensitiveFlagAutomatically;
	enableSensitiveMediaDetectionForVideos.value =
		meta.enableSensitiveMediaDetectionForVideos;
	enableIpLogging.value = meta.enableIpLogging;
	enableActiveEmailValidation.value = meta.enableActiveEmailValidation;

	secureMode.value = meta.secureMode;
	privateMode.value = meta.privateMode;
	allowedHosts.value = meta.allowedHosts.join("\n");
}

function save() {
	os.apiWithDialog("admin/update-meta", {
		summalyProxy: summalyProxy.value,
		sensitiveMediaDetection: sensitiveMediaDetection.value,
		sensitiveMediaDetectionSensitivity:
			sensitiveMediaDetectionSensitivity.value === 0
				? "veryLow"
				: sensitiveMediaDetectionSensitivity.value === 1
					? "low"
					: sensitiveMediaDetectionSensitivity.value === 2
						? "medium"
						: sensitiveMediaDetectionSensitivity.value === 3
							? "high"
							: sensitiveMediaDetectionSensitivity.value === 4
								? "veryHigh"
								: 0,
		setSensitiveFlagAutomatically: setSensitiveFlagAutomatically.value,
		enableSensitiveMediaDetectionForVideos:
			enableSensitiveMediaDetectionForVideos.value,
		enableIpLogging: enableIpLogging.value,
		enableActiveEmailValidation: enableActiveEmailValidation.value,
	}).then(() => {
		fetchInstance();
	});
}

function saveInstance() {
	os.apiWithDialog("admin/update-meta", {
		secureMode: secureMode.value,
		privateMode: privateMode.value,
		allowedHosts: allowedHosts.value.split("\n"),
	}).then(() => {
		fetchInstance();
	});
}

const headerActions = computed(() => []);

const headerTabs = computed(() => []);

definePageMetadata({
	title: i18n.ts.security,
	icon: `${icon("ph-lock")}`,
});
</script>
