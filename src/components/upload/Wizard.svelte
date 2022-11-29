<script>
    import { post } from "@/assets/js/util.js";
    import Confirm from "./Confirm.svelte";
    import GetPaid from "./GetPaid.svelte";
    import Address from "./Address.svelte";
    import ShopType from "./ShopType.svelte";
    import ShopName from "./ShopName.svelte";
    import { active } from "@/store/store.js";
    import Icon from "@iconify/svelte";
    import user from "@/store/user";
    import { onMount } from "svelte";

    let headings = [
        { text: "Name your shop" },
        { text: "Shop Type" },
        { text: "Address" },
        { text: "Getting Paid" },
        { text: "Confirmation" },
    ];

    function jumpTo(val) {
        if (val >= $active) return;
        $active = val;
    }

    let shopType = "";
    let shopName = "";

    let address = "";
    let lat = "";
    let lng = "";

    let bankName = "";
    let bankAccName = "";
    let bankAccNr = "";

    async function submitShopForApproval() {
        let data = { shopName, shopType, address, lat, lng, bankAccName, bankName, bankAccNr };
        let res = await post("api/shop", data);
        console.log("🚀 ~ res", res);
        await user.get();
        let msg1 = "You must confirm the terms and conditions";
    }

    onMount(() => {
        user.get();
    });
</script>

<section class="grow col gap-40">
    <div class="row shade1 space-btween pa-20 align-center gap-10">
        {#each headings as heading, index}
            <button on:click={() => jumpTo(index)} class="center gap-10">
                <div class="center pa-4 primary round" class:shade4={index > $active}>
                    {#if $active > index}
                        <Icon icon="fluent:checkmark-16-regular" color="white" />
                    {:else}
                        <div class="w-16 center font-14 weight-300">{index + 1}</div>
                    {/if}
                </div>
                <span class:shade5--text={index !== $active}>{heading.text}</span>
            </button>
            {#if index < headings.length - 1}
                <hr class="grow border" />
            {/if}
        {/each}
    </div>
    <div class="grow">
        {#if $active == 0}
            <ShopName bind:shopName />
        {:else if $active == 1}
            <ShopType bind:shopType />
        {:else if $active == 2}
            <Address bind:_lat={lat} bind:_lng={lng} bind:address />
        {:else if $active == 3}
            <GetPaid bind:bankName bind:bankAccNr bind:bankAccName />
        {:else if $active == 4}
            <Confirm submit={submitShopForApproval} />
        {/if}
    </div>
</section>

<style>
    .round {
        min-width: 25px;
        min-height: 25px;
    }
</style>
