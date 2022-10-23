<script>
    import orders from "@/store/orders";
    import dayjs from "dayjs";
    import Icon from "@iconify/svelte";
    import { notify } from "@/assets/js/util.js";
    import { Shadow } from "svelte-loading-spinners";

    async function copy() {
        await navigator.clipboard.writeText($orders.order.trackingNumber);
        notify(1, "Copied to clipboard");
    }

    orders.patch($orders.order._id, { deliveryStatus: 3 });
</script>

{#if Object.keys($orders.tracking).length > 0 && $orders.order.trackingNumber}
    <div class="col pa-15 my-10 h100 gap-20">
        <div class="row gap-20 align-center">
            <img src={$orders.tracking.express_icon} class="w-100 h-50 contain icon" alt="" />
            <div class="col gap-7">
                <span>Delivery Partner</span>
                <span class="font-12 opacity-75">
                    {$orders.tracking.express_name || "..."}
                </span>
            </div>
        </div>
        <div class="row gap-15 align-center">
            <span class="font-14">Tracking Number</span>
            <span class="font-12 opacity-75 primary--text">
                {$orders.tracking.pno || ""}
            </span>
            <button on:click={copy}>
                <Icon color="var(--primary)" height="14" icon="ant-design:copy-outlined" />
            </button>
        </div>
        <hr />
        <div class="col gap-20 pt-20">
            {#each $orders.tracking.routes || [] as item}
                <div class="row gap-40 pl-20 h-60">
                    <div class="col font-14 opacity-75 gap-7">
                        <div class="row">
                            {dayjs(item.routed_at).format("HH:mm")}
                        </div>
                        <div class="row">
                            {dayjs(item.routed_at).format(" D MMM")}
                        </div>
                    </div>
                    <div class="col align-center">
                        <span class="white round w-10 h-10  w100" />
                        <span class="line white" />
                    </div>
                    <div class="font-14 opacity-75">{item.message || ""}</div>
                </div>
            {/each}
        </div>
    </div>
{:else if $orders.order.trackingNumber && $orders.tracking !== false}
    <div class="col  center py-30 gap-20">
        <span class="font-14 opacity-75"> Loading tracking information</span>
        <Shadow size="16" color="white" unit="px" duration="1s" />
    </div>
{/if}

<style>
    .round {
        height: 5px;
        max-height: 5px;
        min-height: 5px;
        width: 5px;
        max-width: 5px;
        min-width: 5px;
    }

    .line {
        height: 100%;
        max-height: 100%;
        min-height: 100%;
        width: 1px;
        max-width: 1px;
        min-width: 1px;
        opacity: 0.2;
    }

    .icon {
        min-width: 100px;
        min-height: 50px;
    }
</style>
