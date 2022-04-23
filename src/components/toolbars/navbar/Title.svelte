<script>
    import logo from "@/assets/images/logo.svg";
    import { mq } from "@/assets/library/MediaQuery.svelte";
    import { fade } from "svelte/transition";
</script>

<a href="#/" class="h100 row align-center gap-10">
    <img src={logo} alt="logo" class="h100 w-50 slow" />
    {#if $mq.xl_}
        <div transition:fade={{ duration: 100 }}>
            <span href="#/" class="font-22 shade5--text nowrap">
                Meta Road
            </span>
        </div>
    {/if}
</a>

<style>
    @media only screen and (max-width: 576px) {
        img {
            padding: 0;
            width: 44px;
        }
    }
</style>
