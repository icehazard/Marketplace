<script>
    import { fade } from "svelte/transition";
</script>

<div class="col absolute shade1 w-400 shadow border curve" transition:fade={{ duration: 100 }}>
    <div class="row pa-20 center shade3">Notifications</div>
    <button class="row pa-20 gap-20 align-center shine">
        <div class="round shade4 w-50 h-50" />
        <div class="col gap-10 grow ">
            <span>Trade alert</span>
            <span>4 seconds ago</span>
        </div>
        <div class="col center ml-auto ">
            <div class="pa-4 round primary" />
        </div>
    </button>
    <hr />
    <button class="row pa-20 gap-20 align-center shine">
        <div class="round shade4 w-50 h-50" />
        <div class="col gap-10 grow">
            <span>Trade alert</span>
            <span>14 minutes ago</span>
        </div>
        <div class="col center ml-auto">
            <div class="pa-4 round primary" />
        </div>
    </button>
    <hr />
    <button class="row pa-20 gap-20 align-center shine">
        <div class="round shade4 w-50 h-50" />
        <div class="col gap-10 grow">
            <span>Trade alert</span>
            <span>1 hours ago</span>
        </div>
    </button>
</div>

<style>
    .w-400 {
        min-width: 400px;
    }
</style>
