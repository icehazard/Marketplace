<script>
    import Field from "comp/atoms/TextField.svelte";
    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";
    import shops from "@/store/shops.js";
    import { closeModal } from "svelte-modals";
    import { scale } from "svelte/transition";

    export let isOpen;
    let load = false;
    let el, picker;
    let field = $shops.coverPic;

    function save() {
        $shops.coverPic = field;
        closeModal();
    }
    async function upload(data) {
        let formData = new FormData(el);
        this.load = true;
        shops.post(formData); //await
        this.load = false;
        closeModal();
    }
    function openPicker() {
     picker.click();
    }
</script>

{#if isOpen}
    <div
        role="dialog"
        class="modal center fixed p-center z-4 nopointer border"
        transition:scale={{ duration: 100, opacity: 0, start: 1.1 }}
    >
        <div class="shade3 curve  gap-20 col w-400 overflow-hidden autopointer">
            <div class="body pa-25 pt-30 gap-20 col">
                <span class="font-24">Edit cover Image</span>
                <form bind:this={el} class="none" enctype="multipart/form-data">
                    <input type="file" on:change={upload} name="avatar" bind:this={picker} />
                </form>
                <input
                on:click={openPicker}
                    button="button"
                    class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100 slow"
                    placeholder="Select an Image"
                />
                <div class="center cursor-pointer absolute icon p-right pr-10">
                    <Icon icon="fluent:chevron-up-down-20-regular" />
                </div>
            </div>
            <div class="actions row shade2 pa-25 gap-10">
                <Button block text="SAVE" on:click={save} />
                <Button block text="CLOSE" on:click={closeModal} />
            </div>
        </div>
    </div>
{/if}
