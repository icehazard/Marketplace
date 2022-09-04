<script>
    import { push } from "svelte-spa-router";
    import Icon from "@iconify/svelte";
    import admin from "@/store/admin";
    import Field from "comp/atoms/TextField.svelte";
    import Button from "comp/atoms/Button.svelte";

    function viewProfile(id) {
        push(`#/shops/id/${id}`);
    }

    async function activate(id) {
        let res = await admin.post(id);
        console.log("🚀 ~ res", res)
        admin.get()
    }
    
</script>

<section class="grow col gap-20">
    <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
        <Icon icon="fluent:text-bullet-list-square-clock-20-regular" width="30" />
        <span>Pending Shop Approval</span>
    </h1>
    <div class="grow col shade3 curve">
        <div class="row pa-20 shade3  w100 align-center gap-10">
            <Icon icon="fluent:search-16-regular" width="20" />
            <input type="text" placeholder="Search for a shop" />
        </div>
        <hr />
        <div class="col w100">
            {#each $admin.pendingShops as shop}
                <button
                    on:click={() => viewProfile("id")}
                    class="row shine w100 pa-20 space-between row shade3 align-center justify-start gap-50"
                >
                    <span class="row grow">{shop.shopName || "No name provided"} </span>
                    <span class="row">{shop.shopType}</span>
                    <button on:click|stopPropagation>
                        <Button primary text="Approve" on:click={() => activate(shop._id)} />
                    </button>
                    <div class="justify-end">
                        <Icon icon="fluent:chevron-right-28-regular" width="20" />
                    </div>
                </button>
                <hr />
            {/each}
        </div>
        {#if $admin.pendingShops.length == 0}
           <div class="center pa-50">
            <span>No shops pending</span>
           </div>
        {/if}
    </div>
</section>

<style>
    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
