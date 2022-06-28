<script>
    import Field from "comp/atoms/TextField.svelte";
    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";
    import { onMount } from "svelte";
    import { shopValid, active } from "@/store/store.js";
    import { Loader } from "google-maps";

    let address = "";
    $: address, ($shopValid[2] = validate());

    function validate() {
        if (address.length == 0) return true;
        return false;
    }
    function next() {
        $active++;
    }

    onMount(async () => {
        const loader = new Loader("AIzaSyAmlMcGgumMqP6T8YLFnsQT_tbL4j5wF0s", {
            libraries: ["places"],
        });

        const google = await loader.load();
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        map.panTo({ lat: 13.7, lng: 100.5 });

        let marker = new google.maps.Marker({
            position: { lat: 13.7, lng: 100.5 },
            map,
            title: "Drag me to the exact position",
            draggable: true,
        });

        map.addListener("click", (event) => {
            console.log(event.latLng.lat());
            console.log(event.latLng.lng());
            console.log(event);
            marker.setPosition(event.latLng);
        });

        marker.addListener("dragend", function (event) {
            //marker.setPosition(event.latLng)
            console.log(event.latLng);
        });

        let input = document.getElementById("address");

        let ac = new google.maps.places.Autocomplete(input, {
            componentRestrictions: { country: "th" },
        });
        ac.addListener("place_changed", (event) => {
            //console.log(ac.getPlace())
            let p = ac.getPlace();
            map.setCenter({ lat: p.geometry.location.lat(), lng: p.geometry.location.lng() });
            map.setZoom(25);
            marker.setPosition({ lat: p.geometry.location.lat(), lng: p.geometry.location.lng() });
        });
    });
</script>

<form class="center col shade3 curve py-50 px-10 pb-100" autocomplete="false">
    <div class="center col w-sm gap-40">
        <h1 class="font-36 weight-300">Address</h1>
        <p class="text-center">
            Please provide the Shop Location, so customers can find your store.
        </p>
        <div class=" row grow gap-10 w100">
            <div class="col grow grow-2 gap-10">
                <label class="pl-4 weight-300" for="address">Address</label>
                <input
                    class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100"
                    id="address"
                    type="value"
                    role="presentation"
                    autocomplete="off"
                    placeholder="Enter shop address..."
                    bind:value={address}
                />
            </div>
        </div>
    </div>
    <br />
    <div id="map" class="center row w90 h-400 gap-40 curve" />
    <div class="pt-50  row w-sm  w100  z-2">
        <div class=" center w100">
            <Button on:click={next} type="button" disable={$shopValid[2]} text="CONTINUE" />
        </div>
    </div>
</form>
