<script>
    import Icon from "@iconify/svelte";
    import { openModal } from "svelte-modals";
    import { isOwnProduct } from "@/store/products.js";
    import Shipping from "comp/modals/listing/Shipping.svelte";
</script>

<div class="shade1 pa-30 curve col gap-20">
    {#if $isOwnProduct}
        <button
            on:click={() => openModal(Shipping)}
            class="w-fit-content align-center gap-20 shine curve pa-5"
        >
            <div class="center gap-10 opacity-75">
                <Icon icon="akar-icons:shipping-box-01" />
                <div>Shipping</div>
            </div>
            {#if $isOwnProduct}
                <Icon icon="fluent:edit-16-regular" width="22" color="var(--primary)" />
            {/if}
        </button>
    {:else}
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="akar-icons:shipping-box-01" />
            <div>Shipping</div>
        </div>
    {/if}
    <div class="row space-between grow">
        <div class="col gap-10">
            <div class="weight-300">Standard Delivery</div>
            <span class="font-14 opacity-75">2 - 4 day(s)</span>
        </div>
        <div class="col center">
            ฿38.00
        </div>
    </div>
    <div class="row gap-10 wrap">
        <div class="font-14 weight-300 borderStrong pa-7 curve">Free ฿500</div>
        <div class="font-14 weight-300 borderStrong pa-7 curve">Min ฿200</div>
    </div>
</div>
