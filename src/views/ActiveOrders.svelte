<script>
    import Floating from "comp/orders/Floating.svelte";
    import Contacts from "comp/orders/Contacts.svelte";
    import Map from "comp/atoms/Map";
    import Details from "comp/orders/Details.svelte";
    import orders from "@/store/orders";
    import user from "@/store/user";
    import { push, location } from "svelte-spa-router";
    import { mq } from "@/assets/library/MediaQuery.svelte";

    $: $location, update();
    let menu = false;

    function update() {
        let loc = $location.split("/");
        if (!loc.includes("orders")) return;
        loc = loc[loc.length - 1];
        if (isNaN(loc) && $user.orders.length !== 0) return getLast();
        orders.get(loc);
        orders.getChat(loc);
    }
    async function getLast() {
        await user.get();
        let id = $user.orders[0]._id;
        await orders.get(id);
        await orders.getChat(id);
        push(`#/orders/active/${id}`);
    }

    update();
    user.get();
</script>

<section class="row h100 container gap-50 pt-50">
    <div class="col grow gap-20">
        <Details />
        {#if $mq.md_}
            <div class="row grow gap-20">
                <Contacts />
                <section class="grow col relative containerHeight">
                    <Floating />
                    <!-- <Map /> -->
                </section>
            </div>
        {:else}
            <div class="row grow gap-20">
                {#if menu}
                    <Contacts />
                {:else}
                    <section class="grow col relative containerHeight">
                        <Floating />
                        <!-- <Map /> -->
                    </section>
                {/if}
            </div>
        {/if}
    </div>
</section>

<style>
    .containerHeight {
        height: calc(100vh - 200px);
    }
</style>
