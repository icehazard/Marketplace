<script>
    import products from "@/store/products.js";
    import { isOwnProduct } from "@/store/products.js";
    import { openModal } from "svelte-modals";
    import Title from "#/modals/listing/Title.svelte";
    import Icon from "@iconify/svelte";
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
        {:else}
            <div class="opacity-75 row align-center gap-10">
                <h1>{$products?.product?.name || "No title"}</h1>
            </div>
        {/if}
    </div>
    <div class="row space-between">
        <a href={`/shops/id/${$products?.product?.shopID}`} class="opacity-75 font-18">
            {$products?.product?.shopName || "Untitled Shop name"}
        </a>
        {#if !$isOwnProduct}
            <a href="/messages" class="primary--text link">Contact seller</a>
        {/if}
    </div>
</div>
