import { get, writable } from "svelte/store";

export const shopValid = writable(localStorage.shopValid ? JSON.parse(localStorage.shopValid) : [false, false, false, false, false]);
shopValid.subscribe(value => { localStorage.shopValid = JSON.stringify(value) });

export const shopName = writable(localStorage.shopName ? JSON.parse(localStorage.shopName) : '');
shopName.subscribe(value => { localStorage.shopName = JSON.stringify(value) });

export const shopType = writable(localStorage.shopType ? JSON.parse(localStorage.shopType) : '');
shopType.subscribe(value => { localStorage.shopType = JSON.stringify(value) });

export const number = writable(localStorage.number ? JSON.parse(localStorage.number) : '');
number.subscribe(value => { localStorage.number = JSON.stringify(value) });

export const street = writable(localStorage.street ? JSON.parse(localStorage.street) : '');
street.subscribe(value => { localStorage.street = JSON.stringify(value) });

export const address2 = writable(localStorage.address2 ? JSON.parse(localStorage.address2) : '');
address2.subscribe(value => { localStorage.address2 = JSON.stringify(value) });

export const district = writable(localStorage.district ? JSON.parse(localStorage.district) : '');
district.subscribe(value => { localStorage.district = JSON.stringify(value) });

export const county = writable(localStorage.county ? JSON.parse(localStorage.county) : '');
county.subscribe(value => { localStorage.county = JSON.stringify(value) });

export const zip = writable(localStorage.zip ? JSON.parse(localStorage.zip) : '');
zip.subscribe(value => { localStorage.zip = JSON.stringify(value) });

export const active = writable(localStorage.active ? JSON.parse(localStorage.active) : '');
active.subscribe(value => { localStorage.active = JSON.stringify(value) });