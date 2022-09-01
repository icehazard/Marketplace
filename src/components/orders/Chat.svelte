<script>
  import Bubble from "./Bubble.svelte";

  let data = [
    { sender: true, text: "Did you eat anything cocksucker", time: "17:54" },
  ];
</script>

<div class="grow col">
  <div class="col grow frame">
    {#each data as item}
      <Bubble item={item} />
    {/each}
  </div>
  <div class="row shade0 px-20  h-60 align-center">
    <input type="text" class="w100" placeholder="Write a message" />
  </div>
</div>

<style>
  .frame{
    height: calc(100vh - 190px);
    overflow: overlay;
  }
  
</style>
