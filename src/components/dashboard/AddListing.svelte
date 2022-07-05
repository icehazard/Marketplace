<script>
    import { onDestroy, onMount } from "svelte";
    import Button from "comp/atoms/Button.svelte";
    import Icon from "@iconify/svelte";
    import Field from "comp/atoms/TextField.svelte";
    import { push, location } from "svelte-spa-router";
    import products from "@/store/products.js";

    let edit = $location.includes("edit");
    let btnText = edit ? 'EDIT' : 'ADD';
    let icon = edit ? 'fluent:edit-16-regular' : 'fluent:add-16-regular'

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

<form on:submit|preventDefault={post} class="grow col gap-20">
<h1 class="row pl-20 font-36 weight-300 align-center gap-20">
    <Icon icon="fluent:{btnText.toLocaleLowerCase()}-16-regular" width="30" />
    <span>{btnText} YOUR PRODUCT</span>
</h1>
<div class="grow col shade3 curve">
    <div class="row  w100 pa-20 space-between  shade3">
        <div class="row center gap-20">
            <Icon icon="fluent:table-cell-edit-16-regular" width="30" />
            <div class="col gap-10">
                <span>Product Name</span>
                <span class="font-14 opacity-75">The public title of your product</span>
            </div>
        </div>
        <div class="col">
            <Field bind:value={$products.name} label="Title" />
        </div>
    </div>
    <hr />
    <div class="row  w100 pa-20 space-between  shade3">
        <div class="row center gap-20">
            <Icon icon="fluent:image-16-regular" width="30" />
            <div class="col gap-10">
                <span>Image</span>
                <span class="font-14 opacity-75">The public image of your product</span>
            </div>
        </div>
        <div class="col">
            <Field bind:value={$products.imageURL} label="Image URL"/>
        </div>
    </div>
    <hr />
    <div class="row  w100 pa-20 space-between  shade3">
        <div class="row center gap-20">
            <Icon icon="fluent:money-16-regular" width="30" />
            <div class="col gap-10">
                <span>Price</span>
                <span class="font-14 opacity-75">Price before any discounts</span>
            </div>
        </div>
        <div class="col">
            <Field bind:value={$products.price} label="Price"/>
        </div>
    </div>
    <hr />
    <div class="row  w100 pa-20 space-between  shade3">
        <div class="row center gap-20">
            <Icon icon="fluent:clipboard-task-20-regular" width="30" />
            <div class="col gap-10">
                <span>Quantity</span>
                <span class="font-14 opacity-75">Quantity of your product in stock</span>
            </div>
        </div>
        <div class="col">
            <Field bind:value={$products.qty} label="Quality"/>
        </div>
    </div>
    <hr />
    <div class="row  w100 pa-20 space-between  shade3">
        <div class="row center gap-20">
            <Icon icon="fluent:text-description-20-regular" width="30" />
            <div class="col gap-10">
                <span>Description</span>
                <span class="font-14 opacity-75">Description of the product</span>
            </div>
        </div>
        <div class="col">
            <Field bind:value={$products.desc} label="Description"/>
        </div>
    </div>
    <hr />
    <section class="row justify-end pa-20">
        <Button type="submit" text={btnText + ' PRODUCT'} />
    </section>
</div>
</form>

