<script>
	import { push } from '@/assets/js/util.js';
    import Icon from "@iconify/svelte";
    import Field from "#/atoms/TextField.svelte";

    function handleClick(active){
        let page = active  === 'active' ? 'active' : 'view'
        push(`/orders/${page}/42`)
    }
</script>

<section class="grow col gap-20">
    <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
        <Icon icon="fluent:text-bullet-list-square-clock-20-regular" width="30" />
        <span>ORDERS</span>
    </h1>
    <div class="grow col shade3 curve">
        <div class="row pa-20 shade3  w100 align-center gap-10">
            <Icon icon="fluent:search-16-regular" width="20" />
            <input type="text" placeholder="Search for a order" />
        </div>
        <hr />
        <div class="col w100 ">
            <button on:click={() => handleClick('active')} class="grid shine w100 pa-20 space-between  shade3">
                <span class="row gap-10 justify-start align-center">
                    <div class="imgWrapper center">
                        <Icon icon="fluent:image-32-regular" />
                    </div>
                    <span>Thai seed bank</span>
                </span>
                <span>12 Items</span>
                <span>1,583 THB</span>
                <span class="info--text">Processing Order</span>
                <span>21/06/2022</span>
                <div class="justify-end">
                    <Icon icon="fluent:chevron-right-28-regular" width="20" />
                </div>
            </button>
            <hr />
        </div>
        <div class="col w100 ">
            <button on:click={handleClick} class="grid shine w100 pa-20 space-between  shade3">
                <span class="row gap-10 justify-start align-center">
                    <div class="imgWrapper center">
                        <Icon icon="fluent:image-32-regular" />
                    </div>
                    <span>Oaseeds</span>
                </span>
                <span>2 Items</span>
                <span>183 THB</span>
                <span class="warning--text">In Transit</span>
                <span>25/06/2022</span>
                <div class="justify-end">
                    <Icon icon="fluent:chevron-right-28-regular" width="20" />
                </div>
            </button>
            <hr />
        </div>
        <div class="col w100 ">
            <button on:click={handleClick} class="grid shine w100 pa-20 space-between  shade3">
                <span class="row gap-10 justify-start align-center">
                    <div class="imgWrapper center">
                        <Icon icon="fluent:image-32-regular" />
                    </div>
                    <span>MetaRoadGrows</span>
                </span>
                <span>6 Items</span>
                <span>1183 THB</span>
                <span class='success--text'>Delivered</span>
                <span>05/05/2022</span>
                <div class="justify-end">
                    <Icon icon="fluent:chevron-right-28-regular" width="20" />
                </div>
            </button>
            <hr />
        </div>
        <div class="col w100 ">
            <button on:click={handleClick} class="grid shine w100 pa-20 space-between  shade3">
                <span class="row gap-10 justify-start align-center">
                    <div class="imgWrapper center">
                        <Icon icon="fluent:image-32-regular" />
                    </div>
                    <span>MetaRoadGrows</span>
                </span>
                <span>6 Items</span>
                <span>1183 THB</span>
                <span class='error--text'>Cancelled</span>
                <span>05/05/2022</span>
                <div class="justify-end">
                    <Icon icon="fluent:chevron-right-28-regular" width="20" />
                </div>
            </button>
            <hr />
        </div>
    </div>
</section>

<style>
    .grid {
        display: grid;
        grid-template-columns: 2fr 2fr 2fr 2fr 2fr 1fr;
    }

    span {
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .imgWrapper {
        min-width: 20px;
    }
</style>
