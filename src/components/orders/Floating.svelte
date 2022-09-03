<script>
    import orders from "@/store/orders";
    import Review from "comp/orders/Review.svelte";
    import Chat from "./Chat.svelte";

    let expand = true;
    let review = false;

    function close() {
        expand = false;
        review = false;
    }
    function open() {
        expand = true;
        review = false;
    }
    function details() {
        expand = true;
        review = true;
    }
</script>

<div class="shade1 absolute p-bottom col  z-2  slow" class:expanded={expand}>
    <div class="row space-between pa-10 gap-20">
        <button on:click={open} class="border curve pa-15 grow center">Chat </button>
        <button on:click={details} class="border curve pa-15 grow center"> Details</button>
        <button on:click={close} class="border curve pa-15 grow center"> Map </button>
    </div>
    <hr />
    {#if !review}
        <div class="row">
            <div class="col grow">
                <div class="row gap-20 pa-15 align-center">
                    <span class="opacity-75 w-120 w100">Shop name</span>
                    <span class="font-14 ">{$orders.order.shopName}</span>
                </div>
                <hr />
            </div>
            <div class="col mx-20">
                <div class="row gap-20 pa-15 align-center">
                    <span class="opacity-75 w-80 w100">Status</span>
                    <span class="font-14 ">STATUS</span>
                </div>
                <hr />
            </div>
        </div>
        <div class="row gap-20 pa-15">
            <span class="opacity-75 w-120 w100">Delivery Address</span>
            <span class="font-14">{$orders.order.address}</span>
        </div>
        <hr />
        <Chat />
    {/if}
    {#if review}
        <Review />
    {/if}
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
