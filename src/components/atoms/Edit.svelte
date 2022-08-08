<script>
    import { isOwnProduct } from "@/store/products.js";
    import Icon from "@iconify/svelte";
    import { openModal } from "svelte-modals";
    import Photos from "comp/modals/listing/Photos";

    function handleOpen() {
        openModal(Photos);
    }
</script>

{#if $isOwnProduct}
    <button class="col gap-10  font-24 weight-600 font-28" on:click={handleOpen}>
        <!-- <Icon icon="fluent:image-edit-16-regular" width="40" /> -->
        <span>UPLOAD </span>
        <span>IMAGE</span>
    </button>
{/if}

<style>
    button {
        pointer-events: none;
    }
</style>
