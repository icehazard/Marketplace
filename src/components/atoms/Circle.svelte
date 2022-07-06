<script>
    import Icon from "@iconify/svelte";
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();

    export let to = "";
    export let icon = "";
    export let tooltip = "";

    let el;

    $: goTo = to ? true : false;

    function click() {
        dispatch("click");
    }

    onMount(() => {
        if (tooltip) el.dataset.tooltip = tooltip;
    });
</script>

<a
    bind:this={el}
    on:click={click}
    href="#/{to}"
    onclick="return {goTo};"
    class="font-22 border round center pa-10 shade2 fast btn"
>
    <Icon {icon} class="shade6--text" />
</a>

<style>
    a:hover {
        background-color: var(--primary);
    }

    a:focus-visible {
        outline: solid 1px var(--primary);
        background-color: #222222;
    }
</style>
