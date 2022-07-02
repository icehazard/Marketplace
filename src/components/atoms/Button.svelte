<script>
    // import Web3 from 'web3'
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let text = "";
    export let disable = false;

    let connect = () => {
        dispatch("click");
    };
</script>

<div class="wrapper" class:disable>
    <button class="w100 center" disabled={disable} type="submit" on:click={connect}>{text}</button>
</div>

<style>
    button {
        align-items: center;
        background: rgb(28, 35, 44);
        border-radius: 8px;
        display: flex;
    
        letter-spacing: 1px;
        outline: none;
        padding: 15px 20px;
        transition: all 150ms ease 0s;
        font-weight: 700;
    }

    .wrapper {
        
        border: none;
        padding: 1px;
            border-radius: 8px;
        display: flex;
        background: #df0051;
        background: #5dc24f;
    }

    .disable {
        background: #6e6e6e;
    }
</style>
