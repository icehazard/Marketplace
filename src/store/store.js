import { writable } from 'svelte/store'


export const content = writable(localStorage.content || 'Hellos, World!')
content.subscribe((value) => localStorage.content = value)