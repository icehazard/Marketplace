<script>
    import Button from "comp/atoms/Button.svelte";
    import Field from "comp/atoms/TextField.svelte";
    import {API_URL} from "../../config"

    let email = "";
    let password = "";

    async function handleOnSubmit() {
        let data = { email, password };
        let req = await fetch(`http://${API_URL}/api/login`, {
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

<div class="grow center ">
    <form on:submit|preventDefault={handleOnSubmit} class="gap-20 col">
        <div class="center font-36">Login</div>
        <Field bind:value={email} label="Email" />
        <Field bind:value={password} label="Password" />
        <Button text="SUBMIT" />
    </form>
</div>
