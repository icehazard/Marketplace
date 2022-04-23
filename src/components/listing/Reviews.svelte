<script>
    import Icon from "@iconify/svelte";
    import Rating from 'comp/atoms/Rating.svelte'
</script>

<div class="shade1 pa-50 curve col gap-20">
    <div class="opacity-75 row align-center gap-10">
        <Icon icon="ic:baseline-reviews" />
        <div>Reviews</div>
    </div>
    <Rating rating={5}/>
</div>
