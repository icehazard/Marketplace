<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let text = "";
    export let disable = false;
    export let type = "button";

    let connect = () => {
        dispatch("click");
    };
</script>

<button
    class="curve center shine borderStrong shade2 py-10 px-40"
    class:disable
    disabled={disable}
    {type}
    on:click={connect}>{text}</button
>

<style>
    button:focus-visible {
        outline: 1px solid rgba(255, 255, 255, 0.6);
    }

    .disable {
        cursor: not-allowed;
    }
</style>
