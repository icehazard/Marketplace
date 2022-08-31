<script>
    import Button from "comp/atoms/Button.svelte";
    import shops from "@/store/shops.js";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";
    import Checkbox from "comp/atoms/Checkbox.svelte";
    import { acts } from "@tadashi/svelte-notification";

    export let isOpen;

    let msg1 = `Updated accepted payment methods`;
    let msg2 = `You must have at least one payment type available`;
    let msg3 = "Error";

    const MASK_BANK = 1;
    const MASK_CRYPTO = 2;

    let totalMask = $shops.paymentMask;
    let maskBank = totalMask & MASK_BANK;
    let maskCrypto = totalMask & MASK_CRYPTO;

    async function save() {
        if (totalMask == 0) return acts.add(notify(0, msg2));
        let res = await shops.patch({ paymentMask: totalMask });
        if (res == 200) acts.add(notify(1, msg1));
        else acts.add(notify(0, msg3));
        shops.get($shops.id);
        closeModal();
    }
    function handleMask(val) {
        if ((totalMask & val) != 0) totalMask &= ~val;
        else totalMask |= val;
    }
    function notify(status, msg) {
        return {
            mode: status == 0 ? "error" : "success",
            message: msg,
            lifetime: 2,
        };
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
                    <button class="row gap-20">
                        <Checkbox
                            secondaryColor="var(--shade5)"
                            primaryColor="var(--primary)"
                            duration="150"
                            size="2rem"
                            bind:checked={maskBank}
                            on:change={() => handleMask(MASK_BANK)}
                            label="Bank"
                            mask={maskBank}
                        />
                    </button>
                    <button class="row gap-20 align-center">
                        <Checkbox
                            size="2rem"
                            duration="150"
                            secondaryColor="var(--shade5)"
                            primaryColor="var(--primary)"
                            bind:checked={maskCrypto}
                            on:change={() => handleMask(MASK_CRYPTO)}
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
