<script>
	import orders from '@/store/orders';
    import Chat from "./Chat.svelte";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";
    

    let expand = true;

    function close() {
        expand = false;
    }
    function open() {
        expand = true;
    }

</script>

<div class="shade1 absolute p-bottom col  z-2  slow" class:expanded={expand}>
    <div class="row space-between pa-20 gap-20">
        <button on:click={open} class="border curve pa-10 grow center">Chat </button>
        <button on:click={close} class="border curve pa-10 grow center"> Map </button>
        <button on:click={close} class="border curve pa-10 grow center"> Cancel Order</button>
    </div>
    <hr />
    <div class="row space-between align-center gap-20 pa-20">
        <div class="col gap-20 grow">
            <span class="opacity-75">Order ID</span>
            <span>{$orders.order._id}</span>
        </div>
        <div class="col gap-20 grow">
            <span class="opacity-75">Product</span>
            <span>White Widow</span>
        </div>
        <div class="col gap-20 grow">
            <span class="opacity-75">Price</span>
            <span>{formatCurrency($orders.order.total)}</span>
        </div>
        <div class="col gap-20 grow">
            <span class="opacity-75">Address</span>
            <span class="font-14">{$orders.order.address}</span>
        </div>
    </div>
    <hr>
    <Chat />
</div>

<style>
    .absolute {
        bottom: 0px;
        width: 100%;
        height: 180px;
        overflow: hidden;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .expanded {
        height: 100%;
       
    }
</style>
