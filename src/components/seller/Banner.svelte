<script>
    import Icon from "@iconify/svelte";
    import shops, { isOwnShop } from "@/store/shops.js";
    import Logo from "comp/modals/seller/Logo.svelte";
    import Name from "comp/modals/seller/Name.svelte";
    import Description from "comp/modals/seller/Description.svelte";
    import Location from "comp/modals/seller/Location.svelte";
    import OpeningTimes from "comp/modals/seller/OpeningTimes.svelte";
    import { openModal } from "svelte-modals";
    console.log(shops.all())
</script>

<div class="row gap-20 shade1 pa-20 curved center">
    <div class="w-140 h-140 shade3 parent relative">
        {#if $shops.displayPic}
            <img
                src={`http://localhost:9000/api/image/${$shops.displayPic}`}
                alt=""
                class="curve cover h100 w100"
            />
        {/if}
        {#if $isOwnShop}
            <button
                on:click={() => openModal(Logo)}
                class="absolute p-top p-right pa-20 shine curve child"
            >
                <Icon icon="fluent:image-edit-16-regular" width="20" />
            </button>
        {/if}
    </div>
    <div class="col space-between grow font-14 gap-5">
        <h1 class=" row gap-20 align-center space-between parent">
            <div class="row gap-20 ">
                <div class="font-26">
                    {#if $shops.name}
                        <span> {$shops.name}</span>
                    {:else}
                        <span class="font-14 opacity-75">No Name</span>
                    {/if}
                </div>
                {#if $isOwnShop}
                    <button on:click={() => openModal(Name)} class="child slow">
                        <Icon icon="fluent:edit-20-regular" width="20" />
                    </button>
                {/if}
            </div>
            <!-- {#if $isOwnShop}
                <button
                    on:click={() => openModal(OpeningTimes)}
                    class="row weight-300 font-14 center gap-5 shine pa-5 curve"
                >
                    <Icon icon="fluent:info-20-regular" width="18" />
                    <span> Opening times</span>
                </button>
            {/if} -->
        </h1>
        <div class="row gap-20 align-center parent">
            {#if $shops.desc}
                <span> {$shops.desc}</span>
            {:else}
                <span class="font-14 opacity-75">No Description</span>
            {/if}
            {#if $isOwnShop}
                <button on:click={() => openModal(Description)} class="child slow">
                    <Icon icon="fluent:edit-20-regular" width="20" />
                </button>
            {/if}
        </div>
        <div class="weight-300 opacity-75 align-center gap-20 parent">
            {#if $shops.address}
                <span> {$shops.address}</span>
            {:else}
                <span class="font-1">No Location</span>
            {/if}

            {#if $isOwnShop}
                <button on:click={() => openModal(Location)} class="child slow">
                    <Icon icon="fluent:edit-20-regular" width="20" />
                </button>
            {/if}
        </div>
        <span>163 Sales 5 out of 5 stars</span>
        <div class="row align-center gap-10 blue--text">
            <Icon icon="fluent:info-20-regular" width="25" />
            <span class="opacity-75">
                You may leave reviews only after you have brought from this supplier
            </span>
        </div>
    </div>
    <div class="col justify-end gap-10 h100">
        <!-- <div class="w-70 h-70 shade3 round overflow-hidden">
            <img src={$shops.displayPic} alt="" class="round cover h100 w100" />
        </div> -->
        <a href="#/messages" class="weight-600 opacity-75">Contact</a>
    </div>
</div>

<style>
    .child {
        opacity: 0;
    }
    .parent:hover .child {
        opacity: 1;
    }
</style>
