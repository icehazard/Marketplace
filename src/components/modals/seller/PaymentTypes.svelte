<script>
    import Field from "comp/atoms/TextField.svelte";
    import Button from "comp/atoms/Button.svelte";
    import shops from "@/store/shops.js";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";
    import Checkbox from "comp/atoms/Checkbox.svelte";

    export let isOpen;

    const MASK_BANK = 1;
    const MASK_CRYPTO = 2;

    let totalMask = $shops.paymentType;
    let maskBank = totalMask & MASK_BANK;
    let maskCrypto = totalMask & MASK_CRYPTO;

    function save() {
        shops.patch({ paymentMask: totalMask });
        console.log("🚀 ~ totalMask", totalMask);
        closeModal();
    }

    function maskFun(val) {
        if (totalMask & val != 0) totalMask &= ~val;
        else totalMask |= val;
    }
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal center fixed p-center z-4 nopointer"
        transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
    >
        <div class="shade3 curve  gap-20 col w-400 w100 overflow-hidden autopointer">
            <div class="body pa-25 pt-30 gap-30 col">
                <span class="font-24">Update Payment Types</span>
                <span class="opacity-50">Select the payment options you provide</span>
                <div class="col gap-10">
                    <button class="row gap-20" on:click={() => maskFun(MASK_BANK)}>
                        <Checkbox
                            secondaryColor="var(--shade5)"
                            primaryColor="var(--primary)"
                            duration="150"
                            size="2rem"
                            bind:checked={maskBank}
                            label="Bank"
                            mask={maskBank}
                        />
                    </button>
                    <button class="row gap-20 align-center" on:click={() => maskFun(MASK_CRYPTO)}>
                        <Checkbox
                            size="2rem"
                            duration="150"
                            secondaryColor="var(--shade5)"
                            primaryColor="var(--primary)"
                            bind:checked={maskCrypto}
                            label="CRYPTO"
                            mask={maskCrypto}
                        />
                    </button>
                </div>
            </div>
            <div class="actions row shade2 pa-25 gap-10">
                <Button primary block text="SAVE" on:click={save} />
                <Button block text="CLOSE" on:click={closeModal} />
            </div>
        </div>
    </div>
{/if}
