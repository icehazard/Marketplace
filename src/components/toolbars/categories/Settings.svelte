<script>
    import Icon from "@iconify/svelte";
    import { mq } from "@/assets/library/MediaQuery.svelte";
    import active from 'svelte-spa-router/active'

    import {link} from 'svelte-spa-router'
</script>

{#if $mq.lg_}
    <div class="w-300 w100">
        <aside class="shade3 w-300 w100 curve fixed">
            <a href="#/account" class="row px-20 align-center space-between shine w100"  use:link  use:active>
                <div class="row py-20 align-center gap-10">
                    <Icon icon="mdi:account-outline" width="22" />
                    <div>Account</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <a href="#/addresses/overview" class="row px-20 py-20 align-center space-between w100 shine"  use:link  use:active use:active={  '/addresses/*'}>
                <div class="row align-center gap-10">
                    <Icon icon="fluent:location-12-regular" width="22" />
                    <div>Address</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <a href="#/orders/overview" class="row px-20 py-20 align-center space-between w100 shine"  use:link  use:active={  '/orders/*'}>
                <div class="row align-center gap-10">
                    <Icon icon="fluent:text-bullet-list-square-clock-20-regular" width="22" />
                    <div>Orders</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <!-- <a href="#/store/settings" class="row px-20 py-20 align-center space-between w100 shine"  use:link  use:active={  '/store/*'}>
                <div class="row align-center gap-10">
                    <Icon icon="fluent:building-shop-16-regular" width="22" />
                    <div>Shop</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr /> -->
            <a href="#/wallet/overview" class="row px-20 py-20 align-center space-between w100 shine"  use:link  use:active={  '/wallet/*'}>
                <div class="row align-center gap-10">
                    <Icon icon="fluent:wallet-16-regular" width="22" />
                    <div>Wallet</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <a href="#/settings" class="row px-20 py-20 align-center space-between w100 shine" use:active>
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
