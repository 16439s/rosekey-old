<template>
	<span v-if="show" class="mk-acct">
		<span class="name">@{{ user.username }}</span>
		<span
			v-if="user.host || detail || defaultStore.state.showFullAcct"
			class="host"
			>@{{ user.host ?? host }}</span
		>
	</span>
</template>

<script lang="ts" setup>
import type * as firefish from "firefish-js";
import { toUnicode } from "punycode/";
import { host as hostRaw } from "@/config";
import { defaultStore } from "@/store";
import { $i } from "@/reactiveAccount";

const props = defineProps<{
	user: firefish.entities.UserDetailed;
	detail?: boolean;
}>();

const host = toUnicode(hostRaw);
const show = !defaultStore.state.hideMyName || $i.id !== props.user.id;
</script>

<style lang="scss" scoped>
.mk-acct {
	> .host {
		opacity: 0.5;
	}
}
</style>
