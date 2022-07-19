<script>
	import Chat from './../messages/Chat.svelte';
    
    let expand = true;

    function close(){
        expand = false
    }
    function open(){
        expand = true
    }
</script>

<div class="shade1 absolute p-bottom col curve z-3  slow" class:expanded={expand}>
    <div class="row space-between pa-20 gap-20">
        <button  on:click={close} class="border curve pa-10 grow center"> Order Details </button>
        <button  on:click={open} class="border curve pa-10 grow center"> Payment </button>
        <button on:click={open} class="border curve pa-10 grow center"> Chat </button>
    </div>
    <hr />
   {#if !expand}
   <div class="row space-between align-center h100 pa-20">
    <div class="col gap-20 ">
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
        bottom: 90px;
        width: 100% ;
        height: 250px;
    }

    .expanded{
        height: calc(100% - 50px);
    }
</style>
