<script>
    import Icon from "@iconify/svelte";
    import { mq } from "@/assets/library/MediaQuery.svelte";
    import active from 'svelte-spa-router/active'
    import {link} from 'svelte-spa-router'
</script>

{#if $mq.lg_}
    <div class="w-300">
        <aside class="shade3 w-300 curve fixed">
            <a href="#/" class="row px-20 align-center space-between shine w100"  use:link  use:active>
                <div class="row py-20 align-center gap-10">
                    <Icon icon="fluent:home-16-regular" width="22" />
                    <div>All products</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <a href="#/shops" class="row px-20 py-20 align-center space-between w100 shine" use:link  use:active>
                <div class="row align-center gap-10">
                    <Icon icon="fluent:building-shop-16-regular" width="22" />
                    <div>Browse shops</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <a href="#/top" class="row px-20 py-20 align-center space-between w100 shine"  use:link  use:active>
                <div class="row align-center gap-10">
                    <Icon icon="lucide:award" width="22" />
                    <div>Top selling products</div>
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