<script>
    import Button from "comp/atoms/Button.svelte";
    import Icon from "@iconify/svelte";
    import Field from "comp/atoms/TextField.svelte";
    import { push } from "svelte-spa-router";
    import products from "@/store/products.js";

    const post = () => {
        // let data = { title: $title, image: $image, price: $price, description: $description };
        // products.set([...$products, data]);
        // title.set("");
        // image.set("");
        // price.set("");
        // description.set("");
        push("#/");
    };
</script>

<form on:submit={post} class="col grow gap-20">
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="fluent:app-title-20-regular" />
            <div>Product Title</div>
        </div>
        <Field bind:value={$products.title} label="Title" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="uil:image-upload" />
            <div>Image Upload</div>
        </div>
        <Field bind:value={$products.image} label="Image URL" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="uil:image-upload" />
            <div>Price</div>
        </div>
        <Field bind:value={products.price} label="Price" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="fluent:text-description-20-regular" />
            <div>Description</div>
        </div>
        <Field bind:value={$products.description} label="Description" />
    </section>
    <section>
        <Button text="SUBMIT" />
    </section>
</form>
