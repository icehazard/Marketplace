<script>
    import app from "@/store/app.js";
</script>

<div class="fixed green top opacity-75" class:w0={!$app.loading} class:w99={$app.loading} />

<style>
    .w99 {
        width: 99%;
        transition: all 1s ease;
    }

    .w0 {
        width: 0%;
    }

    div {
        background: repeating-linear-gradient(to right, var(--primary) 0%,#0cd164 50%, var(--primary) 100% ); 
        background-size: 200% auto;
        background-position: 0 100%;
        animation: gradient 1s infinite;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
        height: 2px;
        z-index: 6;
    }

    @keyframes gradient {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
</style>
