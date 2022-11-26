<script>
    import Icon from "@iconify/svelte";
    import { mq } from "@/assets/js/MediaQuery.svelte";
</script>

{#if $mq.lg_}
    <div class="w-300 w100">
        <aside class="shade3 w-300 w100 curve fixed">
            <a href="/" class="row px-20 align-center space-between shine w100"  >
                <div class="row py-20 align-center gap-10">
                    <Icon icon="fluent:home-16-regular" width="22" />
                    <div>All products</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <!-- <a href="/shops" class="row px-20 py-20 align-center space-between w100 shine" >
                <div class="row align-center gap-10">
                    <Icon icon="fluent:building-shop-16-regular" width="22" />
                    <div>Browse shops</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr /> -->
            <!-- <a href="/categories/top" class="row px-20 py-20 align-center space-between w100 shine"  >
                <div class="row align-center gap-10">
                    <Icon icon="lucide:award" width="22" />
                    <div>Top selling products</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr /> -->
            <a href="/categories/flower" class="row px-20 py-20 align-center space-between w100 shine"  >
                <div class="row align-center gap-10">
                    <Icon icon="mdi:cannabis" width="22" />
                    <div>Flower</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <a href="/categories/clones" class="row px-20 py-20 align-center space-between w100 shine"  >
                <div class="row align-center gap-10">
                    <Icon icon="mdi:seedling-outline" width="22" />
                    <div>Clones</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <a href="/categories/seeds" class="row px-20 py-20 align-center space-between w100 shine"  >
                <div class="row align-center gap-10">
                    <Icon icon="mdi:seed-outline" width="22" />
                    <div>Seeds</div>
                </div>
                <Icon icon="fluent:chevron-right-16-regular" width="16" />
            </a>
            <hr />
            <a href="/categories/hydroponics" class="row px-20 py-20 align-center space-between w100 shine"  >
                <div class="row align-center gap-10">
                    <Icon icon="mdi:bucket-outline" width="22" />
                    <div>Hydroponic systems</div>
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