import { wrap } from "svelte-spa-router/wrap";
import user from '@/store/user.js'

const Home = () => import("@/views/Home.svelte");
const Listing = () => import("@/views/Listing.svelte");
const Settings = () => import("@/views/Settings.svelte");
const Orders = () => import("@/views/Orders.svelte");
const Cart = () => import("@/views/Cart.svelte");
const Profile = () => import("@/views/Profile.svelte");
const Addresses = () => import("@/views/Addresses.svelte");
const AddressesAdd = () => import("@/views/AddressesAdd.svelte");
const Messages = () => import("@/views/Messages.svelte");
const AddListing = () => import("@/views/AddListing.svelte");
const Notifications = () => import("@/views/Notifications.svelte");
const ShopWizard = () => import("@/views/ShopWizard.svelte");
const Seller = () => import("@/views/Seller.svelte");
const ViewOrder = () => import("@/views/ViewOrder.svelte");
const ActiveOrder = () => import("@/views/ActiveOrders.svelte");
const Login = () => import("@/views/Login.svelte");
const Signup = () => import("@/views/Signup.svelte");
const Shop = () => import("@/views/Shop.svelte");
const Wallet = () => import("@/views/Wallet.svelte");
const WalletReceive = () => import("@/views/WalletReceive.svelte");
const WalletSend = () => import("@/views/WalletSend.svelte");
const WalletTransactions = () => import("@/views/WalletTransactions.svelte");

export default {
    "/": wrap({ asyncComponent: Home }),
    "/shops": wrap({ asyncComponent: Home }),
    "/top": wrap({ asyncComponent: Home }),
    "/listing/:id": wrap({ asyncComponent: Listing }),
    "/store/listing/edit/:id": wrap({ asyncComponent: AddListing }),
    "/settings": wrap({ asyncComponent: Settings, conditions: [auth] }),
    "/addresses/overview": wrap({ asyncComponent: Addresses, conditions: [auth] }),
    "/addresses/add": wrap({ asyncComponent: AddressesAdd, conditions: [auth] }),
    "/addresses/edit/:id": wrap({ asyncComponent: AddressesAdd, conditions: [auth] }),
    "/wallet/overview": wrap({ asyncComponent: Wallet, conditions: [auth] }),
    "/wallet/receive": wrap({ asyncComponent: WalletReceive, conditions: [auth] }),
    "/Wallet/send": wrap({ asyncComponent: WalletSend, conditions: [auth] }),
    "/Wallet/transactions": wrap({ asyncComponent: WalletTransactions, conditions: [auth] }),
    "/orders/overview": wrap({ asyncComponent: Orders, conditions: [auth] }),
    "/orders/active/:id": wrap({ asyncComponent: ActiveOrder, conditions: [auth] }),
    "/orders/view/:id": wrap({ asyncComponent: ViewOrder, conditions: [auth] }),
    "/cart": wrap({ asyncComponent: Cart }),
    "/notifications": wrap({ asyncComponent: Notifications }),
    "/account": wrap({ asyncComponent: Profile, conditions: [auth] }),
    "/messages": wrap({ asyncComponent: Messages, conditions: [auth] }),
    "/shops/id/:id": wrap({ asyncComponent: Seller }),
    "/store/create": wrap({ asyncComponent: ShopWizard }),
    "/store/settings": wrap({ asyncComponent: Shop }),
    "/store/add": wrap({ asyncComponent: AddListing }),
    "/seller": wrap({ asyncComponent: Seller }),
    "/login": wrap({ asyncComponent: Login }),
    "/signup": wrap({ asyncComponent: Signup }),
}

function auth(detail) {
    if (!user.val('username')) return false;
    return true;
    
   
}