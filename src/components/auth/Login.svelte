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
        <Field bind:value={username} label="Username" />
        <Field bind:value={password} label="Password" />
        <Button text="SUBMIT" />
    </form>
</div>
