<script>
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let label = "";
    export let value = "";
    export let name = "";
    export let disable = false;

    let handleChange = (val) => {
        dispatch("keyup", val);
    };
</script>

<input
    on:keyup={handleChange}
    {name}
    bind:value
    type="text"
    class:disable
    disabled={disable}
    class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100 slow"
    placeholder={label}
/>

<style>
    input {
        outline: 1px solid rgba(255, 255, 255, 0);
    }

    input:focus-visible {
        outline: 1px solid rgba(255, 255, 255, 0.6);
    }

    .disable {
        cursor: not-allowed;
    }
</style>
