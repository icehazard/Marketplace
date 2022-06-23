<script>
    import Button from "comp/atoms/Button.svelte";
    import Field from "comp/atoms/TextField.svelte";

    let email = "";
    let password = "";

    async function handleOnSubmit() {
        let data = { email, password };
        let res = await fetch("http://localhost:3000/api/signup", {
            method: 'POST',
            body: JSON.stringify({data})
        });
    }
</script>

<div class="grow center ">
    <form on:submit|preventDefault={handleOnSubmit} class="gap-20 col">
        <div class="center font-36">Signup</div>
        <Field bind:value={email} label="Email" />
        <Field bind:value={password} label="Password" />
        <Button text="SUBMIT" />
    </form>
</div>
