<script>
    import products from "@/store/products.js";
    import { isOwnProduct } from "@/store/products.js";
    import { openModal } from "svelte-modals";
    import Title from "#/modals/listing/Title.svelte";
    import Icon from "@iconify/svelte";
    import SkeletonText from "%/SkeletonText";
</script>

<div class="shade1 pa-30 curve col gap-50">
    <div class="row">
        {#if $isOwnProduct}
            <button
                on:click={() => openModal(Title)}
                class="w-fit-content align-center gap-20 shine curve pa-5"
            >
                <div class="center gap-10 opacity-75">
                    <h1>{$products?.product?.name || "No title"}</h1>
                </div>
                {#if $isOwnProduct}
                    <Icon icon="fluent:edit-16-regular" width="22" color="var(--primary)" />
                {/if}
            </button>
        {:else if $products?.product?.name}
            <div class="opacity-75 row align-center gap-10">
                <h1>{$products?.product?.name || "No title"}</h1>
            </div>
        {:else}
            <SkeletonText />
        {/if}
    </div>
    <div class="row space-between">
        {#if $products?.product?.shopName}
        <a href={`/shops/id/${$products?.product?.shopID}`} class="opacity-75 font-18">
            {$products?.product?.shopName || "Untitled Shop name"}
        </a>
        {:else}
        <SkeletonText />
        {/if}
     
    </div>
</div>
