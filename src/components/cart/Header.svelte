<script>
      
    import cart from "@/store/cart.js";
    import Icon from "@iconify/svelte";
    import pluralize from "pluralize";        
</script>

<div class="row weight-300 center">
    <div class="row font-36 grow">
        {$cart.cart.length}
        {pluralize("item", $cart.cart.length)}
        in your cart
    </div>
    <Icon icon="fluent:chevron-left-16-regular" />
    <a href="/#" class="pl-10">Keep shopping</a>
</div>