<script>
    import logo from "@/assets/images/logo.svg";
    import Icon from "@iconify/svelte";
</script>

<button class="w-300 h-300 curve col">
    <section class="h-180 center w100">
        <img src={logo} alt="logo" class="h100 py-10" />
    </section>
    <section class="col pa-20  space-between h100 w100">
        <span>Vortex - 150mg</span>
        <div class="row center  gap-5">
            <div class="row">
                <Icon icon="dashicons:star-filled" />
                <Icon icon="dashicons:star-filled" />
                <Icon icon="dashicons:star-filled" />
                <Icon icon="dashicons:star-half" />
                <Icon icon="dashicons:star-empty" />
            </div>
            <span>(33)</span>
        </div>
        <div class="row space-between">
            <span>$150</span>
            <span>Mr. iceman</span>
        </div>
    </section>
</button>

<style>
    button {
        background-color: #1a1a1a;
        transition: all 150ms ease;
    }

    button:hover {
        transform: translateY(-5px);
    }
</style>
