
    <script>
        import Icon from "@iconify/svelte";
        import Item from './Item.svelte'
    </script>
    
    <div class="shade1 pa-50 curve col gap-20">
        <div class="opacity-75 row align-center gap-10">
            <Icon icon="ant-design:shop-filled" />
            <div>More from Seller</div>
        </div>
        <div class="row gap-10 ">
            <Item />
            <Item />
            <Item />
        </div>
    </div>
    