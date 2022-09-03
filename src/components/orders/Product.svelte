<script>
    import { push } from "svelte-spa-router";
    import Icon from "@iconify/svelte";
    import orders from "@/store/orders";

    export let product = {};

    $: src = `http://localhost:8080/api/image/` + Object.values(product.photos)[0];

    function view() {
        push(`#/listing/${product._id}`);
        orders.clear("chat");
    }
</script>

<button class="row w100 align-center border py-20 curve shine gap-15 pa-5" on:click={view}>
    <div class="relative">
        <div class="placeholder center">
            {#if Object.keys(product.photos).length > 0}
                <img {src} alt="" class="w-100 h-100 curve" />
            {:else}
                <Icon icon="carbon:no-image" height="50" color="grey" />
            {/if}
        </div>
    </div>
    <div class="col grow justify-center gap-10 pr-20">
        <span> {product.name}</span>
        <span class="opacity-75">{$orders.order.shopName} </span>
        <span class="font-12 h-50 overflow-hidden">{product.desc}</span>
        <span class="font-14">Quantity: {product.qty}</span>
    </div>
</button>

<style>
    .placeholder {
        height: 100px;
        width: 100px;
    }
</style>
