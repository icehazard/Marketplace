<script>
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let to = "";
    export let icon = "";
    export let tooltip = "";

    $: goTo = to ? true : false;

    function click() {
        dispatch("click");
    }
</script>

<a
    on:click={click}
    href="#/{to}"
    onclick="return {goTo};"
    data-tooltip={tooltip}
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
