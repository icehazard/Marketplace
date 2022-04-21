<script>
    import Icon from "@iconify/svelte";
</script>

<div class="row gap-10 align-center">
    <a href="#/about" class="font-22 border round center pa-10 shade2 fast">
        <Icon icon="ant-design:message-outlined" class="white--text" />
    </a>
    <a href="#/about" class="font-22 border round center pa-10 shade2 fast">
        <Icon icon="clarity:settings-line" class="white--text" />
    </a>
<a href="#/about" class="font-22 border round center pa-10 shade2 fast">
        <Icon icon="akar-icons:cart" class="white--text" />
    </a>
</div>

<style>
    a:hover{
        background-color: #DF0051;
    }

    a:focus-visible{
        outline: solid 1px  #DF0051;
        background-color: #222222;
    }
</style>


