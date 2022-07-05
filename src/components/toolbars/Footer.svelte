<script>
    import user from "@/store/user.js";
    import { currencies } from "@/assets/library/options.js";

    $: symbol = currencies.filter((el) => el.id == $user.currency)[0].symbol;
</script>

<footer class="grow w100 h-200 pa-50 gap-20 col font-14 container mb-40">
    <hr />
    <div class="row space-between">
        <div class="row gap-20 line-height-20">
            <button> Thailand </button>
            <span>|</span>
            <button>English (US)</button>
            <span>|</span>
            <a href="#/settings"> {symbol} ({$user.currency}) </a>
        </div>
        <div class="row gap-20 line-height-20">
            <button> © Metaroad</button>
            <span>|</span>
            <button>Terms of Use</button>
            <span>|</span>
            <button>Privacy</button>
        </div>
    </div>
</footer>

<style>
    hr {
        border: 1px solid #70707054;
    }

    footer {
        max-height: 150px;
        height: 150px;
    }
</style>
