<script>
    import user from "@/store/user.js";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function logoutFunc() {
        dispatch("click");
        user.logout();
    }
    function close() {
        dispatch("click");
    }
</script>

<div class="absolute shade1 glass pa-5 w-200 w100 z-2 p-right ">
    <a on:click={close} href="#/account" class="menuItem w100 center py-10 curve shine">
        Account
    </a>
    <hr />
    <a on:click={close} href="#/addresses/overview" class="menuItem w100 center py-10 curve shine">
        Address
    </a>
    <hr />
    <a on:click={close} href="#/orders/active" class="menuItem w100 center py-10 curve shine">
        Orders
    </a>
    <hr />
    <a on:click={close} href="#/wallet/overview" class="menuItem w100 center py-10 curve shine">
        Wallet
    </a>
    <hr />
    <a on:click={close} href="#/settings" class="menuItem w100 center py-10 curve shine">
        Settings
    </a>
    <hr />
    <a on:click={close} href="#/admin" class="menuItem w100 center py-10 curve shine">
        Admin
    </a>
    <hr />
    <button on:click={logoutFunc} class="menuItem w100 center py-10 curve shine"> Logout </button>
</div>

<style>
    .absolute {
        top: 50px;
    }

    .w-200{
        min-width: 200px;
    }
</style>
