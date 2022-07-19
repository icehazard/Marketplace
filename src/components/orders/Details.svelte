<script>
	import Map from './../atoms/Map.svelte';
	import Button from 'comp/atoms/Button.svelte';
</script>
<section  class="grow col center">
    <div class="w100 col h100 pa-20 gap-20 ">
      <div class="col center gap-20">
        <span class="opacity-75">Order Summery </span>
        <h1 class='font-28 weight-300'>Waiting confirmation</h1>
        <span class="font-14 opacity-75">Order # 232303</span>
      </div>
      <div class="col gap-10">
        <span class="font-14">Est. Delivery time</span>
        <h1 class='font-20 weight-300'>2 - 4 Days</h1>
      </div>
      <div class="col gap-10">
        <span class="font-14">Time placed</span>
        <h1 class='font-20 weight-300'>	9 Jul 2022 at 4:36 PM</h1>
      </div>
      <div class="col gap-10 w100 grow">
        <span class="font-14">Delivering to:</span>
        <span class="border py-10">
            <span class="px-10">Soi king pattana 3, phuket</span>
        </span>

        <Map />
      </div>
      <div class="row center">
        <Button text='Cancel'></Button>
      </div>
    </div>
</section>