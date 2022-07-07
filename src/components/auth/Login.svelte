<script>
    import Button from "comp/atoms/Button.svelte";
    import Field from "comp/atoms/TextField.svelte";
    import { push } from "svelte-spa-router";
    import user from "@/store/user.js";
    import { post } from "@/assets/library/CommonFunctions.js";

    let username = "";
    let password = "";
    let message = "";

    async function handleOnSubmit() {
        if (validate()) return;
        let data = { username, password };
        let res = await post('api/login', data)
        if (!res.error) {
            $user.username = res.username;
            $user.token = res.token;
            await user.get();
            push("#/");
        } else {
            message = "Account/password not found";
        }
    }

    function validate() {
        let msg1 = "Username needs to be at least 3 characters long";
        let msg2 = "Password needs to be at least 8 characters long";
        if (username.length < 3) return (message = msg1);
        if (password.length < 8) return (message = msg2);
        return false;
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
            <span class="red--text">{message}</span>
            <Field bind:value={username} label="Username" />
            <Field bind:value={password} label="Password" />
        </section>
        <Button type="submit" text="ENTER ACCOUNT" />
    </form>
</div>

<style>
    @media only screen and (max-width: 576px) {
        form {
            padding: 50px 15px;
        }
    }
</style>
