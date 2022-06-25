<script>
    import Field from "comp/atoms/TextField.svelte";
    import { shopName, shopValid, active } from "@/store/store.js";
    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";

    $: $shopName, ($shopValid[0] = validate());

    function validate() {
        if ($shopName.length < 3) return true;
        if ($shopName.length > 20) return true;
        return false;
    }

    function next() {
        $active++;
    }
</script>

<form class:valid={$shopValid[0]} class="center col shade3 curve py-50 px-10 pb-100">
    <div class="center  w-sm gap-40">
        <h1 class="font-36 weight-300">Name your shop</h1>
        <p class="text-center">
            Don't sweat it! You can just draft a name now and change it later. We find sellers often
            draw inspiration from what they sell, their style, pretty much anything goes. More
            naming tips
        </p>
        <div class="row w100">
            <Field bind:value={$shopName} label="Shop Title" />
        </div>
        <div class="col w100 font-14">
            <div class="row align-center gap-10">
                {#if !$shopValid[0]}
                    <Icon icon="fluent:checkmark-12-regular" height="24" color="green" />
                {:else}
                    <Icon icon="fluent:dismiss-12-regular" height="24" color="red" />
                {/if}
                <p>Between 3-20 characters</p>
            </div>
        </div>
    </div>
    <div class="pt-50  row w-sm  w100  z-2">
        <div class=" center w100">
            <Button on:click={next} type="button" disable={$shopValid[0]} text="CONTINUE" />
        </div>
    </div>
</form>
