<script>
    import { onMount } from "svelte";
    import app from "@/store/app.js";
    import user from "@/store/user.js";
    import routes from "./routes";
    let Page;
    $: $app.url, push($app.url);

    async function push(path) {
        let browser = window.location.pathname;
        if (browser === path && browser === $app.url && Page) return;
        if ($app.url !== path) $app.url = path;
        const url = convertToWild(path);
        if (guard(url)) return;
        let equality = browser === path && browser === $app.url;
        if (!equality) window.history.pushState(null, null, path);
        await loadPage(routes[url].page);
        hijackAnchors()
    }
    async function loadPage(view) {
        let page = await import(`../views/${view}.svelte`);
        Page = page.default;
        return Page;
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
    function convertToWild(url) {
        for (let oldKey of Object.keys(routes)) {
            let ary1 = url.split("/");
            let ary2 = convertURL(oldKey).split("/");
            if (ary1.length !== ary2.length) continue;
            for (let x in ary1) {
                if (ary2[x] == "*") ary1[x] = "*";
            }
            if (JSON.stringify(ary1) !== JSON.stringify(ary2)) continue;
            return ary1.join("/");
        }
    }
    function convertToDynamicRoutes() {
        for (let oldKey of Object.keys(routes)) {
            let newKey = convertURL(oldKey);
            routes[newKey] = routes[oldKey];
            if (oldKey == newKey) continue;
            delete routes[oldKey];
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
