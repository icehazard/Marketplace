<script>
    import Icon from "@iconify/svelte";
    import Button from "../atoms/Button.svelte";
    import { push } from "svelte-spa-router";
    import user from "@/store/user";

    function addNew() {
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
        //push(`#/cart`);
    }
</script>

<section class="grow col gap-20">
    <div class="row space-between">
        <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
            <Icon icon="fluent:location-16-regular" width="30" />
            <span>Address</span>
        </h1>
        <Button text="Add New Address" on:click={addNew} />
    </div>
    <div class="grow col shade3 curve">
        {#if $user.addresses.length == 0}
            <div class="row center pa-20 weight-300">
                <a href="#/addresses/add">No address saved. Click to add an address</a>
            </div>
        {/if}
        {#each $user.addresses as item, idx}
            <label class="row pl-20 cursor-pointer">
                <input type="radio" checked={item.default} name="radio" />
                <div
                    class="row w100 pa-20 space-between  shade3"
                    on:click={() => selectDefault(idx, item)}
                >
                    <div class="row center gap-20">
                        <Icon icon={item.icon} width="30" />
                        <div class="col gap-10">
                            <span>{item.name}</span>
                            <span class="font-14 opacity-75">{item.address}</span>
                        </div>
                    </div>
                    <div class="row gap-30 center">
                        <button class="row gap-30" on:click={() => edit(idx)}>
                            <Icon icon="fluent:edit-16-regular" width="25" />
                        </button>
                        <button class="row gap-30" on:click={() => del(idx, item)}>
                            <Icon icon="fluent:delete-16-regular" width="25" />
                        </button>
                    </div>
                </div>
            </label>
            <hr />
        {/each}
    </div>
</section>
