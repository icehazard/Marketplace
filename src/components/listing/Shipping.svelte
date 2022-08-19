<script>
    import Icon from "@iconify/svelte";
    import { openModal } from "svelte-modals";
    import { isOwnShop } from "@/store/shops.js";
    import Shipping from "comp/modals/listing/Shipping.svelte";
</script>

<div class="shade1 pa-50 curve col gap-20">
    {#if $isOwnShop}
    <button
        on:click={() => openModal(Shipping)}
        class="w-fit-content align-center gap-20 shine curve pa-5"
    >
        <div class="center gap-10 opacity-75">
            <Icon icon="akar-icons:shipping-box-01" />
            <div>Shipping</div>
        </div>
        {#if $isOwnShop}
            <Icon icon="fluent:edit-16-regular" width="22" color="var(--primary)" />
        {/if}
    </button>
{:else}
    <div class="opacity-75 row align-center gap-10">
        <Icon icon="akar-icons:shipping-box-01" />
        <div>Shipping</div>
    </div>
{/if}
</div>
