<script>
    import { createEventDispatcher } from "svelte";
    import { Shadow } from "svelte-loading-spinners";
    const dispatch = createEventDispatcher();

    export let text = "";
    export let block = false;
    export let type = "button";
    export let disable = false;
    export let pending = false;
    export let primary = false;

    let connect = () => {
        dispatch("click");
    };
</script>

<button
    class="curve center shine borderStrong  py-10 px-40 text-center nowrap"
    class:primary
    class:disable
    disabled={disable}
    class:hack={block}
    {type}
    on:click={connect}
>
    <span class:opacity-0={pending}>{text}</span>
    {#if pending}
        <div class="absolute">
            <Shadow size="16" color="white" unit="px" duration="1s" />
        </div>
    {/if}
</button>

<style>
    button {
        outline: 1px solid rgba(255, 255, 255, 0);
    }
    button:focus-visible {
        outline: 1px solid rgba(255, 255, 255, 0.6);
    }

    .disable {
        cursor: not-allowed;
    }

    .hack {
        width: calc(100% - 20px);
    }

    .primary:hover {
        background-color: var(--primary);
        filter: brightness(1.15);
    }
</style>
