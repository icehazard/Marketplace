<script>
    import Button from "comp/atoms/Button.svelte";
    import Field from "comp/atoms/TextField.svelte";

    let email = "";
    let password = "";

    async function handleOnSubmit() {
        let data = { email, password };
        let res = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            body: JSON.stringify({ data }),
        });
    }
</script>

<div class="grow align-center z-2">
    <form on:submit|preventDefault={handleOnSubmit} class="gap-40 col w-sm pa-60 curve glass">
        <section class="gap-20 col  ">
            <div class="weight-600 font-14">START FOR FREE</div>
            <div class="font-36">Create new account</div>
            <div class="row gap-10">
                <span>Already A Member?</span>
                <a href="#/login" class="primary--text"> Login</a>
            </div>
        </section>
        <section class="col gap-20">
            <Field bind:value={email} label="Email" />
            <Field bind:value={password} label="Password" />
        </section>
        <Button text="CREATE ACCOUNT" />
    </form>
</div>

<style>

    @media only screen and (max-width: 576px) {
        form {
            padding: 50px 15px;
        }
    }
</style>
