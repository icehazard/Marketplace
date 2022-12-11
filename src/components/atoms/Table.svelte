<script>
	export let items = [];
	export let headings = [];
</script>

<table>
	<thead>
		{#each headings as heading}
			<th> {heading.title} </th>
		{/each}
	</thead>
	<tbody>
		{#each items as item}
			<tr> <slot {item} /> </tr>
		{:else}
			<tr> No results found </tr>
		{/each}
	</tbody>
</table>

<style>
	table{
		width: 100%;
	}

	thead{
		display: flex;
	}

	tr{
		display: flex;
	}
	
	tr :global(td), th {
		padding: 7px;
		background-color: red;
		flex-grow: 1;
		flex-basis: 0;
		text-align: center;
	}
</style>

<!-- <Table {items} {headings} let:item>
	<td>{item?.name}</td>
	<td>{item?.age}</td>
	<td>{item?.gender}</td>
</Table>

let headings = [{ title: "name" }, { title: "age" }, { title: "gender" }];

let items = [
	{ name: "sebastian", age: 30, gender: "male" },
	{ name: "jana", age: 69, gender: "female" },
	{ name: "alexander", age: 34, gender: "male" },
];

 -->