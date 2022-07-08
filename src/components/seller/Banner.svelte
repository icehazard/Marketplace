<script>
    import Icon from "@iconify/svelte";
    import shops from "@/store/shops.js";
</script>

<div class="row gap-20 shade1 pa-20 curved center">
    <div class="w-140 h-140 shade3 parent relative">
        <img src={$shops.displayPic} alt="" class="curve cover h100 w100" />
        <a href="#/store/settings" class="absolute p-top p-right pa-20 shine curve child">
            <Icon icon="fluent:image-edit-16-regular" width="20" />
        </a>
    </div>
    <div class="col space-between grow font-14 gap-5">
        <h1 class="font-26 row gap-20 align-center parent">
            {$shops.name}
            <a href="#/store/settings" class="child slow">
                <Icon icon="fluent:edit-20-regular" width="20" />
            </a>
        </h1>
        <div class="row gap-20 align-center parent">
            {$shops.desc}
            <a href="#/store/settings" class="child slow">
                <Icon icon="fluent:edit-20-regular" width="20" />
            </a>
        </div>
        <div class="weight-300 opacity-75 align-center gap-20 parent">{$shops.loc}
         <a href="#/store/settings" class="child slow">
                <Icon icon="fluent:edit-20-regular" width="20" />
            </a></div>
        <span>163 Sales 5 out of 5 stars</span>
        <div class="row align-center gap-10 blue--text">
            <Icon icon="fluent:info-20-regular" width="25" />
            <span class="opacity-75">
                You may leave reviews only after you have brought from this supplier
            </span>
        </div>
    </div>
    <div class="col center gap-10">
        <div class="w-70 h-70 shade3 round overflow-hidden">
            <img src={$shops.displayPic} alt="" class="round cover h100 w100" />
        </div>
        <a href="#/messages" class="weight-600 opacity-75">Contact</a>
    </div>
</div>

<style>
    .child {
        opacity: 0;
    }
    .parent:hover .child {
        opacity: 1;
    }
</style>
