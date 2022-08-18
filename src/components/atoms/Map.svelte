<script>
    import { onMount } from "svelte";
    import { Loader } from "google-maps";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let address = "";
    export let _lat = "";
    export let _lng = "";
    export let textfield = "";

    onMount(async () => {
        const loader = new Loader("AIzaSyAmlMcGgumMqP6T8YLFnsQT_tbL4j5wF0s", {
            libraries: ["places"],
        });

        const google = await loader.load();

        const geocoder = new google.maps.Geocoder();
        const infowindow = new google.maps.InfoWindow();

        let longlat = await codeAddress();

        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: longlat.lat, lng: longlat.lng },
            zoom: longlat.zoom,
        });
        map.panTo({ lat: longlat.lat, lng: longlat.lng });

        let marker = new google.maps.Marker({
            position: { lat: longlat.lat, lng: longlat.lng },
            map,
            title: "Drag me to the exact position",
            draggable: true,
        });

        geocodeLatLng(
                geocoder,
                map,
                infowindow,
                longlat.lat,
                longlat.lng
            );

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

        let input = textfield;

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

        async function getCoords() {
            const pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve(position),
                    (error) => reject(error)
                );
            });
            return {
                lng: pos.coords.longitude,
                lat: pos.coords.latitude,
            };
        }

        async function codeAddress() {
            let coords;
            try {
                
                 coords = await getCoords();
            } catch (error) {
                 coords = { lat: 13.7563, lng: 100.5018};
            }

            if (!address) return { lat: coords.lat, lng: coords.lng, zoom: 8 };
            
            let results ;
            try {
                 results = await geocoder.geocode({ address: address });
            } catch (error) {
                return { lat: 13.7563, lng: 100.5018, zoom: 8 }
            }
            
            return {
                lat: results.results[0].geometry.location.lat(),
                lng: results.results[0].geometry.location.lng(),
                zoom: 18,
            };
        }


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
                        dispatch("updateAddres", address);
                    } else {
                        window.alert("No results found");
                    }
                })
                .catch((e) => console.log("Geocoder failed due to: " + e));
        }
    });
</script>

<div class="col w100 grow h100">
    <!-- <input  bind:value={address}  /> -->
    <div class="curve overflow-hidden w100 grow">
        <div id="map" class="curved w100 h-400 w100 grow black--text" />
    </div>
</div>

<style>
    #map {
        height: 100%;
    }
</style>
