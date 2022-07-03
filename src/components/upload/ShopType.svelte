<script>
    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";
    import { shopValid, active } from "@/store/store.js";
    import "@lottiefiles/lottie-player";

    export let shopType;
    $: shopType, ($shopValid[1] = validate());

    function validate() {
        if (shopType == 0) return true;
        return false;
    }
    function next() {
        $active++;
        if (shopType == 1) $active++;
    }
    function changeIndex(val) {
        shopType = val;
    }
    function values(val) {
        if (val == 1) return "Online Store";
        if (val == 2) return "Physical Store";
        if (val == 3) return "Online and Physical Stores";
        else return "Select your service";
    }
</script>

<form class="center col shade3 curve py-50 px-10 pb-100">
    <div id="svgContainer" />
    <div class="center col w-sm gap-40">
        <h1 class="font-36 weight-300">Shop Type</h1>
        <div class="text-center">
            {#if shopType == 0}
                <p>
                    Select the option that best describes your business. Is your business online or
                    do you also have a physical location?
                </p>
            {/if}
            {#if shopType == 1}
                <p>
                    A online store does't have a physical location that customers can shop at but
                    offerds a delivery service for your products. No address is required.
                </p>
            {/if}
            {#if shopType == 2}
                <p>
                    A physical store has a physical location that customers can shop at but does not
                    offer a delivery service for your products
                </p>
            {/if}
            {#if shopType == 3}
                <p>
                    Online & Physical stores offer both a physical place for customers to shop and
                    also offer a delivery serice for your products.
                </p>
            {/if}
            <p />
        </div>

        <div class="row font-24">
            {values(shopType)}
        </div>
        <div class="curve row gap-10 w-sm">
            <button
                class="item col grow center  ratio relative col1"
                class:active={shopType === 1}
                on:click={() => changeIndex(1)}
            >
                {#if shopType == 1}
                    <div class="absolute p-top p-right">
                        <lottie-player
                            autoplay
                            mode="normal"
                            src="https://assets9.lottiefiles.com/datafiles/8UjWgBkqvEF5jNoFcXV4sdJ6PXpS6DwF7cK4tzpi/Check Mark Success/Check Mark Success Data.json"
                            style="width: 50px"
                        />
                    </div>
                {/if}

                <div class="">
                    <lottie-player
                        autoplay
                        mode="normal"
                        src="https://assets3.lottiefiles.com/packages/lf20_pm5qdb4j.json"
                        style="width: 180px"
                    />
                </div>
                <p class="absolute p-bottom p-left px-10 py-5 ma-5 shade3 curve font-18">Online</p>
            </button>
            <button
                class="curve item row grow center col ratio relative col2"
                on:click={() => changeIndex(2)}
                class:active={shopType === 2}
            >
                {#if shopType == 2}
                    <div class="absolute p-top p-right">
                        <lottie-player
                            autoplay
                            mode="normal"
                            src="https://assets9.lottiefiles.com/datafiles/8UjWgBkqvEF5jNoFcXV4sdJ6PXpS6DwF7cK4tzpi/Check Mark Success/Check Mark Success Data.json"
                            style="width: 50px"
                        />
                    </div>
                {/if}

                <div class="">
                    <lottie-player
                        autoplay
                        mode="normal"
                        src="https://assets9.lottiefiles.com/temp/lf20_pvqAgi.json"
                        style="width: 180px"
                    />
                </div>
                <p class="absolute p-bottom p-left px-10 py-5 ma-5 shade3 curve font-18">
                    Physical
                </p>
            </button>
            <button
                class="curve item row grow center col ratio relative col3"
                class:active={shopType === 3}
                on:click={() => changeIndex(3)}
            >
                {#if shopType == 3}
                    <div class="absolute p-top p-right">
                        <lottie-player
                            autoplay
                            mode="normal"
                            src="https://assets9.lottiefiles.com/datafiles/8UjWgBkqvEF5jNoFcXV4sdJ6PXpS6DwF7cK4tzpi/Check Mark Success/Check Mark Success Data.json"
                            style="width: 50px"
                        />
                    </div>
                {/if}
                <div class="">
                    <lottie-player
                        autoplay
                        mode="normal"
                        src="https://assets10.lottiefiles.com/packages/lf20_kz2ylhyq.json"
                        style="width: 180px"
                    />
                </div>
                <p class="absolute p-bottom p-left px-10 py-5 ma-5 shade3 curve font-18">
                    Online & Physical
                </p>
            </button>
        </div>
    </div>
    <div class="pt-50  row w-sm  w100  z-2">
        <div class=" center w100">
           <div class="w60">
            <Button on:click={next} type="button" disable={$shopValid[1]} text="CONTINUE" />
           </div>
        </div>
    </div>
</form>

<style>
    .col3 {
        background-color: #cfdeff;
    }

    .col1 {
        background-color: #628cf5;
    }

    .col2 {
        background-color: #fe83a9;
    }

    .item {
        transition: 0.3s all ease;
    }
    .item:hover {
        filter: contrast(1.5);
        transform: scale(1.01);
        box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
    }

    .active {
        filter: contrast(1.2);
        outline: 3px solid #6cca5f;
        outline-offset: 3px;
        box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
        font-weight: 600;
    }
</style>
