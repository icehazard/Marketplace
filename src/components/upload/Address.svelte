<script>
    import Field from "comp/atoms/TextField.svelte";
    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";
    import { shopName, shopValid, active, number, street , address2, district, county, zip } from "@/store/store.js";

    $: $number, ($shopValid[2] = validate());
    $: $street, ($shopValid[2] = validate());
    $: $address2, ($shopValid[2] = validate());
    $: $district, ($shopValid[2] = validate());
    $: $county, ($shopValid[2] = validate());  
    $: $zip, ($shopValid[2] = validate());

    function validate() {
        if ($number.length == 0) return true;
        if ($street.length == 0) return true;
        if ($district.length == 0) return true;
        if ($county.length == 0) return true;
        if ($zip.length == 0) return true;
        return false;
    }
    function next() {
        $active++;
    }
</script>

<form class="center col shade3 curve py-50 px-10 pb-100">
    <div class="center col w-sm gap-40">
        <h1 class="font-36 weight-300">Address</h1>
        <p class="text-center">
            Provide the location, so cusomters can find your store. Don't forget to add opening times after you have created the shop. 
        </p>
        <div class=" row grow gap-10 w100">
            <div class="col grow gap-10">
                <label for="name" class="pl-4 weight-300">Number</label>
                <Field bind:value={$number} label="Number" />
            </div>
            <div class="col grow grow-2 gap-10">
                <label for="name" class="pl-4 weight-300">Street Name</label>
                <Field bind:value={$street} label="Street Name" />
            </div>
        </div>
        <div class="row grow gap-10 w100">
            <div class="col w100 grow gap-10">
                <label for="name" class="pl-4 weight-300">Address 2</label>
                <Field bind:value={$address2} label="Address 2 - Apartment, Suit ect" />
            </div>
            <div class="col w100  grow gap-10 ">
                <label for="name" class="pl-4 weight-300">Sub-District</label>
                <Field bind:value={$district} label="Sub-District" />
            </div>
        </div>
        <div class="row grow gap-10 w100">
            <div class="col w100 grow-2 gap-10">
                <label for="name" class="pl-4 weight-300">Province / State </label>
                <Field bind:value={$county} label="Province  / State" />
            </div>
            <div class="col w100  grow gap-10 ">
                <label for="name" class="pl-4 weight-300">Postal code</label>
                <Field bind:value={$zip} label="Postal code" />
            </div>
        </div>
    </div>
    <div class="pt-50  row w-sm  w100  z-2">
        <div class=" center w100">
            <Button on:click={next} type="button" disable={$shopValid[2]} text="CONTINUE" />
        </div>
    </div>
</form>
