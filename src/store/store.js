import { get, writable } from "svelte/store";

export const shopValid = writable(localStorage.shopValid ? JSON.parse(localStorage.shopValid) : [false, false, false, false, false]);
shopValid.subscribe(value => { localStorage.shopValid = JSON.stringify(value) });

export const shopName = writable(localStorage.shopName ? JSON.parse(localStorage.shopName) : '');
shopName.subscribe(value => { localStorage.shopName = JSON.stringify(value) });

export const shopType = writable(localStorage.shopType ? JSON.parse(localStorage.shopType) : '');
shopType.subscribe(value => { localStorage.shopType = JSON.stringify(value) });

export const address = writable(localStorage.address ? JSON.parse(localStorage.address) : '');
address.subscribe(value => { localStorage.address = JSON.stringify(value) });

export const bankAccountName = writable(localStorage.bankAccountName ? JSON.parse(localStorage.bankAccountName) : '');
bankAccountName.subscribe(value => { localStorage.bankAccountName = JSON.stringify(value) });

export const bankName = writable(localStorage.bankName ? JSON.parse(localStorage.bankName) : '');
bankName.subscribe(value => { localStorage.bankName = JSON.stringify(value) });

export const bankAccountNumber = writable(localStorage.bankAccountNumber ? JSON.parse(localStorage.bankAccountNumber) : '');
bankAccountNumber.subscribe(value => { localStorage.bankAccountNumber = JSON.stringify(value) });

export const active = writable(localStorage.active ? JSON.parse(localStorage.active) : '');
active.subscribe(value => { localStorage.active = JSON.stringify(value) });

export function reset(){
    shopValid.set([false, false, false, false, false])
    shopName.set('')
    shopType.set('')
    address.set('')
    active.set('')
    bankAccountName.set('')
    bankName.set('')
    bankAccountNumber.set('')
}

const createWritableStore = (key, startValue) => {
    const { subscribe, set } = writable(startValue);
    
    return {
      subscribe,
      set,
      useLocalStorage: () => {
        const json = localStorage.getItem(key);
        if (json) {
          set(JSON.parse(json));
        }
        
        subscribe(current => {
          localStorage.setItem(key, JSON.stringify(current));
        });
      }
    };
  }