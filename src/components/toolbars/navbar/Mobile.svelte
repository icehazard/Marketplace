<script>
    import { mq } from "@/assets/library/MediaQuery.svelte";
    import Icon from "@iconify/svelte";
</script>

{#if $mq._md}
    <div class="pt-50">
        <nav class="h-50 shade1 w100 fixed p-bottom col">
            <hr />
            <div class="row h100">
                <a href="#/messages" class="font-26 grow center ">
                    <Icon icon="ant-design:message-outlined" class="shade5--text" />
                </a>
                <a href="#/cart" class="font-26 grow center ">
                    <Icon icon="akar-icons:cart" class="shade5--text" />
                </a>
                <a href="#/account" class="font-26 grow center ">
                    <Icon icon="gg:profile" class="shade5--text" />
                </a>
                <a href="#/settings" class="font-26 grow center ">
                    <Icon icon="clarity:settings-line" class="shade5--text" />
                </a>
            </div>
        </nav>
    </div>
{/if}

<style>
    	nav {
		backdrop-filter: blur(20px);
		background-color: rgba(19, 18, 18, 0.53);
        z-index: 4;
	
	}
</style>
