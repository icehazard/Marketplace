import { get, writable } from "svelte/store";


export const token = writable(localStorage.token ? JSON.parse(localStorage.token) : []);
token.subscribe(value => { localStorage.token = JSON.stringify(value) });


export const addToCart = (product) => {
    token.set([...get(token), product])
}

