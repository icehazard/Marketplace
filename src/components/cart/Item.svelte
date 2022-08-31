<script>
    import Field from "comp/atoms/TextField.svelte";
    import cart from "@/store/cart.js";
    import Icon from "@iconify/svelte";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";

    export let data = [];
    $: src = `http://localhost:8080/api/image/` + Object.values(data.photos).slice(0, 1);
</script>

<div class="row shade1 curve wrapper">
    {#if data.photos}
        <img src={src} alt="" />
    {/if}
    <div class="row pa-20 grow gap-50">
        <div class="col  grow overflow-hidden gap-10">
            <div class="weight-600 font-18">{data.name}</div>
            <div>{data.desc}</div>
        </div>
        <div class="col space-between">
            <div class="row h-40 gap-20 center">
                <label for="cars">Quantity:</label>
                <div class="row w-100">
                    <Field
                        type="number"
                        on:change={cart.updateItem(data)}
                        bind:value={data.qty}
                        label="0"
                    />
                </div>
            </div>
        </div>
        <div class="col space-between">
            <span class="">{formatCurrency(data.price)}</span>
            <button class="justify-end gap-10" on:click={cart.removeFromCart(data)}>
                <div class="" data-tooltip="Delete">
                    <Icon icon="fluent:delete-12-regular" />
                </div>
            </button>
        </div>
    </div>
</div>

<style>
    img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
    }

    .wrapper {
        max-height: 200px;
    }
</style>
