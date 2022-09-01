<script>
  import Bubble from "./Bubble.svelte";
  import wsStore, {ws} from "@/store/ws"
  let data = $wsStore.wsdata;
  let msg = "";
  import orders from "@/store/orders"
  import context from "../../store/ws";
  console.log(ws)
  $: {
    $wsStore.wsdata, console.log($wsStore.wsdata), data = $wsStore.wsdata;
  }
  function submit() {
    console.log("Sent chat msg: ", msg);
    //data = [...data, { sender: true, text: msg, time: new Date() }];
    let payload = { sender: true, opcode: "chat", receiverId: $orders.order.shopId, msg, time: new Date() }
    context.commit('wsdata', [...wsStore.val('wsdata'), payload])
    ws.send(JSON.stringify(payload))
    msg = "";
  }
</script>

<div class="grow col">
  <div class="col grow frame">
    {#each data as item}
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
