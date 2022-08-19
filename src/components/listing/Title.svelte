<script>
    import products from "@/store/products.js";
    import { isOwnShop } from "@/store/shops.js";

    let shop = $products.product;
</script>

<div class="shade1 pa-50 curve col gap-50">
    <h1>{shop?.name || "No Title"}</h1>
    <div class="row space-between">
        <a href={`#/shops/id/${shop?.shopID}`} class="opacity-75 font-18">{shop?.shopName || ""}</a>

        {#if !$isOwnShop}
            <a href="#/messages" class="primary--text link">Contact seller</a>
        {/if}
    </div>
</div>
