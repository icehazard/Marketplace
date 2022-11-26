<script>
    import { mq } from "@/assets/js/MediaQuery.svelte";
    import Icon from "@iconify/svelte";

    let routes = [
        { route: "/orders/active", icon: "fluent:text-bullet-list-square-clock-20-regular" },
        { route: "/cart", icon: "akar-icons:cart" },
        { route: "/shops/id/1", icon: "fluent:building-shop-16-regular" },
        { route: "/account", icon: "gg:profile" },
    ];
</script>

{#if $mq._md}
    <nav class="h-50 shade1 w100 fixed p-bottom col">
        <hr />
        <div class="row h100">
            {#each routes as item}
                <a href={item.route} class="font-26 grow center ">
                    <Icon icon={item.icon} class="shade5--text" />
                </a>
            {/each}
        </div>
    </nav>
{/if}

<style>
    nav {
        backdrop-filter: blur(20px);
        background-color: rgba(19, 18, 18, 0.53);
        z-index: 4;
    }
</style>
