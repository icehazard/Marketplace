<script>
    import Icon from "@iconify/svelte";
    import Contact from "./Contact";
    import user from "@/store/user";
    import { mq } from "@/assets/js/MediaQuery.svelte";
    import { searchList } from "@/assets/js/util";

    let search = "";
</script>

<section class="w100 h100 shade3 col curved" class:desktop={$mq.lg_}>
    <div class="row px-20 pt-15">
        <div class="border gap-10 w100 curve align-center px-20 h-40 shade2">
            <Icon icon="mdi-light:magnify" class="font-22" />
            <input
                bind:value={search}
                type="text"
                class="w100 shade2"
                placeholder="Search Orders"
            />
        </div>
    </div>
    <div class="col " class:pa-20={$mq.sm_}>
        <hr />
        {#each searchList($user.orders, search) as order}
            <Contact {order} />
            <hr />
        {:else}
            <div class="row center pa-20 weight-300 letter-space-1">No results found</div>
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
