<script>
  import Map from "./../atoms/Map.svelte";
  import Button from "comp/atoms/Button.svelte";
</script>

<section class="grow col center">
  <div class="w100 col h100 pa-20 gap-20 grow">
    <div class="col gap-10 w100 grow relative">
      <div class="shade1 pa-20 absolute p-bottom col curve z-3 ma-20">
        <div class="row space-between pb-20 gap-20" >
          <button class="border curve pa-10 grow center">
            Order Details
          </button>
          <button class="border curve pa-10 grow center">
            Payment
          </button>
          <button class="border curve pa-10 grow center">
            Chat
          </button>
        </div>
        <hr>
        <div class="row space-between align-center h100" >
          <div class="col gap-20">
            <span>Order ID</span>
            <span>#233238723</span>
          </div>
          <div class="col gap-20">
            <span>Product</span>
            <span>PWhite Widow</span>
          </div>
          <div class="col gap-20">
            <span>Price</span>
            <span>EUR 289</span>
          </div>
          <div class="col gap-20">
            <span>Address</span>
            <span>Soi king pattana 4</span>
          </div>
        </div>
      </div>
      <Map />
    </div>
    <!-- <div class="row center">
        <Button text='Cancel'></Button>
      </div> -->
  </div>
</section>

<style>
  .absolute{
    bottom: 50px;
    width: calc(100% - 40px);
    height: 250px;
  }
</style>
