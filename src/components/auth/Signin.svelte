<script>
    import Button from "comp/atoms/Button.svelte";
    import Field from "comp/atoms/TextField.svelte";
    import {WEBPACK_URL} from "../../config"

    let username = "";
    let password = "";
    let email = "";

    async function handleOnSubmit() {
        let data = { username, password, email };
        let req = await fetch(`http://${WEBPACK_URL}/api/register`, {
            method: 'POST',
            body: JSON.stringify({data})
        });

        if (req.ok) {
            console.log(await req.json())
        }

        return {
            status: req.status,
        };
    }

</script>

<div class="grow align-center a ">
    <form
        on:submit|preventDefault={handleOnSubmit}
        class="gap-40 col w-sm bg shade2 justify-center pa-60 curve"
    >
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
        <Button text="CREATE ACCOUNT"  />
    </form>
</div>

<style>
    .a {
        z-index: 2;
    }

    .bg {
        background: rgba(211, 218, 211, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(135, 109, 109, 0.3);
    }
</style>
