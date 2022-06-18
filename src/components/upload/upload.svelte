<script>
    import Button from "comp/atoms/Button.svelte";
    import Icon from "@iconify/svelte";
    import Field from "comp/atoms/TextField.svelte";
    import { push } from "svelte-spa-router";
    import { title, image, price, description, products } from "@/store/products.js";

    const post = () => {
        let data = { title: $title, image: $image, price: $price, description: $description };
        products.set([...$products, data]);
        push("#/");
    };
</script>

<form on:submit={post} class="col grow gap-20">
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="fluent:app-title-20-regular" />
            <div>Product Title</div>
        </div>
        <Field bind:value={$title} label="Title" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="uil:image-upload" />
            <div>Image Upload</div>
        </div>
        <Field bind:value={$image} label="Image URL" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="uil:image-upload" />
            <div>Price</div>
        </div>
        <Field bind:value={$price} label="Price" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="fluent:text-description-20-regular" />
            <div>Description</div>
        </div>
        <Field bind:value={$description} label="Description" />
    </section>
    <section>
        <Button on:click={post} text="SUBMIT" />
    </section>
</form>
