<script>
    import Field from "comp/atoms/TextField.svelte";
    import Button from "comp/atoms/Button.svelte";
    import shops from "@/store/shops.js";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";
    import Checkbox from "svelte-checkbox";

    export let isOpen;

    const MASK_BANK = 1;
    const MASK_CRYPTO = 2;

    let totalMask = $shops.paymentType;
    let maskBank = totalMask & MASK_BANK;
    let maskCrypto = totalMask & MASK_CRYPTO;

    // $: maskCrypto, maskCryptoFunc()

    // $: maskBank, maskBankFunc()

    function save() {
        shops.patch({ paymentMask: totalMask });
        console.log("🚀 ~ totalMask", totalMask);
        closeModal();
    }

    function maskBankFunc() {

        console.log("🚀 ~ maskBank2", maskBank)
        maskBank = !maskBank;
        maskFun(MASK_BANK);
    }
    function maskCryptoFunc() {
        maskCrypto = !maskCrypto;
        console.log("🚀 ~ maskCrypto3", maskCrypto)
        maskFun(MASK_CRYPTO);
    }

    function maskFun(val) {
        if (totalMask & (val != 0)) totalMask &= ~val;
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
                    <button  class="row gap-20">
                        <Checkbox
                            secondaryColor="var(--shade5)"
                            primaryColor="var(--primary)"
                            duration="150"
                            size="2rem"
                            bind:checked={maskBank}
                        />
                        <div >
                            <div class=" pa-5 curve" class:opacity-50={!maskBank}>Bank</div>
                        </div>
                    </button>
                    {maskCrypto}
                    <button class="row gap-20 align-center ">
                        <Checkbox
                            size="2rem"
                            duration="150"
                            secondaryColor="var(--shade5)"
                            primaryColor="var(--primary)"
                          
                            bind:checked={maskCrypto}
                       
                        />
                        <div on:click={maskCryptoFunc}>
                            <div class=" pa-5 curve  grow" class:opacity-50={!maskCrypto}>
                                Cypto
                            </div>
                        </div>
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
