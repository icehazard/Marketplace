<script>
    import Icon from "@iconify/svelte";
    import Contact from "./Contact";
    import user from "@/store/user";
    import { mq } from "@/assets/js/MediaQuery.svelte";
</script>

<section class="w100 h100 shade3 col curved" class:desktop={$mq.lg_}>
    <!-- <div class="px-20" /> -->
    <div class="row px-20 pt-15">
        <div class="border gap-10 w100 curve align-center px-20 h-40 shade2">
            <Icon icon="mdi-light:magnify" class="font-22" />
            <input type="text" class="w100 shade2" placeholder="Search Orders" />
        </div>
    </div>
    <div class="gap-20 col " class:pa-20={$mq.sm_}>
        <hr>
        {#each $user.orders as order}
            <Contact {order} />
            <hr>
        {/each}
    </div>
</section>

<style>
    .desktop {
        height: calc(100vh - 200px);
        overflow: overlay;
        max-width: 500px;
    }
</style>
