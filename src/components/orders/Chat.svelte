<script>
  import Icon from "@iconify/svelte";
  import Bubble from "./Bubble.svelte";
  import { afterUpdate, onMount } from "svelte";
  import { ws } from "@/store/ws";
  import orders from "@/store/orders";
  import user from "@/store/user";
  import { snowflake } from "comp/utils/snowflake";

  let msg = "sdf";
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
  <form class="row align-center shade1 slow overflow-hidden" on:submit|preventDefault={submit}>
    <input
      maxlength="200"
      bind:value={msg}
      type="text"
      class="w100 px-20 shade0 h-60 slow shade3 curve"
      placeholder="Write a message"
    />

    <button class="slow h100 wrapHidden shade2 relative overflow-hidden center " class:wrapShow={msg}>
      <div
        class="round pa-10  blue center slow absolute arrowHidden center overflow-hidden"
        class:arrowShow={msg}
      >
        <Icon icon="fa:paper-plane" height="20" />
      </div>
    </button>
  </form>
</div>

<style>
  .wrapHidden {
    min-width: 0;
    overflow: hidden;
  }

  .wrapShow {
    min-width: 60px;
  }

  .arrowHidden {
    translate: 40px;
  }

  .arrowShow {
    translate: 0px;
  }

  .frame {
    height: calc(100vh - 190px);
    overflow: overlay;
  }

  input {
    cursor: text;
  }

  .blue {
    background-color: hsl(235deg, 85.6%, 64.7%);
  }
</style>
