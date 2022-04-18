<script>
    import Navbar from "comp/toolbars/navbar/Navbar.svelte";
    import store from '@/store/store'

</script>

<section>
    <Navbar />
    Home
    {$store}
</section>
b