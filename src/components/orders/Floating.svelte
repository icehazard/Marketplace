<script>
	import Chat from './../messages/Chat.svelte';
    
    let expand = false;

    function expandBox(){
        expand = !expand
    }
</script>

<div class="shade1 pa-20 absolute p-bottom col curve z-3 ma-20 slow" class:expanded={expand}>
    <div class="row space-between pb-20 gap-20">
        <button class="border curve pa-10 grow center"> Order Details </button>
        <button class="border curve pa-10 grow center"> Payment </button>
        <button on:click={expandBox} class="border curve pa-10 grow center"> Chat </button>
    </div>
    <hr />
   {#if !expand}
   <div class="row space-between align-center h100">
    <div class="col gap-20">
        <span  class="opacity-75">Order ID</span>
        <span>#233238723</span>
    </div>
    <div class="col gap-20">
        <span  class="opacity-75">Product</span>
        <span>PWhite Widow</span>
    </div>
    <div class="col gap-20">
        <span  class="opacity-75">Price</span>
        <span>EUR 289</span>
    </div>
    <div class="col gap-20">
        <span class="opacity-75">Address</span>
        <span>Soi king pattana 4</span>
    </div>
</div>
{:else}
<Chat />
   {/if}
</div>

<style>
    .absolute {
        bottom: 50px;
        width: calc(100% - 40px);
        height: 250px;
    }

    .expanded{
        height: calc(100% - 90px);
    }
</style>
