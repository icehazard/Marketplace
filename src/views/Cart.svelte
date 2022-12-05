<script>
    import HowPay from "#/cart/HowPay.svelte";
    import Header from "#/cart/Header.svelte";
    import cart from "@/store/cart.js";
    import Button from "#/atoms/Button.svelte";
    import { mq } from "@/assets/js/MediaQuery.svelte";
    import List from "@/components/cart/List.svelte";

    function next() {
        $cart.smList = true;
    }

    cart.syncCartFromServer();
</script>

<main class="row container my-50 gap-50 grow">
    <section class="col grow gap-50">
        <Header />
        <div class="row gap-50 " class:center={!$mq.lg_}>
            {#if !$cart.smList || $mq.lg_}
                <List />
            {/if}
            {#if ($cart.cart.length !== 0 && $mq.lg_) || $cart.smList}
                <HowPay />
            {/if}
        </div>
    </section>
</main>
{#if !$mq.lg_ && !$cart.smList}
    <div class="row center pa-7">
        <Button primary text="PROCEED TO CHECKOUT" on:click={next} />
    </div>
{/if}
