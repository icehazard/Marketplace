import { writable } from "svelte/store";
let store;

export const title = writable(localStorage.title || "");
title.subscribe(value => { localStorage.setItem("title", value); });

export const image = writable(localStorage.image || "");
image.subscribe(value => { localStorage.setItem("image", value); });

export const price = writable(localStorage.price || 0);
price.subscribe(value => { localStorage.setItem("price", value); });

export const description = writable(localStorage.description || "");
description.subscribe(value => { localStorage.setItem("description", value); });

store = localStorage.products
export const products = writable(store ? JSON.parse(store) : []);
products.subscribe(value => { localStorage.products = JSON.stringify(value) });

export const product = writable(localStorage.product ? JSON.parse(localStorage.product) : []);
product.subscribe(value => { localStorage.product = JSON.stringify(value) });
