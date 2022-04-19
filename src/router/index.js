import { wrap } from "svelte-spa-router/wrap";

const Home = () => import("@/views/Home.svelte");
const About = () => import("@/views/About.svelte");

export default {
    "/": wrap({ asyncComponent: Home }),
    "/about": wrap({ asyncComponent: About })
}