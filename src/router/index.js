import { wrap } from "svelte-spa-router/wrap";

const Home = () => import("@/views/Home.svelte");
const About = () => import("@/views/About.svelte");
const Listing = () => import("@/views/Listing.svelte");
const Settings = () => import("@/views/Settings.svelte");
const Cart = () => import("@/views/Cart.svelte");
const Profile = () => import("@/views/Profile.svelte");
const Messages = () => import("@/views/Messages.svelte");

export default {
    "/": wrap({ asyncComponent: Home }),
    "/about": wrap({ asyncComponent: About }),
    "/listing": wrap({ asyncComponent: Listing }),
    "/settings": wrap({ asyncComponent: Settings }),
    "/cart": wrap({ asyncComponent: Cart }),
    "/profile": wrap({ asyncComponent: Profile }),
    "/messages": wrap({ asyncComponent: Messages }),
}