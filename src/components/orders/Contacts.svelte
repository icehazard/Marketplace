<script>
    import Icon from "@iconify/svelte";
    import Contact from './Contact'
</script>

<section class="w-400  h100 col ">
    <div class="px-20"></div>
    <div class="row px-20 py-15">
        <div class="border gap-10 w100 curve align-center px-20 h-40 shade2">
            <Icon icon="mdi-light:magnify" class="font-22" />
            <input type="text" class="w100 shade2" placeholder="Search messages" />
        </div>
    </div>
    <div class="row pa-20">Orders</div>
    <Contact />
    <Contact />
    <Contact />
    <Contact />
</section>

<style>
    section{
        height: calc(100vh - 60px);

    }
</style>



