<script>
    import Icon from "@iconify/svelte";
    import { mq } from "@/assets/library/MediaQuery.svelte";
</script>

{#if $mq.lg_}
    <div class="w-300">
        <aside class="shade3 w-300 curve fixed">
            <a href="#/profile" class="row px-20 align-center space-between shine w100">
                <div class="row py-20 align-center gap-10">
                    <Icon icon="mdi:account-outline" width="22" />
                    <div>Account</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <a href="#/orders" class="row px-20 py-20 align-center space-between w100 shine">
                <div class="row align-center gap-10">
                    <Icon icon="fluent:text-bullet-list-square-clock-20-regular" width="22" />
                    <div>Orders</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <a href="#/settings" class="row px-20 py-20 align-center space-between w100 shine">
                <div class="row align-center gap-10">
                    <Icon icon="fluent:settings-16-regular" width="22" />
                    <div>Settings</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
        </aside>
    </div>
{/if}

<style>
    .shine:hover {
      background-color: rgba(100, 100, 100, 0.192);
      color: white;
    }
</style>
