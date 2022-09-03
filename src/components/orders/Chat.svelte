<script>
  import Bubble from "./Bubble.svelte";
  import { afterUpdate, onMount } from "svelte";
  import { ws } from "@/store/ws";
  import orders from "@/store/orders";
  import user from "@/store/user";
  import { snowflake } from "comp/utils/snowflake";

  let msg = "";
  let el;

  function scroll(force) {
    if (!el) return;
    let dif = el.scrollTop + 500 - el.scrollHeight;
    if (dif < -120 && !force) return;
    el.scrollTop = el.scrollHeight;
  }
  function submit() {
    let payload = generatePayload();
    ws.send(JSON.stringify(payload));
    orders.addMsgToStore(payload);
    msg = "";
  }
  function generatePayload() {
    return {
      opcode: "chat",
      orderId: $orders.order._id,
      receiverId: $orders.order.shopId,
      senderId: $user._id,
      msg,
      _id: snowflake.generate(),
    };
  }

  afterUpdate(() => {
    scroll();
  });

  onMount(() => {
    scroll(true);
  });
</script>

<div class="grow col">
  <div class="col grow frame" bind:this={el}>
    {#each $orders.chat as item}
      <Bubble {item} />
    {/each}
  </div>
  <form class="row align-center" on:submit|preventDefault={submit}>
    <input
      maxlength="200"
      bind:value={msg}
      type="text"
      class="w100 px-20 shade0 h-60"
      placeholder="Write a message"
    />
  </form>
</div>

<style>
  .frame {
    height: calc(100vh - 190px);
    overflow: overlay;
  }
</style>
