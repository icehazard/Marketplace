<script>
    import Field from "comp/atoms/TextField.svelte";
    import cart from "@/store/cart.js";
    import Icon from "@iconify/svelte";
    import { formatCurrency } from "@/assets/js/util.js";

    export let data = [];

    $: src = `http://localhost:8080/api/image/` + Object.values(data.photos).slice(0, 1);

    function update(val) {
        data.qtyCart = Number(data.qtyCart) + val;
        cart.updateItem(data);
    }
</script>

<div class="row shade1 curve wrapper">
    {#if Object.keys(data.photos).length > 0}
        <div class="center">
            <img {src} alt="" />
        </div>
    {:else}
        <span class="imgWrapper center">
            <Icon icon="carbon:no-image" height="50" color="grey" />
        </span>
    {/if}
    <div class="col pa-20 gap-7">
        <div class="row w100 align-center gap-50">
            <div class="weight-600 font-18 grow">{data.name}</div>
        </div>
        <hr />
        <p class="overlay font-14 weight-300 line-15">{data.desc}</p>
        <hr />
        <div class="row space-between pt-10">
            <div class="row align-center gap-10">
                <button class="center shade3 pa-3 curve shine" on:click={() => update(-1)}>
                    <Icon icon="mdi:minus-thick" />
                </button>
                <span class="font-14">{data.qtyCart}</span>
                <button class="center shade3 pa-3 curve shine" on:click={() => update(1)}>
                    <Icon icon="mdi:add-thick" />
                </button>
            </div>
            <span class="primary--text">{formatCurrency(data.price)}</span>
            <button on:click={cart.removeFromCart(data)}>
                <div data-tooltip="Delete">
                    <Icon icon="fluent:delete-12-regular" />
                </div>
            </button>
        </div>
    </div>
</div>

<style>
    .line-15 {
        line-height: 1.5;
    }
    img {
        width: 180px;
        height: 180px;
        object-fit: cover;
        border-radius: 10px;
    }

    .imgWrapper {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
    }

    .wrapper {
        max-height: 200px;
    }

    @media only screen and (max-width: 576px) {
        img {
            width: 100px;
            height: 100px;
            margin: 10px;
        }
    }
</style>
