<script>
    import shops from "@/store/shops.js";
    import Icon from "@iconify/svelte";
    import Cover from "comp/modals/seller/Cover.svelte";
    import { fade } from "svelte/transition";
    import { Modals, closeModal, openModal } from "svelte-modals";

    function handleOpen() {
        openModal(Cover);
    }
</script>

<div class="h-400 shade1 curve relative parent">
    <img class="curve cover h100 w100" src={$shops.coverPic} alt="" />
    <button on:click={handleOpen} class="absolute p-top p-right pa-20 shine curve child">
        <Icon icon="fluent:image-edit-16-regular" width="20" />
    </button>
    <Modals>
        <div
            transition:fade={{ duration: 100 }}
            on:click={() => closeModal()}
            slot="backdrop"
            class="backdrop fixed p-center z-4"
        />
    </Modals>
</div>

<style>
    .child {
        opacity: 0;
    }
    .parent:hover .child {
        opacity: 1;
    }

    .backdrop {
        background: rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(5px);
    }
</style>
