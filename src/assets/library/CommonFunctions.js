import { writable } from "svelte/store";

export function clickOutside(element, callbackFunction) {
    function onClick(event) {
        if (!element.contains(event.target)) {
            callbackFunction();
        }
    }
    document.body.addEventListener("click", onClick);
    return {
        update(newCallbackFunction) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener("click", onClick);
        },
    };
}

export function set(name) {
    const value = writable(localStorage.getItem(name));
    value.subscribe(val => [null, undefined].includes(val) ? localStorage.removeItem(name) : localStorage.setItem(name, val));
    return value;
}
