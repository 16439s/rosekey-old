<template>
	<span
		v-if="disableLink"
		v-user-preview="disablePreview ? undefined : user.id"
		class="eiwwqkts _noSelect"
		:class="{
			cat: show && user.isCat,
			square: user.isCat ? false : defaultStore.state.squareAvatars,
		}"
		:style="{ color }"
		:title="acct(user)"
		@click="onClick"
	>
		<img v-if="show" class="inner" :src="url" decoding="async" />
		<MkUserOnlineIndicator
			v-if="showIndicator && user.instance == null"
			class="indicator"
			:user="user"
		/>
	</span>
	<MkA
		v-else
		v-user-preview="disablePreview ? undefined : user.id"
		class="eiwwqkts _noSelect"
		:class="{
			cat: show && user.isCat,
			square: user.isCat ? false : defaultStore.state.squareAvatars,
		}"
		:style="{ color }"
		:to="userPage(user)"
		:title="acct(user)"
		:target="target"
		@click.stop
	>
		<img v-if="show" class="inner" :src="url" decoding="async" />
		<MkUserOnlineIndicator
			v-if="showIndicator && user.instance == null"
			class="indicator"
			:user="user"
		/>
	</MkA>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type * as firefish from "firefish-js";
import { getStaticImageUrl } from "@/scripts/get-static-image-url";
import { extractAvgColorFromBlurhash } from "@/scripts/extract-avg-color-from-blurhash";
import { acct, userPage } from "@/filters/user";
import MkUserOnlineIndicator from "@/components/MkUserOnlineIndicator.vue";
import { defaultStore } from "@/store";
import { $i } from "@/reactiveAccount";

const props = withDefaults(
	defineProps<{
		user: firefish.entities.User;
		target?: string | null;
		disableLink?: boolean;
		disablePreview?: boolean;
		showIndicator?: boolean;
	}>(),
	{
		target: null,
		disableLink: false,
		disablePreview: false,
		showIndicator: false,
	},
);

const emit = defineEmits<{
	(ev: "click", v: MouseEvent): void;
}>();

const url = computed(() =>
	defaultStore.state.disableShowingAnimatedImages
		? getStaticImageUrl(props.user.avatarUrl)
		: props.user.avatarUrl,
);

const show = !defaultStore.state.hideMyIcon || $i.id !== props.user.id;

function onClick(ev: MouseEvent) {
	emit("click", ev);
}

const color = ref();

watch(
	() => props.user.avatarBlurhash,
	() => {
		color.value = extractAvgColorFromBlurhash(props.user.avatarBlurhash);
	},
	{
		immediate: true,
	},
);
</script>

<style lang="scss" scoped>
@keyframes earwiggleleft {
	0% {
		transform: rotate(37.6deg) skew(30deg);
	}
	25% {
		transform: rotate(10deg) skew(30deg);
	}
	50% {
		transform: rotate(20deg) skew(30deg);
	}
	75% {
		transform: rotate(0deg) skew(30deg);
	}
	100% {
		transform: rotate(37.6deg) skew(30deg);
	}
}

@keyframes earwiggleright {
	0% {
		transform: rotate(-37.6deg) skew(-30deg);
	}
	30% {
		transform: rotate(-10deg) skew(-30deg);
	}
	55% {
		transform: rotate(-20deg) skew(-30deg);
	}
	75% {
		transform: rotate(0deg) skew(-30deg);
	}
	100% {
		transform: rotate(-37.6deg) skew(-30deg);
	}
}

.eiwwqkts {
	position: relative;
	display: inline-block;
	vertical-align: bottom;
	flex-shrink: 0;
	border-radius: 100%;
	line-height: 16px;

	> .inner {
		position: absolute;
		bottom: 0;
		inset-inline-start: 0;
		inset-inline-end: 0;
		top: 0;
		border-radius: 100%;
		z-index: 1;
		overflow: hidden;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	> .indicator {
		position: absolute;
		z-index: 1;
		bottom: 0;
		inset-inline-start: 0;
		width: 18%;
		height: 18%;
	}

	&.square {
		border-radius: 20%;

		> .inner {
			border-radius: 20%;
		}
	}

	&.cat {
		&:before,
		&:after {
			background: #ebbcba;
			border: solid 4px currentColor;
			box-sizing: border-box;
			content: "";
			display: inline-block;
			height: 50%;
			width: 50%;
		}

		&:before {
			border-radius: 25% 75% 75%;
			transform: rotate(37.5deg) skew(30deg);
		}

		&:after {
			border-radius: 75% 25% 75% 75%;
			transform: rotate(-37.5deg) skew(-30deg);
		}

		&:hover {
			&:before {
				animation: earwiggleleft 1s infinite;
			}

			&:after {
				animation: earwiggleright 1s infinite;
			}
		}
	}
}
</style>
