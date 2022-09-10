<script>
  import orders from "@/store/orders";
  import dayjs from "dayjs";
  import pluralize from "pluralize";
  import { formatCurrency, tell, wait } from "@/assets/js/util";
  import { mq } from "@/assets/js/MediaQuery.svelte";
  import Icon from "@iconify/svelte";
  import user from "@/store/user";
  import Product from "./Product.svelte";
  import Button from "../atoms/Button.svelte";
  import generatePayload from "promptpay-qr";
  import QRCode from "qrcode";
  import { afterUpdate, onMount, tick } from "svelte";
  import { location } from "svelte-spa-router";

  let tab = 1;
  const mobileNumber = $user.cellNo; //needs shop mobile number to work
  const amount = 4.2;
  let el;
  let img = "https://www.designil.com/wp-content/uploads/2020/04/prompt-pay-logo.png";

  function generateQr() {
    const payload = generatePayload(mobileNumber, { amount });
    QRCode.toCanvas(el, payload);
  }
  async function switchTab(idx) {
    tab = idx;
  }
  async function paid() {
    let res = await orders.markAsPaid($orders.order._id);
    tell(res, "Marked as paid", "Server error");
    orders.get($orders.order._id);
  }

  afterUpdate(() => {
    if (tab === 0 && el) generateQr();
  });
</script>

<div class="col" class:none={$orders.order.paymentStatus}>
  <h2 class="row center pb-40 weight-300">Pick Payment Method</h2>
  <div class="row ">
    <button class="grow py-10 center slow" on:click={() => switchTab(0)} class:active={tab === 0}>
      Prompay QR
    </button>
    <button class="grow py-10 center slow" on:click={() => switchTab(1)} class:active={tab === 1}>
      Bank Transfer
    </button>
    <button disabled class="grow py-10 center slow" on:click={() => switchTab(2)} class:active={tab === 2}>
      Crypto
    </button>
  </div>
  <div class="tabs h-300 active pa-30">
    {#if tab === 0}
      <div class="">
        <div class="center">
          <div class="row w100 h-40">
            <span class="w100 ">Prompay QR code for payment</span>
            <img class="w-100 white" src={img} alt="" />
          </div>
          <div class="center pa-20">
            <canvas bind:this={el} />
          </div>
        </div>
      </div>
    {:else if tab === 1}
      <div class="col gap-50 align-center">
        <span>
          Please transfer {formatCurrency($orders.order.total)} amount to {$orders.order.shopName}
        </span>
        <div class="col gap-20">
          <div class="row  align-center">
            <span class="span  weight-600 font-14">Account Name </span>
            <span class=" font-18">THAI44432I5U444</span>
          </div>
          <div class="row  align-center">
            <span class="span weight-600 font-14">Account number </span>
            <div class="  font-18 nowrap">Sebastian Whitlock</div>
          </div>
        </div>
        <span>Once transfer is completed, mark order as paid.</span>
      </div>
    {:else if tab === 2}
      <span>div 3</span>
    {/if}
  </div>
  <div class="row pa-15 mt-10 space-between grow h100 align-center">
    <div class="col gap-7">
      <span>Mark as paid</span>
      <span class="font-12 opacity-75">
        When you have successfully paid the vender, mark the transaction as complete.
      </span>
    </div>
    <Button on:click={paid} primary text="Paid" />
  </div>
  <section class="row space-between align-center pa-15">
    <span class="font-14 opacity-75 align-center gap-10 blue--text">
      <Icon icon="fluent:info-20-regular" width="20" />
      <span>
        Please note that you will have to complete the transaction within 2 hours. Failure to pay
        will result in an automatic cancellation of your order.
      </span>
    </span>
  </section>
  <hr />
</div>

<style>
  .active {
    backdrop-filter: brightness(1.5);
  }

  h2 {
    letter-spacing: 2px;
  }

  .span {
    width: 150px;
  }

  button:disabled{
    cursor: not-allowed;
    filter:  brightness(0.25);
  }
</style>
