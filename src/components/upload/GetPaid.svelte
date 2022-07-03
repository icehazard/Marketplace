<script>
    import Field from "comp/atoms/TextField.svelte";
    import Button from "comp/atoms/Button.svelte";
    import Icon from "@iconify/svelte";
    import { createForm } from "svelte-forms-lib";
    import { shopValid, active } from "@/store/store.js";
    import * as yup from "yup";
    import banksLogo from "banks-logo";
    import { afterUpdate, beforeUpdate, onMount } from "svelte";

    let showBankNrInput = false;

    let bankNumber = "";
    let keys = banksLogo.listKey();
    let allBanks = [];
    let bankSearchInput = "";

    for (let k of keys) {
        let b = banksLogo.Get(k);
        allBanks.push(b);
    }
    let tempBanks = allBanks;
    let showBankSearch = false;

    const { errors, isValid, touched, handleChange, handleSubmit } = createForm({
        initialValues: {
            name: "",
        },
        validationSchema: yup.object().shape({
            name: yup.string().required().min(3).max(20),
        }),
    });

    $: $isValid, $isValid && $touched.name;

    function validateBank() {
        return (
            bankNumber.length &&
            allBanks.filter(
                (i) => i.nice_name == bankSearchInput || i.official_name_thai == bankSearchInput
            ).length
        );
    }

    let validate;
    $: bankNumber, (validate = validateBank());

    function next() {
        if (!validateBank()) {
            console.log("Incorrect bank");
            return;
        }

        $active++;
    }

    function searchBanks(key) {
        let filter = bankSearchInput;
        if (!filter || !filter.length) showBankSearch = false;

        let firstFilter =
            filter && filter.length
                ? allBanks.filter(
                      (item) =>
                          item.official_name.toLowerCase().includes(filter.toLowerCase()) ||
                          item.nice_name.toLowerCase().includes(filter.toLowerCase()) ||
                          item.official_name_thai.indexOf(filter) !== -1
                  )
                : allBanks;

        tempBanks = firstFilter;
        showBankSearch = true;
        return firstFilter;
    }
    function selectBank(bankName) {
        showBankSearch = false;
        bankSearchInput = bankName;
        showBankNrInput = true;
    }
    function openPicker() {
        showBankSearch = !showBankSearch;
    }
</script>

<form
    class:valid={$isValid}
    on:submit={handleSubmit}
    class="center col shade3 curve py-50 px-10 pb-100"
>
    <div class="center  w-sm gap-40">
        <h1 class="font-36 weight-300">Getting Paid</h1>
        <p class="text-center">
            Not to get all matchy-matchy, but the name on your bank account needs to be the same as
            the name you entered above.
        </p>
        <div class="col w100 gap-10">
            <label for="name" class="pl-4 weight-300">Name on Bank Account</label>
            <div class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100">
                <input
                    on:keyup={handleChange}
                    autocomplete="off"
                    name="name"
                    type="text"
                    class="w100 shade2"
                    placeholder="yours or business name of bank account"
                />
            </div>
        </div>

        <div class="col w100 gap-10">
            <label for="btype" class="pl-4 weight-300">Bank Name</label>
            <button on:click={openPicker}>
                <div
                    class="borderStrong curser-text gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100"
                >
                    <input
                        bind:value={bankSearchInput}
                        on:keyup={searchBanks}
                        autocomplete="off"
                        name="name"
                        type="text"
                        class="w100 shade2 curser-text"
                        placeholder="Select a bank"
                    />
                    <button class="center curser-pointer">
                        <Icon icon="fluent:chevron-up-down-20-regular" />
                    </button>
                </div>
            </button>

            {#if showBankSearch}
                <div class=" w30 shade4 h-150" style="overflow:auto; border-radius:5px">
                    {#each tempBanks as b}
                        <button
                            class="row align-center  px-20 py-10 bank-search-box curve w100"
                            on:click={selectBank(b.nice_name)}
                        >
                            <img
                                src={b.image}
                                style="width: 30px; height:30px; background-color: {b.color}; border-radius: 5px"
                                alt=""
                            />
                            <div class="center ml-10">{b.nice_name}</div>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        {#if showBankNrInput}
            <div class="col w100 gap-10">
                <label for="name" class="pl-4 weight-300">Bank Account Number </label>
                <div
                    class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100"
                >
                    <input
                        bind:value={bankNumber}
                        autocomplete="off"
                        name="name"
                        type="text"
                        class="w100 shade2"
                        placeholder=""
                    />
                </div>
            </div>
        {/if}
    </div>
    <div class="pt-50  row w-sm  w100  z-2">
        <div class=" center w100">
        <div class="w60">
            <Button on:click={next} type="button" disable={!validate} text="CONTINUE" />
        </div>
        </div>
    </div>
</form>

<style>
    .bank-search-box:focus-visible {
        filter: contrast(1.5);
        background-color: rgb(146, 146, 146);
    }

    .curser-text {
        cursor: text;
    }

    .curser-pointer {
        cursor: pointer;
    }

    .bank-search-box:hover {
        background-color: rgba(100, 100, 100, 0.4);
        cursor: pointer;
    }

    #map * div {
        color: #000 !important;
    }
</style>
