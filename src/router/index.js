import { wrap } from "svelte-spa-router/wrap";

const Home = () => import("@/views/Home.svelte");
const About = () => import("@/views/About.svelte");
const Listing = () => import("@/views/Listing.svelte");

export default {
    "/": wrap({ asyncComponent: Home }),
    "/about": wrap({ asyncComponent: About }),
    "/listing": wrap({ asyncComponent: Listing })
}