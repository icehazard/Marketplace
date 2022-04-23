<script>
    import TodoListJSON from '../../build/contracts/TOdoList.json'
    import Web3 from 'web3'
    // var contract = require('@truffle/contract')


    export const load = async () => {
    await loadWeb3();
    const addressAccount = await loadAccount();
    console.log("🚀 ~ file: About.svelte ~ line 9 ~ load ~ addressAccount", addressAccount)

};

    const loadAccount = async () => {
    const addressAccount = await web3.eth.getCoinbase();
    return addressAccount;
};

    const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            //web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            console.log('nope')
        }
    }
};

load()

</script>

<section class="container center pt-50 col gap-20">
    <div class="row gap-20">
        <input type="text" class="shade1 pa-10 w-400 curve">
        <button class="shade3 pa-10 curve">Add</button>
    </div>
    <h1>To do list</h1>
    <div class="row gap-20">
        <input type="text" class="shade1 pa-10 w-400 curve">
        <button class="green pa-10 curve">DONE</button>
    </div>
    <div class="row gap-20">
        <input type="text" class="shade1 pa-10 w-400 curve">
        <button class="green pa-10 curve">DONE</button>
    </div>
</section>