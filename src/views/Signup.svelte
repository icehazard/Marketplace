<script>
    import Signin from "comp/auth/Signin.svelte";
    let url =
        "https://images.unsplash.com/photo-1617101814812-3529cf87b5ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80";
</script>

<section class="row gap-50 grow w100">
    <img class="absolute" src={url} alt="" />
    <div class="container col">
        <Signin />
    </div>
</section>

<style>
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        height: calc(100vh - 60px);
        filter: brightness(0.3);
    }
</style>
