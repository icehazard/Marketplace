<script>
    // import Web3 from 'web3'
    import { ethers } from "ethers";
    import { onMount } from "svelte";

    let button = "Connect";

    async function connect() {
        let eth = window.ethereum;
        const provider = new ethers.providers.Web3Provider(eth, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let add = await signer.getAddress();
        button = add.substring(0, 2) + "..." + add.substring(add.length - 4);
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

    button:hover{
        background: rgb(40, 45, 51); 
    }

    .wrapper {
        height: 42px;
        border: none;
        padding: 1px;
        border-radius: 16px;
        display: flex;
        background-color:#ff99dd;
        background-image:
        radial-gradient(at 70% 90%, hsla(331,92%,75%,1) 0px, transparent 50%),
        radial-gradient(at 94% 65%, hsla(162,75%,64%,1) 0px, transparent 50%),
        radial-gradient(at 68% 40%, hsla(303,92%,70%,1) 0px, transparent 50%),
        radial-gradient(at 37% 95%, hsla(222,92%,63%,1) 0px, transparent 50%),
        radial-gradient(at 30% 90%, hsla(310,80%,61%,1) 0px, transparent 50%),
        radial-gradient(at 67% 89%, hsla(236,98%,60%,1) 0px, transparent 50%),
        radial-gradient(at 25% 21%, hsla(95,74%,78%,1) 0px, transparent 50%);
 
    }
</style>
