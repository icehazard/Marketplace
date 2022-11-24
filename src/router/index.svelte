<script>
    import { onMount } from "svelte";
    import app from "@/store/app.js";
    let Page;

    $: $app.url, push($app.url);

    let routes = {
        "/": { page: "Home", auth: false },
        "/shops": { page: "Home", auth: false },
        "/top": { page: "Home", auth: false },
        "/listing/:id": { page: "Listing", auth: false },
        "/store/listing/edit/:id": { page: "AddListing", auth: false },
        "/settings": { page: "Settings", auth: false },
        "/addresses/overview": { page: "Addresses", auth: false },
        "/addresses/choose": { page: "Addresses", auth: false },
        "/addresses/add": { page: "AddressesAdd", auth: false },
        "/addresses/add/choose": { page: "AddressesAdd", auth: false },
        "/addresses/edit/:id": { page: "AddressesAdd", auth: false },
        "/wallet/overview": { page: "Wallet", auth: false },
        "/wallet/receive": { page: "WalletReceive", auth: false },
        "/wallet/send": { page: "WalletSend", auth: false },
        "/wallet/transactions": { page: "WalletTransactions", auth: false },
        "/orders/overview": { page: "Orders", auth: false },
        "/orders/active": { page: "ActiveOrders", auth: false },
        "/orders/active/:id": { page: "ActiveOrders", auth: false },
        "/orders/view/:id": { page: "ViewOrder", auth: false },
        "/cart": { page: "Cart", auth: false },
        "/notifications": { page: "Notifications", auth: false },
        "/account": { page: "Profile", auth: false },
        "/messages": { page: "Messages", auth: false },
        "/shops/id/:id": { page: "Seller", auth: false },
        "/store/create": { page: "ShopWizard", auth: false },
        "/store/settings": { page: "Shop", auth: false },
        "/store/add": { page: "AddListing", auth: false },
        "/seller": { page: "Seller", auth: false },
        "/login": { page: "Login", auth: false },
        "/signup": { page: "Signup", auth: false },
        "/policy": { page: "Policy", auth: false },
        "/terms": { page: "Terms", auth: false },
        "/admin": { page: "Admin", auth: false },
        "/bankPayment": { page: "BankPayment", auth: false },
    };
    function push(path, blockSamePage, blockPushState) {
        const url = convertToWild(path);
        if (window.location.pathname == path && !blockSamePage) return;
        if ($app.url !== path) $app.url = path;
        if (!blockPushState) window.history.pushState(null, null, path);
        if (!routes[url]) return;
        loadPage(routes[url].page);
    }
    async function loadPage(view) {
        Page = (await import(`../views/${view}.svelte`)).default;
        await new Promise((r) => setTimeout(r, 0));
        hijackAnchors();
    }
    function handleClick(e) {
        e.preventDefault();
        removeClass();
        if (guard(this.pathname)) return;
        addClass(this);
        push(this.pathname);
    }
    function guard(path) {
        if (routes[path].auth == false) return false;
        push("/");
        return true;
    }
    function addClass(el) {
        el.classList.add("active");
    }
    function removeClass() {
        var els = document.getElementsByTagName("a");
        for (let a of els) {
            a.removeEventListener("click", handleClick);
            a.classList.remove("active");
        }
    }
    function hijackAnchors() {
        var els = document.getElementsByTagName("a");
        for (let a of els) {
            a.pathname = `${a.pathname}`;
            a.addEventListener("click", handleClick, false);
            if (a.pathname == location.pathname) addClass(a);
        }
    }
    function convertURL(str) {
        str = str.split("/").map((el) => (el.startsWith(":") ? "*" : el));
        return str.join("/");
    }
    function convertToDynamicRoutes() {
        for (let oldKey of Object.keys(routes)) {
            let newKey = convertURL(oldKey);
            routes[newKey] = routes[oldKey];
            if (oldKey == newKey) continue;
            delete routes[oldKey];
        }
    }
    function convertToWild(url) {
        for (let oldKey of Object.keys(routes)) {
            let ary1 = url.split("/");
            let ary2 = convertURL(oldKey).split("/");
            for (let x in ary1) {
                if (ary1.length !== ary2.length) continue;
                if (ary2[x] == "*") ary1[x] = "*";
            }
            if (JSON.stringify(ary1) !== JSON.stringify(ary2)) continue;
            return ary1.join("/");
        }
    }
    onMount(() => {
        convertToDynamicRoutes();
        push(window.location.pathname, true);
        window.onpopstate = () => push(window.location.pathname, true, true);
        document.addEventListener("click", () => hijackAnchors());
    });
</script>

<svelte:component this={Page} />
