<script>
    import products from "@/store/products.js";

    let id = $products.product.shopID;
</script>

<div class="shade1 pa-50 curve col gap-50">
    <h1>{$products?.product?.name || ""}</h1>
    <div class="row space-between">
        <a href={`#/shops/id/${id}`} class="gradient--text font-18">{id || ""}</a>
        <a href="#/messages" class="primary--text link">Contact seller</a>
    </div>
</div>
