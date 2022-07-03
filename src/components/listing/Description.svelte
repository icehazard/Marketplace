<script>
    import Icon from "@iconify/svelte";
    import products from "@/store/products.js";
</script>

<div class="shade1 pa-50 curve col gap-20">
    <div class="opacity-75 row align-center gap-10">
        <Icon icon="fluent:text-description-20-regular" />
        <div>Description</div>
    </div>
    <div>
       {$products.product.description}
    </div>
</div>
