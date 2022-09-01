<script>
    import Icon from "@iconify/svelte";
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();

    export let to = "";
    export let icon = "";
    export let tooltip = "";
    export let badge = 0;
    export let clearClick = false

    let el;

    $: goTo = to ? true : false;

    function click() {
        if (clearClick) badge = 0;
        dispatch("click");
    }

    onMount(() => {
        if (tooltip) el.dataset.tooltip = tooltip;
    });
</script>

<div class="relative">
   {#if badge > 0}
   <div class="accent pa-3 absolute z-3 round p-right font-12 nopointer center text--center">
    {badge}
</div>
   {/if}
    <a
        bind:this={el}
        on:click={click}
        href="#/{to}"
        onclick="return {goTo};"
        class="font-22 border round center pa-10 shade2 fast btn"
    >
        <Icon {icon} class="shade6--text" />
    </a>
</div>

<style>
    a:hover {
        background-color: var(--primary);
    }

    a:focus-visible {
        outline: solid 1px var(--primary);
        background-color: #222222;
    }

    .absolute {
        height: 20px;
        width: 20px;
    }
</style>
