<script>
    import generatePayload from "promptpay-qr";
    import QRCode from "qrcode";
    import { onMount } from "svelte";

    const mobileNumber = "000-000-0000";
    const amount = 4.2;
    let el;

    function generateQr() {
        const payload = generatePayload(mobileNumber, { amount });
        QRCode.toCanvas(el, payload);
    }

    onMount(() => {
        generateQr();
    });
</script>

<div class="container py-50">
    <canvas bind:this={el}></canvas>
</div>
