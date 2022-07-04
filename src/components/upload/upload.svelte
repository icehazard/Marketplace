<script>
    import Button from "comp/atoms/Button.svelte";
    import Icon from "@iconify/svelte";
    import Field from "comp/atoms/TextField.svelte";
    import { push } from "svelte-spa-router";
    import products from "@/store/products.js";
    import { post } from "@/assets/library/CommonFunctions.js";

    let name, imageURL, price, desc;

    const submitData = async () => {
        let data = { name, imageURL, price, desc };
        let res = await post('api/product', data)

        if (res.status !== 200)
        {
            alert(`Couldnt add product. Status ${res.status} data: ${res.json}`)
            return
        }
        else
            console.log(res)

        push("#/");
    };

</script>

<form on:submit|preventDefault={submitData} class="col grow gap-20">
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="fluent:app-title-20-regular" />
            <div>Product Title</div>
        </div>
        <Field bind:value={name} label="Title" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="uil:image-upload" />
            <div>Image Upload</div>
        </div>
        <Field bind:value={imageURL} label="Image URL" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="uil:image-upload" />
            <div>Price</div>
        </div>
        <Field bind:value={price} label="Price" />
    </section>
    <section class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="fluent:text-description-20-regular" />
            <div>Description</div>
        </div>
        <Field bind:value={desc} label="Description" />
    </section>
    <section>
        <Button type='submit' text="SUBMIT" />
    </section>
</form>
