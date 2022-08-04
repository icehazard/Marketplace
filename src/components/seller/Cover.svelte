<script>
    import shops from "@/store/shops.js";
    import Icon from "@iconify/svelte";
    import Cover from "comp/modals/seller/Cover.svelte";
    import {openModal } from "svelte-modals";

    function handleOpen() {
        openModal(Cover);
    }
</script>

<div class="h-400 shade1 curve relative parent">
    <img class="curve cover h100 w100" src={`http://localhost:9000/api/image/${$shops.coverPic}`} alt="" />
    <button on:click={handleOpen} class="absolute p-top p-right pa-20 shine curve child">
        <Icon icon="fluent:image-edit-16-regular" width="20" />
    </button>
</div>

<style>
    .child {
        opacity: 0;
    }
    .parent:hover .child {
        opacity: 1;
    }

</style>
