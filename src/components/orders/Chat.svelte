<script>
  import Bubble from "./Bubble.svelte";

  let data = [];
  let msg = "";

  function submit() {
    console.log(msg);
    data = [...data, { sender: true, text: msg, time: "17:54" }];
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
