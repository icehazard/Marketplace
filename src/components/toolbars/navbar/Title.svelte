<script>
    import logo from "@/assets/images/budable3.png";
    import leaf from "@/assets/images/leaf.png";
    import { mq } from "@/assets/js/MediaQuery.svelte";

    $: img = $mq.xl_ ? logo : leaf;
</script>

<a href="/" class="h100 row align-center gap-10 noActive">
    <img src={img} alt="logo" class="h100 w100 pa-10 slow" />
</a>
