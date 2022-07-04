<script>
    import { onDestroy, onMount } from "svelte";
    import Button from "comp/atoms/Button.svelte";
    import Icon from "@iconify/svelte";
    import Field from "comp/atoms/TextField.svelte";
    import { push, location } from "svelte-spa-router";
    import products from "@/store/products.js";

    let edit = $location.includes("edit");

    const post = async () => {
        let res = edit ? await products.edit() : await products.post();
        products.reset();
        push("#/");
    };

    onDestroy(() => {
        if (!edit) return;
        $products.name = ''
        $products.imageURL = ''
        $products.price = ''
        $products.qty = ''
        $products.desc = ''
    });
</script>

<form on:submit|preventDefault={post} class="col grow gap-20">
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="fluent:app-title-20-regular" />
            <div>Product Title</div>
        </div>
        <Field bind:value={$products.name} label="Title" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="uil:image-upload" />
            <div>Image Upload</div>
        </div>
        <Field bind:value={$products.imageURL} label="Image URL" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="uil:image-upload" />
            <div>Price</div>
        </div>
        <Field bind:value={$products.price} label="Price" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="uil:image-upload" />
            <div>Quality</div>
        </div>
        <Field bind:value={$products.qty} label="Quality" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="fluent:text-description-20-regular" />
            <div>Description</div>
        </div>
        <Field bind:value={$products.desc} label="Description" />
    </section>
    <section>
        <Button type="submit" text="SUBMIT" />
    </section>
</form>
