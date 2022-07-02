<script>
	import { token_ } from '@/store/user.js';
	import Footer from "./components/toolbars/Footer.svelte";
	import Navbar from "comp/toolbars/navbar/Navbar.svelte";
	import Mobile from "comp/toolbars/navbar/Mobile.svelte";
	import Router from "svelte-spa-router";
	import routes from "./router/index";
	import MediaQuery from "@/assets/library/MediaQuery.svelte";
	import { WEBPACK_URL } from "./config";


	//import Web3 from 'web3/dist/web3.min.js'

	async function callListing(){
		let data = {name : 'name', ownerID: 'ownerID', type: 'type', address: 'address', nameBankAccount: 'nameBankAccount', bankName: 'bankName', BankAccountNumber: 'BankAccountNumber' };
        let res = await fetch(`http://${WEBPACK_URL}/api/store`, {
            method: "POST",
            headers: {
                Accept: "application/json",
				token: $token_,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
      //  console.log("🚀 ~ file: App.svelte ~ line 24 ~ callListing ~ data", data)
        res = await res.json();
		//console.log("🚀 ~ file: App.svelte ~ line 20 ~ callListing ~ res", res)
	}
	callListing()
</script>

<main class="col vh100">
	<Navbar />
	<Router {routes}/>
	<MediaQuery />
	<Mobile />
	<Footer />
</main>

