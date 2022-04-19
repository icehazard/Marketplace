<script>
    import Navbar from "comp/toolbars/navbar/Navbar.svelte";
    import Categories from "comp/toolbars/categories/Categories.svelte";
    import Listings from "comp/listings/Listings.svelte";
    import store from '@/store/store'

</script>

<section>
    <Navbar />
    <div class="row container mt-50 gap-50">
        <Categories />
        <Listings />
    </div>
  
</section>
