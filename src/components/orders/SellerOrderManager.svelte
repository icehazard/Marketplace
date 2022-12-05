<script>
    import Button from "#/atoms/Button.svelte";
    import TextField from "#/atoms/TextField.svelte";
    import orders from "@/store/orders";
    import user from "@/store/user";
    import { notify } from "@/assets/js/util";

    let trackingNumber = $orders.order.trackingNumber || "";
    $: active = $orders.order.deliveryStatus;

    async function confirmOrder() {
        let res = await orders.patch($orders.order._id, { deliveryStatus: 1 });
        await orders.get($orders.order._id);
        if (res.status == "ok") notify(1, "Order has been successfully confirm");
        else notify(0, "Order has been successfully confirm");
    }
    async function updateTracking() {
        let res = await orders.patch($orders.order._id, { deliveryStatus: 2, trackingNumber });
        await orders.get($orders.order._id);
        await orders.track($orders.order.trackingNumber);
        if (res.status == "ok") notify(1, "Tracking has been updated");
        else notify(0, "Could not update tracking");
        $orders.showTracking = false;
    }
   
</script>

{#if user.shopID() == $orders.order.shopId}
    {#if active == 0}
        <div class="shade3 row pa-15 my-10 space-between grow h100 align-center">
            <div class="col gap-7">
                <span>Confirm order</span>
                <span class="font-12 opacity-75">
                    Please check you have the enough stock to fulfill the order before confirming
                </span>
            </div>
            <Button on:click={confirmOrder} primary text="Confirm" />
        </div>
    {:else if active == 1 || $orders.showTracking}
        <div class="shade3 row pa-15 my-10 space-between grow h100 align-center gap-10">
            <div class="col gap-7 grow">
                <span>Confirm handover to delivery</span>
                <span class="font-12 opacity-75">
                    Once the package has been handing to the delivery service, please provide the
                    tracking number and confirm.
                </span>
            </div>
            <div class="row">
                <TextField bind:value={trackingNumber} label="Tracking number" />
            </div>
            <Button on:click={updateTracking} primary text="Confirm" />
        </div>
    {:else if active == 2}
        <div class="shade3 row pa-15 my-10 space-between grow h100 align-center gap-10">
            <div class="col gap-7 grow">
                <span>In transit</span>
                <span class="font-12 opacity-75">
                    The package is with the delivery service and is being delivered to the customer
                </span>
            </div>
        </div>
    {:else if active == 3}
        <div class="shade3 row pa-15 my-10 space-between grow h100 align-center gap-10">
            <div class="col gap-7 grow">
                <span>In transit</span>
                <span class="font-12 opacity-75">
                    The package is with the delivery service and is being delivered to the customer
                </span>
            </div>
        </div>
    {/if}
{/if}
