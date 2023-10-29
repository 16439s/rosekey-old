import { defineAsyncComponent, reactive } from "vue";
import type * as firefish from "firefish-js";
import { i18n } from "./i18n";
import { del, get, set } from "@/scripts/idb-proxy";
import { apiUrl } from "@/config";
import { alert, api, popup, popupMenu, waiting } from "@/os";
import { reloadChannel, unisonReload } from "@/scripts/unison-reload";
import icon from "@/scripts/icon";
import { $i } from "@/reactiveAccount";

// TODO: 他のタブと永続化されたstateを同期

export type Account = firefish.entities.MeDetailed;

export const iAmModerator = $i != null && ($i.isAdmin || $i.isModerator);
export const iAmAdmin = $i?.isAdmin;
export const iAmEmojiMod = iAmModerator || $i?.emojiModPerm !== "none";

export async function signout() {
	waiting();
	localStorage.removeItem("account");

	await removeAccount($i.id);

	const accounts = await getAccounts();

	// #region Remove service worker registration
	try {
		if (navigator.serviceWorker.controller) {
			const registration = await navigator.serviceWorker.ready;
			const push = await registration.pushManager.getSubscription();
			if (push) {
				await fetch(`${apiUrl}/sw/unregister`, {
					method: "POST",
					body: JSON.stringify({
						i: $i.token,
						endpoint: push.endpoint,
					}),
				});
			}
		}

		if (accounts.length === 0) {
			await navigator.serviceWorker.getRegistrations().then((registrations) => {
				return Promise.all(
					registrations.map((registration) => registration.unregister()),
				);
			});
		}
	} catch (err) {}
	// #endregion

	document.cookie = "igi=; path=/";

	if (accounts.length > 0) login(accounts[0].token);
	else unisonReload("/");
}

export async function getAccounts(): Promise<
	{ id: Account["id"]; token: Account["token"] }[]
> {
	return (await get("accounts")) || [];
}

export async function addAccount(id: Account["id"], token: Account["token"]) {
	const accounts = await getAccounts();
	if (!accounts.some((x) => x.id === id)) {
		await set("accounts", accounts.concat([{ id, token }]));
	}
}

export async function removeAccount(id: Account["id"]) {
	const accounts = await getAccounts();
	accounts.splice(
		accounts.findIndex((x) => x.id === id),
		1,
	);

	if (accounts.length > 0) await set("accounts", accounts);
	else await del("accounts");
}

