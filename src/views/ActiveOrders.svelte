<script>
    import Floating from "comp/orders/Floating.svelte";
    import Map from "comp/atoms/Map.svelte";
    import Contacts from "comp/orders/Contacts.svelte";
    import Details from "comp/orders/Details.svelte";
    import Categories from "comp/toolbars/categories/Settings.svelte";
    import orders from "@/store/orders";
    import user from "@/store/user";
    import { push, location } from "svelte-spa-router";

   $: $location, update();

    function update() {
        let loc = $location.split("/");
        loc = loc[loc.length - 1];
        if (isNaN(loc) &&  $user.orders.length !== 0) return getLast();

        orders.get(loc);
        orders.getChat(loc)
    }
    async function getLast() {
        await user.get();
        let id = $user.orders[0]._id
        await orders.get(id);
        await orders.getChat(id)
        push(`#/orders/active/${id}`)
    }

    update();
    user.get();
</script>

<section class="row h100 container gap-50 pt-50">
    <!-- <Categories /> -->
    <div class="col grow gap-20">
        <Details />
        <div class="row grow gap-20">
            <Contacts />
            <section class="grow col relative lol">
                <Floating />
                <!-- <Map /> -->
            </section>
        </div>
    </div>
</section>

<style>
    .lol {
        height: calc(100vh - 200px);
    }
</style>
