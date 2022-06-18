<script>
    import Icon from "@iconify/svelte";
    export let label = '';
    export let value = '';
</script>

<div class="border gap-10 curve align-center px-20 h-40 mobile-w100 shade2 ">
    <!-- <Icon icon="mdi-light:magnify" class="font-22" /> -->
    <input  bind:value={value} type="text" class="w100 shade2" placeholder={label} />
</div>
