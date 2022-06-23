<script>
    import Field from "comp/atoms/TextField.svelte";
    import Icon from "@iconify/svelte";
    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";

    const { errors, isValid, touched, handleChange, handleSubmit } = createForm({
        initialValues: {
            name: "",
        },
        validationSchema: yup.object().shape({
            name: yup.string().required().min(3).max(20),
        }),
    });

    $: $isValid, console.log($isValid && $touched.name);
</script>

<form class:valid={$isValid} on:submit={handleSubmit} class="center col shade3 curve py-50 px-10 pb-100">
    <div class="center  w-sm gap-40">
        <h1 class="font-36 weight-300">Name your shop</h1>
        <p class="text-center">
            Don't sweat it! You can just draft a name now and change it later. We find sellers often
            draw inspiration from what they sell, their style, pretty much anything goes. More
            naming tips
        </p>
        <div class="row w100">
            <div class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100">
                <input
                    on:keyup={handleChange}
                    autocomplete="off"
                    name="name"
                    type="text"
                    class="w100 shade2"
                    placeholder="Shop Title"
                />
            </div>
        </div>
        <div class="col w100 font-14">
            <div class="row align-center gap-10">
                {#if !$errors.name && $touched.name}
                    <Icon icon="fluent:checkmark-12-regular" height="24" color="green" />
                {:else}
                    <Icon icon="fluent:dismiss-12-regular" height="24" color="red" />
                {/if}
                <p>Between 3-20 characters</p>
            </div>
        </div>
    </div>
</form>
