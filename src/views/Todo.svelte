<script>
	import { onMount } from 'svelte';
    // import TodoListJSON from "/build/contracts/TodoList.json";
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
        const tasksCount = await contract.methods.tasksCount(addressAccount).call();
        const tasksTemp = [];
        for (var i = 0; i < tasksCount; i++) {
            const task = await contract.methods.tasks(addressAccount, i).call();
            tasksTemp.push(task);
        }
        tasks = tasksTemp;
    };

    const handleAddTask = async () => {
        await contract.methods.createTask(input).send({ from: addressAccount });
        await loadTasks();
        input = "";
    };
    const handleToggled = async (id) => {
        await contract.methods.toggleCompleted(id).send({ from: addressAccount })
        await loadTasks();
    };

    onMount(async () => {
        await loadWeb3();
        await loadAccount();
        await loadContract();
        await loadTasks();
    })
</script>

<section class="container center pt-50 col gap-20 grow">
    <div class="row gap-20">
        <input
            type="text"
            bind:value={input}
            class="shade1 pa-10 w-400 curve"
        />
        <button class="shade4 pa-10 curve w-100" on:click={handleAddTask}>Add</button>
    </div>
    <h1>To do list</h1>
    {#each tasks as task}
        <div class="row gap-20 align-center">
            <input
                type="text"
                disabled
                value={task.content}
                class="shade1 pa-10 w-400 curve"
            />
            <button
                class:red={!task.completed}
                class:green={task.completed}
                class="pa-10 curve w-100"
                on:click={handleToggled(task.id)}
                >{task.completed ? 'Yes' : 'No'}
            </button>
        </div>
    {/each}
</section>
