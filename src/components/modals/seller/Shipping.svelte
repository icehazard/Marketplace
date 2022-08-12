<script>
    import Field from "comp/atoms/TextField.svelte";
    import Button from "comp/atoms/Button.svelte";
    import shops from "@/store/shops.js";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";
    import { currencies } from "@/assets/library/options.js";
    import user from "@/store/user.js";

    $: symbol = currencies.filter((el) => el.id == $user?.currency)[0]?.symbol;
    export let isOpen;
    let op1 =  $shops.shipping?.regular == null;
    let op2 = $shops.shipping?.minSpend == null;
    let op3 = $shops.shipping?.minFree == null;
    let regular = $shops.shipping?.regular || 35;
    let minFree = $shops.shipping?.minFree || 100;
    let minSpend = $shops.shipping?.minSpend || 500;

    if (!$shops.shipping) $shops.shipping = {}

    function save() {
        $shops.shipping.regular = regular;
        $shops.shipping.minSpend = minSpend;
        $shops.shipping.minFree = minFree;
        if (op1)  $shops.shipping.regular = null
        if (op2)  $shops.shipping.minFree = null
        if (op3)  $shops.shipping.minSpend = null
        closeModal();
        shops.patch({ shipping: $shops.shipping });
    }
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal center fixed p-center z-4 nopointer"
        transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
    >
        <div class="shade3 curve  gap-20 col w-400 overflow-hidden autopointer">
            <div class="body pa-25 pt-30 gap-20 col">
                <span class="font-24">Disable shipping fees</span>
                <span class="font-14 opacity-75">Check the box to disable shipping option</span>
                <div class="row gap-20 align-center">
                    <input type="checkbox" bind:checked={op1} />
                    <span class="fast" class:opacity-50={op1}>Price for each item shipped</span>
                </div>
                <div class="row align-center gap-20 fast" class:opacity-50={op1}>
                    {symbol}
                    <Field bind:value={regular} bind:disable={op1} />
                </div>
                <hr />
                <div class="row gap-20 align-center">
                    <input type="checkbox" bind:checked={op2} />
                    <span class="fast" class:opacity-50={op2}>Minimum Spend</span>
                </div>
                <div class="row align-center gap-20 fast" class:opacity-50={op2}>
                    {symbol}
                    <Field bind:value={minFree} bind:disable={op2} />
                </div>
       
                <hr />
                <div class="row gap-20 align-center">
                    <input type="checkbox" bind:checked={op3} />
                    <span class="fast" class:opacity-50={op3}>Free delivery after</span>
                </div>
                <div class="row align-center gap-20 fast" class:opacity-50={op3}>
                    {symbol}
                    <Field bind:value={minSpend} bind:disable={op3} />
                </div>
            </div>
            <div class="actions row shade2 pa-25 gap-10">
                <Button block text="SAVE" on:click={save} />
                <Button block text="CLOSE" on:click={closeModal} />
            </div>
        </div>
    </div>
{/if}
