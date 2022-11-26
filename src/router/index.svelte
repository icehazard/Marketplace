<script>
    import { onMount } from "svelte";
    import app from "@/store/app.js";
    import user from "@/store/user.js";
    let Page;

    $: $app.url, push($app.url);

    let routes = {
        "/": { page: "Home", auth: false },

        "/categories/:id": { page: "Home", auth: false },
        "/top": { page: "Home", auth: false },
        "/listing/:id": { page: "Listing", auth: false },

        "/shops": { page: "Home", auth: false },
        "/shops/id/:id": { page: "Seller", auth: false },
        "/store/create": { page: "ShopWizard", auth: false },
        "/store/settings": { page: "Shop", auth: false },
        "/store/add": { page: "AddListing", auth: false },
        "/store/listing/edit/:id": { page: "AddListing", auth: false },
        "/seller": { page: "Seller", auth: false },

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
        "/bankPayment": { page: "BankPayment", auth: false },
        "/notifications": { page: "Notifications", auth: false },
        "/account": { page: "Profile", auth: false },
        "/messages": { page: "Messages", auth: false },
        "/settings": { page: "Settings", auth: false },

        "/login": { page: "Login", auth: false },
        "/signup": { page: "Signup", auth: false },
        "/policy": { page: "Policy", auth: false },
        "/terms": { page: "Terms", auth: false },
        "/admin": { page: "Admin", auth: false },
    };
    async function push(path) {
        let browser = window.location.pathname;
        if (browser === path && browser === $app.url && Page) return;
        if ($app.url !== path) $app.url = path;
        const url = convertToWild(path);
        if (guard(url)) return;
        let equality = browser === path && browser === $app.url;
        if (!equality) window.history.pushState(null, null, path);
        await loadPage(routes[url].page);
    }
    async function loadPage(view) {
        return (Page = (await import(`../views/${view}.svelte`)).default);
    }
    function handleClick(e) {
        e.preventDefault();
        push(this.pathname);
    }
    function guard(path) {
        if (routes[path].auth == false && $user.email) return false;
        if (window.location.pathname !== "/") return push("/");
    }
    function hijackAnchors() {
        var els = document.getElementsByTagName("a");
        for (let a of els) {
            a.addEventListener("click", handleClick, false);
            if (a.pathname == location.pathname) a.classList.add("active");
            else a.classList.remove("active");
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
    function observeAnchors() {
        const observer = new MutationObserver(hijackAnchors);
        const elementNode = document.getElementById("app");
        let options = { attributes: false, childList: true, subtree: true };
        observer.observe(elementNode, options);
    }

    convertToDynamicRoutes();
    onMount(() => {
        observeAnchors();
        window.onpopstate = () => push(window.location.pathname);
    });
</script>

<svelte:component this={Page} />
