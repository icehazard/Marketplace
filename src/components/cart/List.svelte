<script>
    import Empty from "comp/cart/Empty.svelte";
    import Item from "comp/cart/Item.svelte";
    import cart from "@/store/cart.js";
</script>

<div class="col gap-20 grow">
    {#if $cart.cart.length == 0}
        <Empty />
    {/if}
    {#each $cart.cart as item}
        <Item data={item} />
    {/each}
</div>
