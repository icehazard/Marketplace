<script>
  import Icon from "@iconify/svelte";
  import { push, location } from "svelte-spa-router";
  import { mq } from "@/assets/library/MediaQuery.svelte";
  import orders from "@/store/orders";

  let loc = $location.split("/");
  loc.includes("orders");

  function handleClick() {
    $orders.smMenu = true;
    let id = $orders.order._id;
    push(`#/orders/active/${id}`);
  }
</script>

<h1 class="row px-20 font-36 weight-300 align-center gap-20">
  <Icon icon="fluent:text-bullet-list-square-clock-20-regular" width="30" />
  <span>ORDERS</span>
  {#if !$mq.lg_ && !$orders.smMenu}
    <button class="ml-auto font-14 center gap-10 shine" on:click={handleClick}>
      <Icon icon="fluent:chevron-left-16-regular" />
      Back
    </button>
  {/if}
</h1>
