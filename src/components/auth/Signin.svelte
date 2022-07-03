<script>
    import Button from "comp/atoms/Button.svelte";
    import Field from "comp/atoms/TextField.svelte";
    import { push } from "svelte-spa-router";
    import { WEBPACK_URL } from "../../config";
    import user from "@/store/user.js";

    let username = "";
    let password = "";
    let email = "";
    let message = "";

    async function handleOnSubmit() {
        if (validate()) return;
        let data = { username, password, email };
        let res = await fetch(`http://${WEBPACK_URL}/api/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        res = await res.json();
        
        if (res.resp == "success") {
            user.get();
            $user.username = res.username;
            $user.token = res.token;
            push("#/");
        } else {
            message = "Account already Exists";
        }
    }
    function validate() {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let msg1 = "Username needs to be at least 3 characters long";
        let msg2 = "Password needs to be at least 8 characters long";
        let msg3 = "Email must be of correct format";
        let msg4 = "Email needs to be at least 3 characters long";
        if (email.length < 3) return (message = msg4);
        if (!mailformat.test(email)) return (message = msg3);
        if (username.length < 3) return (message = msg1);
        if (password.length < 8) return (message = msg2);
        return false;
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
            <span class="red--text">{message}</span>
            <Field bind:value={email} label="Email" />
            <Field bind:value={username} label="Username" />
            <Field bind:value={password} label="Password" />
        </section>
        <Button type='submit' text="CREATE ACCOUNT" />
    </form>
</div>

<style>
    @media only screen and (max-width: 576px) {
        form {
            padding: 50px 15px;
        }
    }
</style>
