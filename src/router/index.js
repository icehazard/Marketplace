import { wrap } from "svelte-spa-router/wrap";

const Home = () => import("@/views/Home.svelte");
const Listing = () => import("@/views/Listing.svelte");
const Settings = () => import("@/views/Settings.svelte");
const Orders = () => import("@/views/Orders.svelte");
const Cart = () => import("@/views/Cart.svelte");
const Profile = () => import("@/views/Profile.svelte");
const Messages = () => import("@/views/Messages.svelte");
const AddListing = () => import("@/views/AddListing.svelte");
const ShopWizard = () => import("@/views/ShopWizard.svelte");
const Seller = () => import("@/views/Seller.svelte");
const ViewOrder = () => import("@/views/ViewOrder.svelte");
const Login = () => import("@/views/Login.svelte");
const Signup = () => import("@/views/Signup.svelte");

export default {
    "/": wrap({ asyncComponent: Home }), 
    "/listing": wrap({ asyncComponent: Listing }),
    "/settings": wrap({ asyncComponent: Settings }),
    "/orders/overview": wrap({ asyncComponent: Orders }),
    "/orders/view/:id": wrap({ asyncComponent: ViewOrder }),
    "/cart": wrap({ asyncComponent: Cart }),
    "/account": wrap({ asyncComponent: Profile }),
    "/messages": wrap({ asyncComponent: Messages }),
    "/store/create": wrap({ asyncComponent: ShopWizard }),
    "/listing/create": wrap({ asyncComponent: AddListing }),
    "/seller": wrap({ asyncComponent: Seller }),
    "/login": wrap({ asyncComponent: Login }),
    "/signup": wrap({ asyncComponent: Signup }),
}