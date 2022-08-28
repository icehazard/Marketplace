<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let toggle = false;

    function fire() {
        dispatch("toggle");
    }
</script>

<label class="switch">
    <input bind:checked={toggle} type="checkbox" on:click={fire} />
    <span class="slider round" />
</label>

<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--shade4);
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 30px;
        width: 30px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: var(--primary);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px var(--primary);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>
