<script>
	import { onMount } from 'svelte';
    import TodoListJSON from "/build/contracts/Counter.json";
    import Web3 from "web3";

    let tasks = [];
    let input;
    let addressAccount;
    let contract;

    const loadWeb3 = async () => {
        window.web3 = new Web3(ethereum);
        return await ethereum.request({ method: 'eth_requestAccounts' });
    };

    const loadAccount = async () => {
         addressAccount = await web3.eth.getCoinbase(); 
    };

    const loadContract = async () => {
        const networkId = await web3.eth.net.getId()
        const networkData = TodoListJSON.networks[networkId]
        contract = new web3.eth.Contract(TodoListJSON.abi, networkData.address)
    };

    const loadTasks = async () => {
        tasks = await contract.methods.getCount().call();
    };

    const handleAddTask = async () => {
        await contract.methods.increment().send({ from: addressAccount });
        await loadTasks();

    };
    onMount(async () => {
        await loadWeb3();
        await loadAccount();
        await loadContract();
        await loadTasks();
    })
</script>

<div>
    {tasks}
    <button on:click={handleAddTask}>click</button>


</div>