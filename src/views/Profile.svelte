<script>
  import Categories from "comp/toolbars/categories/Categories.svelte";
  import Listings from "comp/listings/Listings.svelte";
</script>

<section class="row container my-50 gap-50 grow">
  <Categories />
  <div class="row center grow">
    <div class="col gap-20">
      <a class="white--text border pa-20 center" href="#/todo">Todo</a>
      <a class="white--text border pa-20 center" href="#/dappuni">dappuni</a>
    </div>
  </div>
</section>
