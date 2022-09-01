<script>
    import { push } from "svelte-spa-router";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    import dayjs from "dayjs";
    import * as timeago from "timeago.js";
    import { onMount } from "svelte";

   

    export let order = {};
    let el;

    function view() {
        push(`#/orders/active/${order._id}`);
    }


    onMount(() => {
     
        el.dataset.datetime = dayjs().format()
        console.log(el.dataset.datetime)
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
        <span>{dayjs(order.created_at).format("HH:mm")}</span>
        <!-- <span bind:this={el}>{formatCurrency(order.total)}</span> -->
        <span bind:this={el} class="need_to_be_rendered" datetime="2016-07-07T09:24:17Z">July 07, 2016</span>
    </div>
</button>
