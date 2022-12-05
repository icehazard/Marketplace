<script>
    import Field from "#/atoms/TextField.svelte";
    import Button from "#/atoms/Button.svelte";
    import products from "@/store/products.js";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";

    export let isOpen;
    let field = $products.product.price;

    function save() {
        $products.product.price = field;
        products.edit({price: field})
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
                <span class="font-24">Update price</span>
                <Field bind:value={field} label="Enter URL" />
            </div>
            <div class="actions row shade2 pa-25 gap-10">
                <Button primary block text="SAVE" on:click={save}></Button>
                <Button block text="CLOSE" on:click={closeModal}></Button>
            </div>
        </div>
    </div>
{/if}
