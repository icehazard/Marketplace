<script>
    import Login from "comp/auth/Login.svelte";
    let url = "https://cdn.pixabay.com/photo/2020/11/16/21/22/cannabis-5750513_960_720.jpg";
</script>

<section class="row gap-50 grow w100">
    <img class="absolute" src={url} alt="" />
    <div class="container col">
        <Login />
    </div>
</section>

<style>
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        height: calc(100vh - 60px);
        filter: brightness(0.4) ;
    }
</style>