function fetchAccount(token: string): Promise<Account> {
	return new Promise((done, fail) => {
		// Fetch user
		fetch(`${apiUrl}/i`, {
			method: "POST",
			body: JSON.stringify({
				i: token,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					if (res.error.id === "a8c724b3-6e9c-4b46-b1a8-bc3ed6258370") {
						showSuspendedDialog();
						signout();
					} else {
						alert({
							type: "error",
							title: i18n.ts.failedToFetchAccountInformation,
							text: JSON.stringify(res.error),
						});
					}
				} else {
					res.token = token;
					done(res);
				}
			})
			.catch(fail);
	});
}

function showSuspendedDialog() {
	alert({
		type: "error",
		title: i18n.ts.yourAccountSuspendedTitle,
		text: i18n.ts.yourAccountSuspendedDescription,
	});
}

export function updateAccount(accountData) {
	for (const [key, value] of Object.entries(accountData)) {
		$i[key] = value;
	}
	localStorage.setItem("account", JSON.stringify($i));
}

export function refreshAccount() {
	return fetchAccount($i.token).then(updateAccount);
}

export async function login(token: Account["token"], redirect?: string) {
	waiting();
	if (_DEV_) console.log("logging as token ", token);
	const me = await fetchAccount(token);
	localStorage.setItem("account", JSON.stringify(me));
	document.cookie = `token=${token}; path=/; max-age=31536000`; // bull dashboardの認証とかで使う
	await addAccount(me.id, token);

	if (redirect) {
		// 他のタブは再読み込みするだけ
		reloadChannel.postMessage(null);
		// このページはredirectで指定された先に移動
		location.href = redirect;
		return;
	}

	unisonReload();
}

export async function openAccountMenu(
	opts: {
		includeCurrentAccount?: boolean;
		withExtraOperation: boolean;
		active?: firefish.entities.UserDetailed["id"];
		onChoose?: (account: firefish.entities.UserDetailed) => void;
	},
	ev: MouseEvent,
	isMobile?: boolean,
) {
	function showSigninDialog() {
		popup(
			defineAsyncComponent(() => import("@/components/MkSigninDialog.vue")),
			{},
			{
				done: (res) => {
					addAccount(res.id, res.i);
					switchAccountWithToken(res.i);
				},
			},
			"closed",
		);
	}

	function createAccount() {
		popup(
			defineAsyncComponent(() => import("@/components/MkSignupDialog.vue")),
			{},
			{
				done: (res) => {
					addAccount(res.id, res.i);
					switchAccountWithToken(res.i);
				},
			},
			"closed",
		);
	}

	async function switchAccount(account: firefish.entities.UserDetailed) {
		const storedAccounts = await getAccounts();
		const token = storedAccounts.find((x) => x.id === account.id).token;
		switchAccountWithToken(token);
	}

	function switchAccountWithToken(token: string) {
		login(token);
	}

	const storedAccounts = await getAccounts().then((accounts) =>
		accounts.filter((x) => x.id !== $i.id),
	);
	const accountsPromise = api("users/show", {
		userIds: storedAccounts.map((x) => x.id),
	});

	function createItem(account: firefish.entities.UserDetailed) {
		return {
			type: "user",
			user: account,
			active: opts.active != null ? opts.active === account.id : false,
			action: () => {
				if (opts.onChoose) {
					opts.onChoose(account);
				} else {
					switchAccount(account);
				}
			},
		};
	}

	const accountItemPromises = storedAccounts.map(
		(a) =>
			new Promise((res) => {
				accountsPromise.then((accounts) => {
					const account = accounts.find((x) => x.id === a.id);
					if (account == null) return res(null);
					res(createItem(account));
				});
			}),
	);

	if (opts.withExtraOperation) {
		popupMenu(
			[
				...[
					...(isMobile ?? false
						? [
								{
									type: "parent",
									icon: `${icon("ph-plus")}`,
									text: i18n.ts.addAccount,
									children: [
										{
											text: i18n.ts.existingAccount,
											action: () => {
												showSigninDialog();
											},
										},
										{
											text: i18n.ts.createAccount,
											action: () => {
												createAccount();
											},
										},
									],
								},
						  ]
						: [
								{
									type: "link",
									text: i18n.ts.profile,
									to: `/@${$i.username}`,
									avatar: $i,
								},
								null,
						  ]),
					...(opts.includeCurrentAccount ? [createItem($i)] : []),
					...accountItemPromises,
					...(isMobile ?? false
						? [
								null,
								{
									type: "link",
									text: i18n.ts.profile,
									to: `/@${$i.username}`,
									avatar: $i,
								},
						  ]
						: [
								{
									type: "parent",
									icon: `${icon("ph-plus")}`,
									text: i18n.ts.addAccount,
									children: [
										{
											text: i18n.ts.existingAccount,
											action: () => {
												showSigninDialog();
											},
										},
										{
											text: i18n.ts.createAccount,
											action: () => {
												createAccount();
											},
										},
									],
								},
						  ]),
				],
			],
			ev.currentTarget ?? ev.target,
			{
				align: "left",
			},
		);
	} else {
		popupMenu(
			[
				...(opts.includeCurrentAccount ? [createItem($i)] : []),
				...accountItemPromises,
			],
			ev.currentTarget ?? ev.target,
			{
				align: "left",
			},
		);
	}
}
