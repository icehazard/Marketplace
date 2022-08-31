<script>
    import Field from "comp/atoms/TextField.svelte";
    import Button from "comp/atoms/Button.svelte";
    import { push } from "svelte-spa-router";
    import cart from "@/store/cart.js";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";
    import { acts } from "@tadashi/svelte-notification";
    import products from "@/store/products.js";

    let noti = {
        mode: "success",
        message: `Added ${$products.product.name} to your cart`,
        lifetime: 2,
    };

    export let isOpen;
    export let product;

    function save() {
        $cart.cart = [];
        cart.addToCart(product);
        push("#/cart");
        acts.add(noti);
        closeModal();
    }
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal center fixed p-center z-4 nopointer"
        transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
    >
        <div class="shade3 curve  gap-20 col w-400 w100 overflow-hidden autopointer">
            <div class="body pa-25 pt-30 gap-20 col">
                <span class="font-24">Remove your previous items?</span>
                <span class="font-14 opacity-75">
                    You still have products from another restaurant. Shall we start ovver wit ha s
                    fresh cart?
                </span>
            </div>
            <div class="actions row shade2 pa-25 gap-10">
                <Button primary block text="REMOVE" on:click={save} />
                <Button block text="CLOSE" on:click={closeModal} />
            </div>
        </div>
    </div>
{/if}
