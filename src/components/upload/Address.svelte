<script>
    import Button from "comp/atoms/Button.svelte";
    import { onMount } from "svelte";
    import { shopValid, active } from "@/store/store.js";
    import { Loader } from "google-maps";

    export let address = ""
    export let _lat = ""
    export let _lng = ""

    $: address, ($shopValid[2] = validate());

    function validate() {
        if (address.length == 0) return true;
        return false;
    }
    function next() {
        $active++;
    }

    let canContinue = false;

    onMount(async () => {
        const loader = new Loader("AIzaSyAmlMcGgumMqP6T8YLFnsQT_tbL4j5wF0s", {
            libraries: ["places"],
        });

        const google = await loader.load();

        const geocoder = new google.maps.Geocoder();
        const infowindow = new google.maps.InfoWindow();

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
            console.log("Clicked", event.latLng.lat(), event.latLng.lng());
            console.log(event);
            marker.setPosition(event.latLng);
            let geo = geocodeLatLng(
                geocoder,
                map,
                infowindow,
                event.latLng.lat(),
                event.latLng.lng()
            );
        });

        marker.addListener("dragend", function (event) {
            //marker.setPosition(event.latLng)
            console.log(event.latLng);
            let geo = geocodeLatLng(
                geocoder,
                map,
                infowindow,
                event.latLng.lat(),
                event.latLng.lng()
            );
        });

        let input = document.getElementById("address");

        let ac = new google.maps.places.Autocomplete(input, {
            componentRestrictions: { country: "th" },
        });

        // when user clicks suggestion from search dropdown
        ac.addListener("place_changed", (event) => {
            //console.log(ac.getPlace())
            let p = ac.getPlace();
            map.setCenter({ lat: p.geometry.location.lat(), lng: p.geometry.location.lng() });
            map.setZoom(18);
            marker.setPosition({ lat: p.geometry.location.lat(), lng: p.geometry.location.lng() });
            canContinue = true;

            let geo = geocodeLatLng(
                geocoder,
                map,
                infowindow,
                p.geometry.location.lat(),
                p.geometry.location.lng()
            );
        });

        function geocodeLatLng(geocoder, map, infowindow, lat, lng) {
            console.log("GEOCODING", lat, lng);
            const latlng = {
                lat: lat,
                lng: lng,
            };

            geocoder
                .geocode({ location: latlng })
                .then((response) => {
                    if (response.results[0]) {
                        //map.setZoom(25);

                        marker.setPosition(latlng)
                        _lat = lat
                        _lng = lng
                        console.log("Latlng IZ", lat, lng)
                        console.log(response.results[0])
                        let c = response.results[0].address_components
                        let finalAddress = `${c[0].long_name}, ${c[1].long_name}, ${c[2].long_name}`
                        infowindow.setContent(finalAddress)
                        infowindow.open(map, marker);
                        $address = finalAddress;
                    } else {
                        window.alert("No results found");
                    }
                })
                .catch((e) => console.log("Geocoder failed due to: " + e));
        }
    })
</script>

<form class="center col shade3 curve py-50 px-10 pb-100" autocomplete="false">
    <div class="center col w-sm gap-40">
        <h1 class="font-36 weight-300">Address</h1>
        <p class="text-center">
            Please provide the shop location so customers can find your store. Enter your address
            then drag the marker to the shop's exact location on the map.
        </p>
        <div class=" row grow gap-10 w100">
            <div class="col grow grow-2 gap-10">
                <label for="address" class="pl-4 weight-300">Address</label>
                <input
                    class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100"
                    id="address"
                    bind:value={$address}
                    type="value"
                    role="presentation"
                    autocomplete="off"
                    placeholder="enter shop address here"
                />
            </div>
        </div>
    </div>
    <br />
    <div id="map" class="center row w90 h-400 gap-40" />
    <div class="shade4">Left click to place marker (or drag it). Ctrl+scroll to zoom in/out</div>
    <div class="pt-50  row w-sm  w100  z-2">
        <div class=" center w100">
            <div class="w60">
                <Button on:click={next} type="button" disable={!canContinue} text="CONTINUE" />
            </div>
        </div>
    </div>
</form>
