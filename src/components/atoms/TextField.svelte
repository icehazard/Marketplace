<script>
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let label = "";
    export let value = "";
    export let name = ''

    let handleChange = (val) => {
        dispatch("keyup",  val);
    };
</script>

<div class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100">
    <!-- <Icon icon="mdi-light:magnify" class="font-22" /> -->
    <input on:keyup={handleChange} name={name} bind:value type="text" class="w100 shade2" placeholder={label} />
</div>
