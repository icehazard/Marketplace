<script>
    import Icon from "@iconify/svelte";
    import Field from "comp/atoms/TextField.svelte";
    import { mq } from "@/assets/library/MediaQuery.svelte";
</script>

<section class="grow col gap-20">
<h1 class="row pl-20 font-36 weight-300 align-center gap-20">
    <Icon icon="mdi:account-outline" width="30" />
    <span>ACCOUNT</span>
</h1>
<div class="grow col shade3 curve">
    <div class="w100 pa-20 gap-20 space-between shade3 col" class:row={$mq.sm_}>
        <div class="row align-center gap-20">
            <Icon icon="icon-park-outline:edit-name" width="30" />
            <div class="col gap-10">
                <span> Full Name</span>
                <span class="font-14 opacity-75">Your first and last names. </span>
            </div>
        </div>
        <div class="col">
            <Field label='Full Name'/>
        </div>
    </div>
    <hr />
    <div class="w100 pa-20 gap-20 space-between shade3 col" class:row={$mq.sm_}>
        <div class="row align-center gap-20">
            <Icon icon="ic:baseline-alternate-email" width="30" />
            <div class="col gap-10">
                <span>Email</span>
                <span class="font-14 opacity-75">Your login email</span>
            </div>
        </div>
        <div class="col">
            <Field label='Email'/>
        </div>
    </div>
    <hr />
    <div class="gap-20 col w100 pa-20 space-between shade3" class:row={$mq.sm_}>
        <div class="row align-center gap-20">
            <Icon icon="fluent:view-desktop-mobile-20-regular" width="30" />
            <div class="col gap-10">
                <span>Mobile Number</span>
                <span class="font-14 opacity-75">How can people contact you</span>
            </div>
        </div>
        <div class="col">
            <Field label='Mobile Number'/>
        </div>
    </div>
    <hr />
    <div class="gap-20 col w100 pa-20 space-between shade3" class:row={$mq.sm_}>
        <div class="row align-center gap-20">
            <Icon icon="fluent:lock-closed-12-regular" width="30" />
            <div class="col gap-10">
                <span>Current Password</span>
                <span class="font-14 opacity-75">Needed to change your password</span>
            </div>
        </div>
        <div class="col">
            <Field label='Current password'/>
        </div>
    </div>
    <hr />
    <div class="gap-20 col w100 pa-20 space-between shade3" class:row={$mq.sm_}>
        <div class="row align-center gap-20">
            <Icon icon="fluent:password-16-regular" width="30" />
            <div class="col gap-10">
                <span>New Password</span>
                <span class="font-14 opacity-75">Change your login password</span>
            </div>
        </div>
        <div class="col">
            <Field label='New password'/>
        </div>
    </div>
    <hr />
</div>
</section>

