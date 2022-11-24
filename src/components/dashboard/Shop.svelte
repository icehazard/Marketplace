<script>
    import shops from "@/store/shops.js";
    import Icon from "@iconify/svelte";
    import Field from "comp/atoms/TextField.svelte";
    import { push } from "@/assets/js/util";

    let edit = window.location.pathname.includes("edit");
    let btnText = edit ? "EDIT" : "ADD";

    function handleClick() {
        push("/store/add");
    }
</script>

<form class="grow col gap-20">
    <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
        <Icon icon="fluent:building-shop-16-regular" width="30" />
        <span>SHOP</span>
    </h1>
    <div class="grow col shade3 curve">
        <button
            on:click={handleClick}
            type="button"
            class="row shine w100 pa-20 space-between  shade3"
        >
            <div class="row center gap-20">
                <Icon icon="fluent:add-16-regular" width="30" />
                <div class="col gap-10">
                    <span>Add Product</span>
                    <span class="font-14 opacity-75">Add a listing to your shop</span>
                </div>
            </div>
            <div class="center h100">
                <Icon icon="fluent:chevron-right-28-regular" width="20" />
            </div>
        </button>
        <hr />

        <div class="grow col shade3 curve">
            <div class="row  w100 pa-20 space-between  shade3">
                <div class="row center gap-20">
                    <Icon icon="fluent:table-cell-edit-16-regular" width="30" />
                    <div class="col gap-10">
                        <span>Shop Name</span>
                        <span class="font-14 opacity-75">The public name of your shop</span>
                    </div>
                </div>
                <div class="col">
                    <Field bind:value={$shops.name} label="Title" />
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
                    <Field bind:value={$shops.desc} label="Description" />
                </div>
            </div>
            <hr />
            <div class="row  w100 pa-20 space-between  shade3">
                <div class="row center gap-20">
                    <Icon icon="fluent:location-16-regular" width="30" />
                    <div class="col gap-10">
                        <span>Location</span>
                        <span class="font-14 opacity-75">Location of your services</span>
                    </div>
                </div>
                <div class="col">
                    <Field bind:value={$shops.loc} label="Location" />
                </div>
            </div>
            <hr />
            <div class="row  w100 pa-20 space-between  shade3">
                <div class="row center gap-20">
                    <Icon icon="fluent:image-16-regular" width="30" />
                    <div class="col gap-10">
                        <span>Cover Image</span>
                        <span class="font-14 opacity-75">The public image of your product</span>
                    </div>
                </div>
                <div class="col">
                    <Field bind:value={$shops.coverPic} label="Cover Image" />
                </div>
            </div>
            <hr />
 
            <div class="row  w100 pa-20 space-between  shade3">
                <div class="row center gap-20">
                    <Icon icon="fluent:circle-image-20-regular" width="30" />
                    <div class="col gap-10">
                        <span>Shop Image</span>
                        <span class="font-14 opacity-75">Display picture of your store</span>
                    </div>
                </div>
                <div class="col">
                    <Field bind:value={$shops.displayPic} label="Display Picture" />
                </div>
            </div>
            <hr />
        </div>
    </div>
</form>
