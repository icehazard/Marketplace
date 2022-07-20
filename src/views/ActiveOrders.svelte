<script>
    import Floating from "comp/orders/Floating.svelte";
    import Map from "comp/atoms/Map.svelte";
    import Contacts from "comp/orders/Contacts.svelte";
    import Chat from "comp/orders/Chat.svelte";
    import Categories from "comp/toolbars/categories/Settings.svelte";
</script>

<section class="row h100 container gap-20 pt-50">
    <Categories />
    <Contacts />
    <section class="grow col relative">
        <Floating />
        <Map />
    </section>
</section>
