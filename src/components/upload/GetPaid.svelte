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

<form
    class:valid={$isValid}
    on:submit={handleSubmit}
    class="center col shade3 curve py-50 px-10 pb-100"
>
    <div class="center  w-sm gap-40">
        <h1 class="font-36 weight-300">Getting paid</h1>
        <p class="text-center">
            Not to get all matchy-matchy, but the name on your bank account needs to be the same as
            the name you entered above.
        </p>
        <div class="col w100 gap-10">
            <label for="name" class="pl-4 weight-300">Full name on account</label>
            <div class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100">
                <input
                    on:keyup={handleChange}
                    autocomplete="off"
                    name="name"
                    type="text"
                    class="w100 shade2"
                    placeholder="Full name on account"
                />
            </div>
        </div>
        <div class="col w100 gap-10">
            <label for="name" class="pl-4 weight-300">Bank name</label>
            <div class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100">
                <input
                    on:keyup={handleChange}
                    autocomplete="off"
                    name="name"
                    type="text"
                    class="w100 shade2"
                    placeholder="Bank name"
                />
            </div>
        </div>
        <div class="col w100 gap-10">
            <label for="name" class="pl-4 weight-300">IBAN</label>
            <div class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100">
                <input
                    on:keyup={handleChange}
                    autocomplete="off"
                    name="name"
                    type="text"
                    class="w100 shade2"
                    placeholder="IBAN"
                />
            </div>
        </div>
        <div class="col w100 gap-10">
            <label for="name" class="pl-4 weight-300">SWIFT BIC </label>
            <div class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100">
                <input
                    on:keyup={handleChange}
                    autocomplete="off"
                    name="name"
                    type="text"
                    class="w100 shade2"
                    placeholder="SWIFT BIC "
                />
            </div>
        </div>
    </div>
</form>
