<template>
	<Mfm
		v-if="show"
		:class="$style.root"
		:text="user.name ?? user.username"
		:plain="true"
		:nowrap="nowrap"
		:custom-emojis="user.emojis"
	/>
</template>

<script lang="ts" setup>
import type * as firefish from "firefish-js";
import { defaultStore } from "@/store";
import { $i } from "@/reactiveAccount";

const props = withDefaults(
	defineProps<{
		user: firefish.entities.User;
		nowrap?: boolean;
	}>(),
	{
		nowrap: true,
	},
);

const show = !defaultStore.state.hideMyName || $i.id !== props.user.id;
</script>

<style lang="scss" module>
.root {
	unicode-bidi: isolate;
}
</style>
