import { wrap } from "svelte-spa-router/wrap";

const Home = () => import("@/views/Home.svelte");

const Listing = () => import("@/views/Listing.svelte");
const Settings = () => import("@/views/Settings.svelte");
const Cart = () => import("@/views/Cart.svelte");
const Profile = () => import("@/views/Profile.svelte");
const Messages = () => import("@/views/Messages.svelte");

const Todo = () => import("@/views/Todo.svelte");
const DappUni = () => import("@/views/DappUni.svelte");

export default {
    "/": wrap({ asyncComponent: Home }), 
    "/listing": wrap({ asyncComponent: Listing }),
    "/settings": wrap({ asyncComponent: Settings }),
    "/cart": wrap({ asyncComponent: Cart }),
    "/profile": wrap({ asyncComponent: Profile }),
    "/messages": wrap({ asyncComponent: Messages }),

    "/todo": wrap({ asyncComponent: Todo }),
    "/dappuni": wrap({ asyncComponent: DappUni }),
}