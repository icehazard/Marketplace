<script>
    import { onMount } from "svelte";
    import { Loader } from "google-maps";

    export let address = "";
    export let _lat = "";
    export let _lng = "";

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

        ac.addListener("place_changed", (event) => {
            let p = ac.getPlace();
            map.setCenter({ lat: p.geometry.location.lat(), lng: p.geometry.location.lng() });
            map.setZoom(18);
            marker.setPosition({ lat: p.geometry.location.lat(), lng: p.geometry.location.lng() });

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
                        marker.setPosition(latlng);
                        _lat = lat;
                        _lng = lng;
                        console.log("Latlng IZ", lat, lng);
                        console.log(response.results[0]);
                        let c = response.results[0].address_components;
                        let finalAddress = `${c[0].long_name}, ${c[1].long_name}, ${c[2].long_name}`;
                        infowindow.setContent(finalAddress);
                        infowindow.open(map, marker);
                        address = finalAddress;
                    } else {
                        window.alert("No results found");
                    }
                })
                .catch((e) => console.log("Geocoder failed due to: " + e));
        }
    });
</script>

<div class="col w100">
    <input id="address" bind:value={address} class="none" />
<div class="curve overflow-hidden w100">
    <div id="map" class="curved w100 h-400 w100" />
</div>
</div>

<style>
    #map {
        height: calc(100vh - 100px);
    }
</style>
