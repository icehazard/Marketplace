<script>
    import Field from "comp/atoms/TextField.svelte";
    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";
    import { onMount } from "svelte";

    import {
        shopName,
        shopValid,
        active,
        number,
        street,
        address2,
        district,
        county,
        zip,
    } from "@/store/store.js";
    import {Loader, LoaderOptions} from 'google-maps';

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

    let canContinue = false


    onMount(async() => {
        const loader = new Loader('AIzaSyAmlMcGgumMqP6T8YLFnsQT_tbL4j5wF0s', {libraries: ['places']});

        const google = await loader.load();


        const geocoder = new google.maps.Geocoder();
        const infowindow = new google.maps.InfoWindow();

        const map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8,
        });
        map.panTo({lat: 13.7, lng:100.5})

        let marker = new google.maps.Marker({
            position: {lat: 13.7, lng:100.5},
            map,
            title: "Drag me to the exact position",
            draggable: true,
        });

        map.addListener("click", (event) => {
            console.log('Clicked', event.latLng.lat(), event.latLng.lng())
            console.log(event)
            marker.setPosition(event.latLng)
            let geo = geocodeLatLng(geocoder, map, infowindow, event.latLng.lat(), event.latLng.lng())

        })

        marker.addListener('dragend', function(event) {
            //marker.setPosition(event.latLng)
            console.log(event.latLng)
            let geo = geocodeLatLng(geocoder, map, infowindow, event.latLng.lat(), event.latLng.lng())

        })

        let input = document.getElementById("address");

        let ac = new google.maps.places.Autocomplete(input, {componentRestrictions: { country: "th" }})

        // when user clicks suggestion
        ac.addListener("place_changed", (event) => {
            //console.log(ac.getPlace())
            let p = ac.getPlace()
            map.setCenter({lat: p.geometry.location.lat(), lng: p.geometry.location.lng()})
            map.setZoom(18)
            marker.setPosition({lat: p.geometry.location.lat(), lng: p.geometry.location.lng()})
            canContinue = true

            let geo = geocodeLatLng(geocoder, map, infowindow, p.geometry.location.lat(), p.geometry.location.lng())
        })

        function geocodeLatLng(
            geocoder,
            map,
            infowindow, lat, lng
        ) {

            console.log("GEOCODING", lat, lng)
            const latlng = {
                lat: lat,
                lng: lng,
            };

            geocoder
                .geocode({ location: latlng})
                .then((response) => {
                    if (response.results[0]) {
                        //map.setZoom(25);

                        marker.setPosition(latlng)

                        console.log(response.results[0])
                        let c = response.results[0].address_components
                        infowindow.setContent(`${c[0].long_name}, ${c[1].long_name}, ${c[2].long_name}`);
                        infowindow.open(map, marker);
                    } else {
                        window.alert("No results found");
                    }
                })
                .catch((e) => window.alert("Geocoder failed due to: " + e));
        }
    })

    function searchAddress() {
        console.log($street)
    }
</script>

<form class="center col shade3 curve py-50 px-10 pb-100" autocomplete="false">
    <div class="center col w-sm gap-40">
        <h1 class="font-36 weight-300">Address</h1>
        <p class="text-center">
            Please provide the shop location so customers can find your store.
            Enter your address then drag the marker to the shop's exact location on the map.
        </p>
        <div class=" row grow gap-10 w100">
<!--            <div class="col grow gap-10">-->
<!--                <label for="name" class="pl-4 weight-300">Number</label>-->
<!--                <Field bind:value={$number} label="Number" />-->
<!--            </div>-->
            <div class="col grow grow-2 gap-10">
                <label class="pl-4 weight-300">Address</label>
                <input class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100" id="address" type="value" role="presentation" autocomplete="off" placeholder="enter shop address here"/>
            </div>
        </div>
<!--        <div class="row grow gap-10 w100">-->
<!--            <div class="col w100 grow gap-10">-->
<!--                <label class="pl-4 weight-300">Address 2</label>-->
<!--                <Field bind:value={$address2} label="Address 2 - Apartment, Suit ect" />-->
<!--            </div>-->
<!--            <div class="col w100  grow gap-10 ">-->
<!--                <label for="name" class="pl-4 weight-300">Sub-District</label>-->
<!--                <Field bind:value={$district} label="Sub-District" />-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="row grow gap-10 w100">-->
<!--            <div class="col w100 grow-2 gap-10">-->
<!--                <label for="name" class="pl-4 weight-300">Province / State </label>-->
<!--                <Field bind:value={$county} label="Province  / State" />-->
<!--            </div>-->
<!--            <div class="col w100  grow gap-10 ">-->
<!--                <label for="name" class="pl-4 weight-300">Postal code</label>-->
<!--                <Field bind:value={$zip} label="Postal code" />-->
<!--            </div>-->
<!--        </div>-->
    </div>
    <br>
    <div id="map" class="center row w90 h-400 gap-40" ></div>
    <div class="shade4">Left click to place marker (or drag it). Ctrl+scroll to zoom in/out</div>
    <div class="pt-50  row w-sm  w100  z-2">
        <div class=" center w100">
            <Button on:click={next} type="button" disable={!canContinue} text="CONTINUE" />
        </div>
    </div>
</form>