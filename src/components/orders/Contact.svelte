<script>
    import { push } from "svelte-spa-router";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import * as timeago from "timeago.js";
    import { onMount } from "svelte";

    export let order = {};
    let el;

    function view() {
        push(`#/orders/active/${order._id}`);
    }

    onMount(() => {
        timeago.render(el);
    });
</script>

<button class="row w100 align-center border py-20 curve shine shadow" on:click={view}>
    <div class="pa-20">
        <div class="round primary pa-30" />
    </div>
    <div class="col grow justify-center gap-15 pr-20">
        <span>Amnesia Haze</span>
        <span>{order._id}</span>
        <span>{order.address}</span>
        <span bind:this={el} datetime={order.created_at} />
    </div>
</button>
