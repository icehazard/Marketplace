<script>
    // import Web3 from 'web3'
    import { ethers } from "ethers";
    import { onMount } from "svelte";

    let button = "BUY NOW";

    async function connect() {
     
    }

    onMount(() => {
        connect();
    });
</script>

<div class="wrapper">
    <button on:click={connect}>{button}</button>
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
        background: linear-gradient(
            to right,
            rgb(132, 213, 209),
            rgb(91, 135, 225),
            rgb(128, 108, 224)
        );
    }
</style>
