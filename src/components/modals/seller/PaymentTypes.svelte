<script>
    import Field from "comp/atoms/TextField.svelte";
    import Button from "comp/atoms/Button.svelte";
    import shops from "@/store/shops.js";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";

    export let isOpen;

    const MASK_BANK = 1;
    const MASK_CRYPTO = 2;

    let totalMask = $shops.paymentType;
    let maskBank = totalMask & MASK_BANK;
    let maskCrypto = totalMask & MASK_CRYPTO;

    function save() {
        shops.patch({ paymentType: totalMask });
        closeModal();
    }

    function maskBankFunc() {
        maskBank = !maskBank;
        if (maskBank) totalMask |= MASK_BANK;
        if (!maskBank) totalMask &= ~MASK_BANK;
    }
    function maskCryptoFunc() {
        maskCrypto = !maskCrypto;
        if (maskCrypto) totalMask |= MASK_CRYPTO;
        if (!maskCrypto)  totalMask &= ~MASK_CRYPTO;
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
                    <div class="row gap-20">
                        <input type="checkbox" on:click={maskBankFunc} checked={maskBank} />
                        <button on:click={maskBankFunc}>
                            <div class=" pa-5 curve" class:opacity-50={!maskBank}>Bank</div>
                        </button>
                    </div>
                    <div class="row gap-20 align-center ">
                        <input type="checkbox" on:click={maskCryptoFunc} checked={maskCrypto} />
                        <button on:click={maskCryptoFunc}>
                            <div class=" pa-5 curve  grow" class:opacity-50={!maskCrypto}>
                               cypto
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div class="actions row shade2 pa-25 gap-10">
                <Button primary block text="SAVE" on:click={save} />
                <Button block text="CLOSE" on:click={closeModal} />
            </div>
        </div>
    </div>
{/if}
