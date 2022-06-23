<script>
    // import Web3 from 'web3'
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let text = "";
    let connect = () => {
        dispatch("click")
    };
</script>

<div class="wrapper ">
    <button class="w100 center" type="submit" on:click={connect}>{text}</button>
</div>

<style>
    button {
        align-items: center;
        background: rgb(28, 35, 44);
        border-radius: 16px;
        display: flex;
        height: 40px;
        letter-spacing: 1px;
        outline: none;
        padding: 0px 20px;
        transition: all 150ms ease 0s;
        font-weight: 700;
    }

    .wrapper {
        height: 42px;
        border: none;
        padding: 1px;
        border-radius: 16px;
        display: flex;  
        background: #df0051;
        background: #5dc24f;
        
    }
</style>
