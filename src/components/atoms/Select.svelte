<script>
    import Icon from "@iconify/svelte";
    import { clickOutside } from "@/assets/library/CommonFunctions.js";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let items = [];
    export let init = "";

    let filteredItems = items;
    let searchInput = "";
    let showSearch = false;

    function search(key) {
        let filter = searchInput;
        if (!filter || !filter.length) closePicker();
        filteredItems = filter && filter.length ? items.filter(filterFunc) : items;
        showSearch = true;
        return filteredItems;
    }
    function filterFunc(item) {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
    }
    function select(item) {
        closePicker();
        dispatch("select", item);
        searchInput = item.name;
    }
    function openPicker() {
        showSearch = !showSearch;
    }
    function closePicker() {
        showSearch = false;
    }
    function handleWindowKeyDown(event) {
        if (event.key === "Escape") closePicker();
    }
    function initValue() {
        let item = items.filter((el) => el.id == init);
        if (item.length == 0) return;
        searchInput = item[0].name;
    }

    initValue();
</script>

<div
    class="relative"
    use:clickOutside={closePicker}
    on:click={openPicker}
    on:keyup={handleWindowKeyDown}
>
    <div class="">
        <input
            bind:value={searchInput}
            on:keydown={search}
            autocomplete="off"
            name="name"
            type="text"
            class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100 slow"
            placeholder="Select a option"
        />
        <div class="center cursor-pointer absolute icon p-right pr-10">
            <Icon icon="fluent:chevron-up-down-20-regular" />
        </div>
    </div>
    {#if showSearch}
        <div class="menu w30 shade2 curve overlay absolute w100 z-3">
            {#each filteredItems as b}
                <button
                    class="row align-center px-20 py-15 bank-search-box curve w100 slow"
                    on:click={select(b)}
                    onWindowKeyDown={handleWindowKeyDown}
                >
                    <!-- <img
                        src={b.image}
                        style="width: 30px; height:30px; background-color: {b.color}; border-radius: 5px"
                        alt=""
                    /> -->
                    <div class="center">{b.name}</div>
                </button>
            {/each}
            {#if filteredItems.length == 0}
                <span class="center pa-20">No results</span>
            {/if}
        </div>
    {/if}
</div>

<style>
    input{
        outline: 1px solid rgba(255, 255, 255, 0);
    }
    input:focus-visible {
        outline: 1px solid rgba(255, 255, 255, 0.6);
    }

    .bank-search-box:focus-visible {
        background-color: rgba(100, 100, 100, 0.5);
    }

    .bank-search-box:hover {
        background-color: rgba(100, 100, 100, 0.4);
    }

    .icon {
        top: 13px;
    }

    .menu{
        top: 50px;
    }
</style>
