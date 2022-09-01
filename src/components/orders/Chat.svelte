<script>
  import Bubble from "./Bubble.svelte";

  let data = [
    { sender: true, text: "Did you eat anything cocksucker", time: "17:54" },
  ];

  let msg = '';

  function submit(){
    console.log(msg)
    data = [...data, { sender: true, text: msg, time: "17:54" }]

    msg = '';
  }
</script>

<div class="grow col">
  <div class="col grow frame">
    {#each data as item}
      <Bubble item={item} />
    {/each}
  </div>
  <form class="row shade0 px-20  h-60 align-center" on:submit={submit}>
    <input  bind:value={msg}  type="text" class="w100" placeholder="Write a message" />
  </form>
</div>

<style>
  .frame{
    height: calc(100vh - 190px);
    overflow: overlay;
  }
  
</style>
