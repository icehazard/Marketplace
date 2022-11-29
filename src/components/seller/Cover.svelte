<script>
    import shops from "@/store/shops.js";
    import { isOwnProduct } from "@/store/products.js";
    import Icon from "@iconify/svelte";
    import Cover from "comp/modals/seller/Cover.svelte";
    import { openModal } from "svelte-modals";


    //$: url = `http://${WEBPACK_URL}/api/image/${$shops.coverPic}`;

    function handleOpen() {
        openModal(Cover);
    }
</script>

<div class="h-400 shade1 curve relative parent">
    {#if $shops.coverPic}
    <img class="curve cover h100 w100 contain" src={`http://localhost:9000/api/image/${$shops.coverPic}`} alt="" />
    {/if}
    {#if $isOwnProduct}
        <button on:click={handleOpen} class="absolute p-top p-right pa-20 shine curve child">
            <Icon icon="fluent:image-edit-16-regular" width="20" />
        </button>
    {/if}
</div>

<style>
    .child {
        opacity: 0;
    }
    .parent:hover .child {
        opacity: 1;
    }
</style>
