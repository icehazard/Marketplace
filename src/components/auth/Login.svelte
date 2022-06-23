<script>
    import Button from "comp/atoms/Button.svelte";
    import Field from "comp/atoms/TextField.svelte";

    let email = "";
    let password = "";

    async function handleOnSubmit() {
        let data = { email, password };
        let res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: JSON.stringify({ data }),
        });
    }
</script>

<div class="grow align-center z-2">
    <form on:submit|preventDefault={handleOnSubmit} class="gap-40 col w-sm pa-60 curve glass">
        <section class="gap-20 col ">
            <div class="font-36">Enter your account</div>
            <div class="row gap-10">
                <span>Don't Have An Account?</span>
                <a href="#/signup" class="primary--text">Sign up</a>
            </div>
        </section>
        <section class="col gap-20">
            <Field bind:value={email} label="Email" />
            <Field bind:value={password} label="Password" />
        </section>
        <Button text="ENTER ACCOUNT" />
    </form>
</div>

<style>

    @media only screen and (max-width: 576px) {
        form {
            padding: 50px 15px;
        }
    }
</style>
