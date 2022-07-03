<script>
	import products from '@/store/products.js';
	import user from '@/store/user.js';

	import Footer from "./components/toolbars/Footer.svelte";
	import Navbar from "comp/toolbars/navbar/Navbar.svelte";
	import Mobile from "comp/toolbars/navbar/Mobile.svelte";
	import Router from "svelte-spa-router";
	import routes from "./router/index";
	import MediaQuery from "@/assets/library/MediaQuery.svelte";
	import { WEBPACK_URL } from "./config";


	async function callListing(){
		let data = {name : 'name', ownerID: 'ownerID', type: 'type', address: 'address', nameBankAccount: 'nameBankAccount', bankName: 'bankName', BankAccountNumber: 'BankAccountNumber' };
        let res = await fetch(`http://${WEBPACK_URL}/api/store`, {
            method: "POST",
            headers: {
                Accept: "application/json",
				token: $user.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
     
        res = await res.json();
	
	}
	async function callMe(){
		let res = await fetch(`http://${WEBPACK_URL}/api/me`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				token:  $user.token,
				"Content-Type": "application/json",
			},
		});
		res = await res.json();
		// console.log("Got Me(): ")
		// console.log(res)
		return res
	}
	//callListing()
	//callMe()
</script>

<main class="col vh100">
	<Navbar />
	<Router {routes}/>
	<MediaQuery />
	<Mobile />
	<Footer />
</main>

