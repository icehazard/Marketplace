<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let label = "";
    export let value = "";
    export let name = "";
    export let disable = false;

    let handleChange = (val) => {
        dispatch("keyup", val);
    };
</script>

<textarea
    on:keyup={handleChange}
    {name}
    bind:value
    disabled={disable}
    type="text"
    class="borderStrong gap-10 curve align-center pa-20 mobile-w100 shade2 w100"
    placeholder={label}
/>
