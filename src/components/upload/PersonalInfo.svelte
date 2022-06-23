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
        <h1 class="font-36 weight-300">Personal Information</h1>
        <p class="text-center">
            For compliance purposes, we may verify your identity with a secure third–party service.
            This information will never be displayed publicly on metaroad. Learn more
        </p>
        <div class="col w100 gap-10">
            <label for="name" class="pl-4 weight-300"> First name</label>
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
        <div class="col w100 gap-10">
            <label for="name" class="pl-4 weight-300">Last name</label>
            <div class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100">
                <input
                    on:keyup={handleChange}
                    autocomplete="off"
                    name="name"
                    type="text"
                    class="w100 shade2"
                    placeholder="Last name"
                />
            </div>
        </div>
        <div class="col w100 gap-10">
            <label for="name" class="pl-4 weight-300">Your date of birth</label>
            <div class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100">
                <input
                    on:keyup={handleChange}
                    autocomplete="off"
                    name="name"
                    type="text"
                    class="w100 shade2"
                    placeholder="Date of birth"
                />
            </div>
        </div>
        <div class="col w100 gap-10">
            <label for="name" class="pl-4 weight-300">Phone Number</label>
            <div class="borderStrong gap-10 curve align-center px-20 h-40 mobile-w100 shade2 w100">
                <input
                    on:keyup={handleChange}
                    autocomplete="off"
                    name="name"
                    type="text"
                    class="w100 shade2"
                    placeholder="Phone Number"
                />
            </div>
        </div>
    </div>
</form>
