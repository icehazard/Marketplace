import { get, writable } from "svelte/store";

export const shopValid = writable(localStorage.shopValid ? JSON.parse(localStorage.shopValid) : [false, false, false, false, false]);
shopValid.subscribe(value => { localStorage.shopValid = JSON.stringify(value) });

export const shopName = writable(localStorage.shopName ? JSON.parse(localStorage.shopName) : '');
shopName.subscribe(value => { localStorage.shopName = JSON.stringify(value) });

export const shopType = writable(localStorage.shopType ? JSON.parse(localStorage.shopType) : '');
shopType.subscribe(value => { localStorage.shopType = JSON.stringify(value) });

export const active = writable(localStorage.active ? JSON.parse(localStorage.active) : 0);
active.subscribe(value => { localStorage.active = JSON.stringify(value) });