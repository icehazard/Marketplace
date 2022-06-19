import { get, writable } from "svelte/store";


export const cart = writable(localStorage.cart ? JSON.parse(localStorage.cart) : []);
cart.subscribe(value => { localStorage.cart = JSON.stringify(value) });


export const addToCart = (product) => {
    cart.set([...get(cart), product])
}

