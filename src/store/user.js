import { get, writable } from "svelte/store";
import { push } from "svelte-spa-router";


export const token_ = writable(localStorage.token_ ? JSON.parse(localStorage.token_) : []);
token_.subscribe(value => { localStorage.token_ = JSON.stringify(value) });

export const username_ = writable(localStorage.username_ ? JSON.parse(localStorage.username_) : []);
username_.subscribe(value => { localStorage.username_ = JSON.stringify(value) });

export function logout(){
    token_.set('')
    username_.set('')
    push('#/login')
}



