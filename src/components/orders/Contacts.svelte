<script>
    import Icon from "@iconify/svelte";
    import Contact from "./Contact";
</script>

<section class="w-500  h100 col ">
    <div class="px-20" />
    <div class="row px-20 py-15">
        <div class="border gap-10 w100 curve align-center px-20 h-40 shade2">
            <Icon icon="mdi-light:magnify" class="font-22" />
            <input type="text" class="w100 shade2" placeholder="Search Orders" />
        </div>
    </div>
    <div class="gap-20 col pa-20">
        {#each Array(6) as _, i}
            <Contact  />
        {/each}
    </div>
</section>

<style>
    section {
        height: calc(100vh - 200px);
        overflow: overlay;
    }
</style>
