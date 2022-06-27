<script>
    import Confirm from "./Confirm.svelte";
    import GetPaid from "./GetPaid.svelte";
    import Address from "./Address.svelte";
    import ShopType from "./ShopType.svelte";
    import ShopName from "./ShopName.svelte";
    import { shopValid, active } from "@/store/store.js";
    import Icon from "@iconify/svelte";

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
            <ShopName />
        {:else if $active == 1}
            <ShopType />
        {:else if $active == 2}
            <Address />
        {:else if $active == 3}
            <GetPaid />
        {:else if $active == 4}
            <Confirm />
        {/if}
    </div>
</section>
