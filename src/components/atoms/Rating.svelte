<script>
    import Icon from "@iconify/svelte";
    export let rating = 0;
    rating = Number(rating)
    if (0 > rating || 5 < rating) rating = 0;
    let filled = Math.floor(rating);
    let half = Math.ceil(rating % 1);
    let empty = 5 - half - filled;
</script>

<div class="row">
    {#each Array(filled) as _, i}
        <Icon icon="dashicons:star-filled" />
    {/each}
    {#each Array(half) as _, i}
        <Icon icon="dashicons:star-half" />
    {/each}
    {#each Array(empty) as _, i}
        <Icon icon="dashicons:star-empty" />
    {/each}
</div>
