<script>
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let label = "";
    export let type = "text";
    export let value = "";
    export let name = "";
    export let disable = false;

    let handleKeyup = (val) => {
        dispatch("keyup", val);
    };
    let handleBlur = (val) => {
        dispatch("blur", val);
    };
    let handleChange = (val) => {
        dispatch("change", val);
    };
    function typeAction(node) {
        node.type = type;
    }
</script>

<input
    on:keyup={handleKeyup}
    on:blur={handleBlur}
    on:change={handleChange}
    {name}
    bind:value
    use:typeAction 
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
