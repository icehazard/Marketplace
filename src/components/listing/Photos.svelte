<script>
    import logo from "@/assets/images/logo.svg";
    import { product } from "@/store/products.js";
</script>

<section class="shade1 curve center">
    <img src={$product.image} alt="" class="w100 h100" />
</section>

<style>
    img {
        
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    section {
        overflow: hidden;
    }
</style>
