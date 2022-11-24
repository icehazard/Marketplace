<script>
    import logo from "@/assets/images/logo.svg";
    import { mq } from "@/assets/js/MediaQuery.svelte";
    import { fade } from "svelte/transition";
    import { APP_NAME } from "@/config";
</script>

<a href="/" class="h100 row align-center gap-10 noActive">
    <img src={logo} alt="logo" class="h100 w-50 slow" />
    {#if $mq.xl_}
        <div transition:fade={{ duration: 100 }}>
            <span href="/" class="font-22 shade5--text nowrap">{APP_NAME} </span>
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
