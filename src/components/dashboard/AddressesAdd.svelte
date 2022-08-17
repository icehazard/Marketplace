<script>
    import Field from "comp/atoms/TextField.svelte";
    import Map from "comp/atoms/Map";
    import Button from "comp/atoms/Button.svelte";
    import Icon from "@iconify/svelte";
    import { push, location, pop } from "svelte-spa-router";
    import user from "@/store/user";
    import { onMount } from "svelte";

    let address = "";
    let id = $location.split("/")[3];
    $: type = $location.includes("edit");
    

    function add() {
        //let isZero = $user.addresses.length === 0 ? true : false;
        let data = {
            name: "Address",
            address,
            icon: "fluent:location-16-regular",
            default : true
        };
        user.postHomeAddress(data);
        push("#/addresses/overview");
    }

    function edit() {
        let data = {
            name: $user.addresses[id].name,
            address,
            icon: $user.addresses[id].icon,
            default : $user.addresses[id].default
        };
        user.editHomeAddress(id, data);
        push("#/addresses/overview");
    }

    onMount(() => {
        if (type) address = $user.addresses[id].address;
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
    <div class="row pa-20 gap-20 shade3 curve space-between">
        <Field label="Type an address" bind:value={address} />
        <Button text="{type ? 'Save' : 'Add'} Address" on:click={() => type ? edit() : add()} />
    </div>
    <div class="row grow">
        <Map {address} />
    </div>
</div>
