<script>
    import Button from "comp/atoms/Button.svelte";
    import Field from "comp/atoms/TextField.svelte";
    import { push } from "svelte-spa-router";
    import {WEBPACK_URL} from "../../config"
    import { username_, token_ } from "@/store/user.js";

    let username = "";
    let password = "";
    let email = "";
   

    async function handleOnSubmit() {
        let data = { username, password, email };
        let res = await fetch(`http://${WEBPACK_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        res = await res.json()



       if ( res.resp = "success"){
        username_.set(res.username)
        token_.set(res.token)
        push('#/')
       }
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
            <Field bind:value={username} label="Username" />
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
