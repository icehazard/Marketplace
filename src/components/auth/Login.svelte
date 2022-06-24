<script>
    import Button from "comp/atoms/Button.svelte";
    import Field from "comp/atoms/TextField.svelte";
    import {WEBPACK_URL} from "../../config"

    let username = "";
    let password = "";

    async function handleOnSubmit() {
        let data = { username, password };

        console.log("Logging in with ", username, password)
        let req = await fetch(`http://${WEBPACK_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // returns {error: "desc"} and status 400 on error

        if (req.ok) {
            console.log(await req.json())
        }

        return {
            status: req.status,
        };
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
            <Field bind:value={username} label="Username" />
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
