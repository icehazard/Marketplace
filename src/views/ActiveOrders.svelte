<script>
    import Floating from "#/orders/Floating.svelte";
    import Contacts from "#/orders/Contacts.svelte";
    import Map from "#/atoms/Map";
    import Details from "#/orders/Details.svelte";
    import orders from "@/store/orders";
    import app from "@/store/app";
    import user from "@/store/user";
    import { push } from "@/assets/js/util";
    import { mq } from "@/assets/js/MediaQuery.svelte";

    $: $app.url, updatePage();

    $orders.smMenu = true;
    
    async function updatePage() {
        let loc = $app.url.split("/");
        if ($app.loading) return;
        loc = loc[loc.length - 1];
        if (isNaN(loc) && $user.orders.length !== 0) return getLast();
        orders.clear("tracking");
        await orders.get(loc);
        orders.getChat(loc);
        orders.track($orders.order.trackingNumber);

    }
    async function getLast() {
        await user.get();
        let id = $user.orders[0]._id;
        await orders.get(id);
        await orders.getChat(id);
        if (!$app.url.split("/").includes("orders")) return;
        push(`/orders/active/${id}`);
    }

    user.get();
</script>

<section class="row h100 container gap-50 pt-50">
    <div class="col grow gap-20">
        <Details />
        {#if $mq.lg_}
            <div class="row grow gap-20">
                <Contacts />
                <section class="grow col relative containerHeight">
                    <Floating />
                    <!-- <Map /> -->
                </section>
            </div>
        {:else}
            <div class="row grow gap-20">
                {#if $orders.smMenu}
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
        overflow: overlay;
    }
</style>
