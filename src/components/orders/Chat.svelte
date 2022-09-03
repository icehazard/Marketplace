<script>
  import Bubble from "./Bubble.svelte";
  import { afterUpdate } from "svelte";
  import { ws } from "@/store/ws";
  import orders from "@/store/orders";
  import user from "@/store/user";

  let msg = "";
  let el;

  function scroll() {
    if (!el) return;
    let dif = el.scrollTop + 500 - el.scrollHeight;
    if (dif < -120) return;
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
      _id: new Date(),
      time: new Date(),
    };
  }

  afterUpdate(() => {
    scroll();
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
