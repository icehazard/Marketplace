<script>
    import Field from "comp/atoms/TextField.svelte";
    import Map from "comp/atoms/Map";
    import Button from "comp/atoms/Button.svelte";
    import Icon from "@iconify/svelte";
    import { push, location, pop } from "svelte-spa-router";
    import user from "@/store/user";
    import { onMount } from "svelte";
    import { mq } from "@/assets/library/MediaQuery.svelte";

    let address = "";
    let fullName = "";
    let cellNo = "";
    let el;
    let id = $location.split("/")[3];
    $: type = $location.includes("edit");
    $: choose = $location.includes("choose");

    function payload(fullName, address, cellNo, icon, init) {
        return { name: fullName, address, phone: cellNo, icon, default: init };
    }
    function add() {
        let default_icon = "fluent:location-16-regular";
        let data = payload(fullName, address, cellNo, default_icon, true);
        user.postHomeAddress(data);
        if (choose) return push("#/addresses/choose");
        addToStore();
        push("#/addresses/overview");
    }
    function edit() {
        let obj = $user.addresses[id];
        let data = payload(fullName, address, cellNo, obj.icon, obj.default);
        user.editHomeAddress(id, data);
        addToStore();
        push("#/addresses/overview");
    }
    function updateAddres(addr) {
        address = addr.detail;
    }
    function addToStore() {
        if (!$user.fullName && fullName) {
            user.commit("fullName", fullName);
            user.patch({ fullName });
        }
        if (!$user.cellNo && cellNo) {
            user.commit("cellNo", cellNo);
            user.patch({ cellNo });
        }
    }

    onMount(() => {
        if (type) address = $user.addresses[id].address;
        fullName = $user.addresses[id]?.fullName || $user.fullName;
        cellNo = $user.addresses[id]?.cellNo || $user.cellNo;
    });
</script>

<div class="col grow gap-20">
    <div class="row space-between px-20">
        <h1 class="row font-36 weight-300 align-center gap-20">
            <Icon icon="fluent:location-16-regular" width="30" />
            <span>{type ? "Edit" : "Add"} Address</span>
        </h1>
        <button on:click={pop} class="row center gap-10">
            <Icon icon="fluent:chevron-left-16-regular" />
            <span>Back</span>
        </button>
    </div>
    <div class="col pa-20 shade3 curve gap-10">
        <div class="row space-between gap-20">
            <div class="w-500 w100 grow gap-10 col">
                <span class="font-12 weight-300 opacity-75">Full Name</span>
                <Field label="Type an address" bind:ref={el} bind:value={fullName} />
            </div>
            {#if $mq.sm_}
                <Button
                    primary
                    text="{type ? 'Save' : 'Add'} Address"
                    on:click={() => (type ? edit() : add())}
                />
            {/if}
        </div>
        <div class="row gap-20">
            <div class="w-500 w100 grow gap-10 col">
                <span class="font-12 weight-300 opacity-75">Cell No</span>
                <Field label="Type an address" bind:ref={el} bind:value={cellNo} />
            </div>
            <div class="w-500 w100 grow gap-10 col">
                <span class="font-12 weight-300 opacity-75">Delivery Address</span>
                <Field label="Type an address" bind:ref={el} bind:value={address} />
            </div>
        </div>
    </div>
    <div class="row grow">
        <Map {address} textfield={el} on:updateAddres={updateAddres} />
    </div>
</div>
{#if !$mq.sm_}
    <div class="fixed w100">
        <Button
            block="true"
            text="{type ? 'Save' : 'Add'} Address"
            on:click={() => (type ? edit() : add())}
        />
    </div>
{/if}

<style>
    .fixed {
        bottom: 55px;
    }
</style>
