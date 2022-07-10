<script>
     import shops from "@/store/shops.js";
     import Icon from "@iconify/svelte";
</script>
<div class="h-400 shade1 curve relative parent">
    <img class="curve cover h100 w100" src={$shops.coverPic} alt="" />
    <a href="#/store/settings" class="absolute p-top p-right pa-20 shine curve child">
        <Icon icon="fluent:image-edit-16-regular" width="20" />
    </a>
</div>

<style>
    .child {
        opacity: 0;
    }
    .parent:hover .child {
        opacity: 1;
    }
</style>