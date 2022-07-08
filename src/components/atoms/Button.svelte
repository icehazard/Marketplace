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
    class="curve center shine shade4-40 py-10 px-40"
    class:disable
    disabled={disable}
    {type}
    on:click={connect}>{text}</button
>

<style>
    button {
        min-width: 120px;
    }

    button:focus-visible {
        background-color: rgba(117, 117, 117, 0.5);
    }

    .disable {
        cursor: not-allowed;
    }
</style>
