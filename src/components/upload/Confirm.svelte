<script>
	import { push } from 'svelte-spa-router';
    import Button from "comp/atoms/Button.svelte";
    import { shopValid, active, reset } from "@/store/store.js";
    import "@lottiefiles/lottie-player";

    function next() {
        push('#/')
        reset()
    }

</script>

<form class="center col shade3 curve py-50 px-10 pb-100">
    <div id="svgContainer" />
    <div class="center  w-sm gap-40">
        <h1 class="font-36 weight-300">Confirmation</h1>
        <p class="text-center">
            For compliance purposes, we may verify your identity with a secure third–party service.
            This information will never be displayed publicly on metaroad. Learn more
        </p>
    </div>
    <div class="pt-50  row w-sm  w100  z-2">
        <div class=" center w100">
            <Button on:click={next} type="button" disable={$shopValid[1]} text="CONTINUE" />
        </div>
    </div>
</form>
