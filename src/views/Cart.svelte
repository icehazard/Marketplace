<script>
    import Empty from "comp/cart/Empty.svelte";
    import HowPay from "comp/cart/HowPay.svelte";
    import Item from "comp/cart/Item.svelte";
    import Header from "comp/cart/Header.svelte";
    import cart from "@/store/cart.js";

    cart.syncCartFromServer();
</script>

<main class="row container my-50 gap-50 grow">
    <section class="col grow gap-50">
        <Header />
        <div class="row gap-50">
            <div class="col gap-20 grow">
                {#if $cart.cart.length == 0}
                    <Empty />
                {/if}
                {#each $cart.cart as item}
                    <Item data={item} />
                {/each}
            </div>
            {#if $cart.cart.length !== 0}
                <HowPay />
            {/if}
        </div>
    </section>
</main>
