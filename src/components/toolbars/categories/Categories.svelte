<script>
    import Icon from "@iconify/svelte";
    import  { mq } from '@/assets/library/MediaQuery.svelte'  
</script>
{#if $mq.lg_}
<div class="w-300">
    <aside class="shade3 w-300 px-20 curve fixed">
        <div class="row py-20 align-center space-between">
            <div class="row align-center gap-10">
                <Icon icon="mdi:cannabis" width="22"  />
                <div>Drugs</div>
            </div>
            <Icon icon="mdi:chevron-down" width="22" />
        </div>
        <hr />
        <div class="row py-20 align-center space-between">
            <div class="row align-center gap-10">
                <Icon icon="bi:credit-card-2-front-fill" width="22" />
                <div>Forgeries</div>
            </div>
            <Icon icon="mdi:chevron-down" width="22" />
        </div>
        <hr />
        <div class="row py-20 align-center space-between">
            <div class="row align-center gap-10">
                <Icon icon="dashicons:book" width="22" />
                <div>Books</div>
            </div>
            <Icon icon="mdi:chevron-down" width="22" />
        </div>
        <hr />
    
        <div class="row py-20 align-center space-between">
            <div class="row align-center gap-10">
                <Icon icon="dashicons:art" width="22" />
                <div>Art</div>
            </div>
            <Icon icon="mdi:chevron-down" width="22" />
        </div>
        <hr />
        <div class="row py-20 align-center space-between">
            <div class="row align-center gap-10">
                <Icon icon="bi:device-ssd-fill" width="22" />
                <div>Electronics</div>
            </div>
            <Icon icon="mdi:chevron-down" width="22" />
        </div>
        <hr />
        <div class="row py-20 align-center space-between">
            <div class="row align-center gap-10">
                <Icon icon="map:jewelry-store" width="22" />
                <div>Jewelry</div>
            </div>
            <Icon icon="mdi:chevron-down" width="22" />
        </div>
        <hr />
    
        <div class="row py-20 align-center space-between">
            <div class="row align-center gap-10">
                <Icon icon="raphael:lab" width="22" />
                <div>Lab Supplies</div>
            </div>
            <Icon icon="mdi:chevron-down" width="22" />
        </div>
    
    </aside>
</div>
{/if}
