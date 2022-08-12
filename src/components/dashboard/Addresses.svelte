<script>
    import Icon from "@iconify/svelte";
    import Button from "../atoms/Button.svelte";
</script>

<section class="grow col gap-20">
    <div class="row space-between">
        <h1 class="row pl-20 font-36 weight-300 align-center gap-20">
            <Icon icon="fluent:location-16-regular" width="30" />
            <span>Addresses</span>
        </h1>
        <Button text="Add New Address" />
    </div>
    <div class="grow col shade3 curve">
        <div class="row  w100 pa-20 space-between  shade3">
            <div class="row center gap-20">
                <Icon icon="fluent:location-16-regular" width="30" />
                <div class="col gap-10">
                    <span>34/79 Soi king Pattana 4</span>
                    <span class="font-14 opacity-75">Soi king Pattana 4 </span>
                </div>
            </div>
            <div class="col center">
                <button class="row gap-30">
                    <Icon icon="fluent:edit-16-regular" width="25" />
                    <Icon icon="fluent:delete-16-regular" width="25" />
                </button>
            </div>
        </div>
        <hr />
    </div>
</section>
