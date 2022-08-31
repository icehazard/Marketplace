import { writable, get as getStore } from "svelte/store";
import { WEBPACK_URL } from "@/config";
import user from '@/store/user.js'
import { currencies } from '@/assets/library/options.js'

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

export function copy(data) {
    return JSON.parse(JSON.stringify(data))
}

export function set(name, type) {
    const value = writable(localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : type);
    value.subscribe(val => { localStorage.setItem(name, JSON.stringify(val)) });
    return value;
}

export function persist(name, data) {
    let local = localStorage.getItem(name)
    const value = writable(local ? JSON.parse(local) : data);
    value.subscribe(val => { localStorage.setItem(name, JSON.stringify(val)) });
    value.reset = () => value.set(copy(data))
    value.val = (key) => getStore(value)[key]
    value.all = () => getStore(value)
    value.commit = (key, val) => {
        let temp = getStore(value)
        temp[key] = val;
        value.set(temp)
        return temp
    };
    return value;
}

export function formatCurrency(x) {
    let active = getStore(user).currency;
    let currency = currencies.filter((el) => el.id == active)[0]
    x = x / currency.convert
    x = Number(x).toFixed(currency.sign);
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return currency.id + " " + parts.join(".");
}

export function satoshiToBtcString(x) {
    return (x / 100000000) + ' ฿'
}



function getToken() {
    let getUser = localStorage.getItem('user');
    return getUser ? JSON.parse(localStorage.getItem('user')).token : ''
}

let headers = {
    Accept: "application/json",
    token: getToken(),
    "Content-Type": "application/json",
}

export async function postImage(route, data) {
    let url = `http://${WEBPACK_URL}/${route}`;
    let res = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            token: getToken(),
        }
    })
    try {
        return await res.json()
    } catch (error) {
        return await res.status
    }
}

export async function deleteImage(route, data) {
    let url = `http://${WEBPACK_URL}/${route}`;
    let res = await fetch(url, {
        method: "DELETE",
        body: data,
        headers: {
            token: getToken(),
        }
    })
    return res.status
}


export async function post(route, data) {
    console.log("🚀 ~ dataStore", data)
    let url = `http://${WEBPACK_URL}/${route}`;
    let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            token: getToken(),
            "Content-Type": "application/json",
        }
    })
    try {
        return await res.json()
    } catch (error) {
        return await res.status
    }
}

export async function del(route, data) {
    let url = `http://${WEBPACK_URL}/${route}`;
    let res = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            token: getToken(),
            "Content-Type": "application/json",
        }
    })
    try {
        return await res.json()
    } catch (error) {
        return await res.status
    }
}

export async function get(route) {
    let url = `http://${WEBPACK_URL}/${route}`;
    let res = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            token: getToken(),
            "Content-Type": "application/json",
        }
    })
    res = await res.json()
    if (res.status == 'error') return []
    return res
}

export async function patch(route, data) {
    let url = `http://${WEBPACK_URL}/${route}`;
    let res = await fetch(url, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            token: getToken(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    try {
        return await res.json()
    } catch (error) {
        return await res.status
    }
}

export function hasError(data, initVal) {
    let error = data.status == 'error';
    initVal = initVal ? initVal : [];
    return error ? initVal : data;
}

export function hasErrorNonRetarded(data, initVal) {
    return data.status == 'error';
}