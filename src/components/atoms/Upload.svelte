<script>
    import Photos from "./../modals/listing/Photos.svelte";
    import Icon from "@iconify/svelte";
    import shops from "@/store/shops.js";
    import { closeModal } from "svelte-modals";

    let load = false;
    let el, picker, image;
    let field = $shops.coverPic;

    function save() {
        $shops.coverPic = field;
        closeModal();
    }
    async function upload(e) {
        image.src = URL.createObjectURL(e.target.files.item(0));
        let formData = new FormData(el);
        this.load = true;
        await shops.postCover(formData);
        shops.getAllProducts()
        this.load = false;
        //closeModal();
    }
    function openPicker() {
        picker.click();
    }
</script>

<form bind:this={el} class="none" enctype="multipart/form-data">
    <input type="file" on:change={upload} name="avatar" bind:this={picker} />
</form>
<button
    on:click={openPicker}
    type="button"
    class="borderStrong gap-10 curve align-center px-20 h-40 shade2 slow w-fit-content"
>
    <Icon icon="fluent:image-edit-16-regular" class="" width="20" />
    <span>Update Photo</span>
</button>
<img bind:this={image} width="320" alt="" />
