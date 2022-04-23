<script>
    import Icon from "@iconify/svelte";
    export let to;
    export let icon;
</script>

<a href="#/{to}" class="font-22 border round center pa-10 shade2 fast btn">
    <Icon {icon} class="white--text" />
</a>

<style>
    a:hover {
        background-color: #df0051;
    }

    a:focus-visible {
        outline: solid 1px #df0051;
        background-color: #222222;
    }
</style>
