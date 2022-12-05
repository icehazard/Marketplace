<script>
    import Icon from "@iconify/svelte";
    import products from "@/store/products";
    import { openModal } from "svelte-modals";
    import { isOwnProduct } from "@/store/products";
    import Description from "#/modals/listing/Description";
    import Skeleton from '%/Skeleton'


</script>

<div class="shade1 pa-30 curve col gap-20">
    {#if $isOwnProduct}
        <button
            on:click={() => openModal(Description)}
            class="w-fit-content align-center gap-20 shine curve pa-5"
        >
            <div class="center gap-10 opacity-75">
                <Icon icon="fluent:text-description-20-regular" />
                <div>Description</div>
            </div>
            {#if $isOwnProduct}
                <Icon icon="fluent:edit-16-regular" width="22" color="var(--primary)" />
            {/if}
        </button>
    {:else}
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="fluent:text-description-20-regular" />
            <div>Description</div>
        </div>
    {/if}

    <Skeleton />

    <div class="white_space_preline">
        {$products?.product?.desc || "No Description"}
    </div>
</div>
