<script>
    import Icon from "@iconify/svelte";
    import Button from "../atoms/Button.svelte";
    import { push, location } from "svelte-spa-router";
    import user from "@/store/user";
    import { mq } from "@/assets/js/MediaQuery.svelte";

    $: choose = $location.includes("choose");

    function addNew() {
        if (choose) return push(`#/addresses/add/choose`);
        push("#/addresses/add");
    }

    function edit(index) {
        push(`#/addresses/edit/${index}`);
    }

    function del(index, item) {
        user.delHomeAddress(index, item);
    }

    function selectDefault(idx, item) {
        $user.addresses.map((el) => (el.default = false));
        item.default = true;
        user.editHomeAddress(idx, item);
        if (choose) push(`#/cart`);
    }
</script>

<section class="grow col gap-20">
    <div class="row space-between">
        <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
            <Icon icon="fluent:location-16-regular" width="30" />
            <span>Address</span>
        </h1>
        {#if $mq.sm_}
            <Button primary text="Add New Address" on:click={addNew} />
        {/if}
    </div>
    <div class="grow col shade3 curve">
        {#if $user.addresses.length == 0}
            <div class="row center pa-20 weight-300">
                <a href="#/addresses/add">No address saved. Click to add an address</a>
            </div>
        {/if}
        {#each $user.addresses as item, idx}
            <label class="row cursor-pointer shine check">
                <input type="radio" checked={item.default} name="radio" class="none" />
                <span class="checkmark" />
                <div
                    class="row w100 pa-20 space-between shade3 nowrap gap-20 pl-60"
                    on:click|stopPropagation={() => selectDefault(idx, item)}
                >
                    <div class="row center gap-20 nowrap">
                        <Icon icon={item.icon} width="30" />
                        <div class="col gap-10">
                            <span>{item.name}</span>
                            <span class="font-14 opacity-75 white_space_normal">{item.address}</span
                            >
                        </div>
                    </div>
                    <div class="row gap-30 center nowrap primary--text">
                        <button class="row gap-30" on:click|stopPropagation={() => edit(idx)}>
                            <Icon icon="fluent:edit-16-regular" width="25" />
                        </button>
                        {#if !choose}
                            <button
                                class="row gap-30"
                                on:click|stopPropagation={() => del(idx, item)}
                            >
                                <Icon icon="fluent:delete-16-regular" width="25" />
                            </button>
                        {/if}
                    </div>
                </div>
            </label>
            <hr />
        {/each}
    </div>
</section>

{#if !$mq.sm_}
    <div class="fixed w100">
        <Button primary text="Add New Address" block="true" on:click={addNew} />
    </div>
{/if}

<style>
    .fixed {
        bottom: 55px;
    }

    .check {
        display: block;
        position: relative;
        
        width: 100%;
        cursor: pointer;
        font-size: 16px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default radio button */
    .check input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom radio button */
    .checkmark {
        position: absolute;
        transform: translate(100%, -50%);
        top: 50%;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #eee;
        border-radius: 50%;
    }

    /* On mouse-over, add a grey background color */
    .check:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the radio button is checked, add a blue background */
    .check input:checked ~ .checkmark {
        background-color: var(--primary);
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the indicator (dot/circle) when checked */
    .check input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the indicator (dot/circle) */
    .check .checkmark:after {
        top: 6px;
        left: 6px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #1a1a1a;
    }
</style>
