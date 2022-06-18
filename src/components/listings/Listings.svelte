<script>
    import Item from './Item.svelte'
    import { products } from "@/store/products.js";
</script>
<div class="row wrap gap-20 justify-center">
{#each $products as product}
<Item data={product}></Item>
{/each}
    
</div>