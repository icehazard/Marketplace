<script>
	import GetPaid from './GetPaid.svelte';
	import Address from './Address.svelte';
	import PersonalInfo from './PersonalInfo.svelte';
	import ShopName from './ShopName.svelte';

    import Icon from "@iconify/svelte";
    import Button from "comp/atoms/Button.svelte";

    let active = 1;

    let headings = [
        { text: "Name your shop" },
        { text: "Personal" },
        { text: "Address" },
        { text: "Options" },
        { text: "Confirmation" },
    ];

    function jumpTo(val) {
        if (val >= active) return;
        active = val;
    }
    function next() {
        active++;
    }
</script>

<section class="grow col gap-40">
    <div class="row shade1 space-btween pa-20 align-center gap-10">
        {#each headings as heading, index}
            <button on:click={() => jumpTo(index)} class="center gap-10">
                <div class="center pa-4 primary round" class:shade4={index > active}>
                    {#if active > index}
                        <Icon icon="fluent:checkmark-16-regular" color="white" />
                    {:else}
                        <div class="w-16 center font-14 weight-300">{index + 1}</div>
                    {/if}
                </div>
                <span class:shade5--text={index !== active}>{heading.text}</span>
            </button>
            {#if index < headings.length - 1}
                <hr class="grow border" />
            {/if}
        {/each}
    </div>
    <div class="grow">
        {#if active == 0}
             <ShopName />
        {:else if  active == 1}
          <PersonalInfo />
        {:else if active == 2}
            <Address />
            {:else if active == 3}
            <GetPaid />
        {/if}
    </div>
    <div class="justify-end row w100">
        <Button on:click={next} text="CONTINUE" />
    </div>
</section>
