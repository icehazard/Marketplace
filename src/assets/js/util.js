import { writable, get as getStore } from "svelte/store";
import config from "@/config.js";
import user from '@/store/user.js'
import app from "@/store/app.js";
import { currencies } from '@/assets/js/options.js'
import { acts } from "@tadashi/svelte-notification";

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
    if (!local) value.set(copy(data))
    value.subscribe(val => { localStorage.setItem(name, JSON.stringify(val)) });
    value.reset = () => value.set(copy(data))
    value.val = (key) => getStore(value)[key]
    value.all = () => getStore(value)
    value.commit = (key, val) => {
        let temp = getStore(value)
        temp[key] = val;
        if (val == null || val == undefined) temp[key] = data[key]
        value.set(temp)
        return temp
    };
    value.clear = (key) => {
        let temp = getStore(value)
        temp[key] = data[key];
        value.set(temp)
        return temp
    };
    for (let x of Object.keys(data)) {
        if (!Object.keys(JSON.parse(local) || {}).includes(x)) {
            let temp = getStore(value)
            temp[x] = data[x];
            value.set(temp)
        }
    }
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
    let url = `http://${config.WEBPACK_URL}/${route}`;
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
    let url = `http://${config.WEBPACK_URL}/${route}`;
    let res = await fetch(url, {
        method: "DELETE",
        body: data,
        headers: {
            token: getToken(),
        }
    })
    return res.status
}

export function notify(status, message) {
    let con = status == 0 || status == 'error'
    let mode = con ? "error" : "success";
    let data = { mode, message, lifetime: 2 };
    acts.add(data);
}

export function tell(res, success, error) {
    let con = res.status == 'ok' || res == 200;
    let mode = con ? "success" : "error";
    let message = con ? success : error;
    let data = { mode, message, lifetime: 2 };
    acts.add(data);
}

export async function post(route, data) {
    let url = `http://${config.WEBPACK_URL}/${route}`;
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
    let url = `http://${config.WEBPACK_URL}/${route}`;
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
    let url = `http://${config.WEBPACK_URL}/${route}`;
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
    let url = `http://${config.WEBPACK_URL}/${route}`;
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

export const validateEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export const wait = function (time) {
    if (!time) time = 0;
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};

export function push(path) {
    app.commit('url', path)
}

export function pop() {
    window.history.back()
}

export const searchList = function (list, term) {
    if (!term) return list;
    return list.filter((el) => Object.values(el).filter(util).length > 0);

    function util(item) {
        let result = JSON.stringify(item || "");
        result = result.toLowerCase().replaceAll('"', "");
        return result.search(term.toLowerCase()) >= 0;
    }
}