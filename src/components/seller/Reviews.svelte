<script>
    import TextArea from "./../atoms/TextArea.svelte";
    import Button from "./../atoms/Button.svelte";
    import Icon from "@iconify/svelte";
    import Rating from "comp/atoms/Rating.svelte";

    let review = "";
    let disableReview = false;
    let msg1 = 'Only verified buyers can leave reviews';
    let msg2 = "Write a review"

    function post() {
        console.log(review);
    }
</script>

<div class="shade1 pa-50 curve col gap-20 ">
    <div class="opacity-75 row align-center gap-10">
        <Icon icon="ic:baseline-reviews" />
        <div>Reviews</div>
    </div>
    <form on:submit|preventDefault={post} class="row mb-50 align-start gap-50">
        <TextArea bind:value={review} disable={disableReview} label={disableReview ? msg1 : msg2} />
        <Button type="submit" disable={disableReview} text="SUBMIT REVIEW" />
    </form>
    <div class="col gap-10">
        <div class="row gap-10 font-14">
            <span class="ellipsis basis font-16"> Great value. </span>
        </div>
        <div class="row font-14 gap-10">
            <Rating rating={5} />
            ○
            <span>Reviewed on 21 May 2021</span>
        </div>
        <p class="row font-14 opacity-75">
            Sometimes you buy something that surprises. This was one of them. Having compared to
            other similar products, price and power. This seemed to be the best value. Also read on
            of the vine review that he managed to fit a garden shed using this little power tool. I
            have to agree, it is a great electric screwdriver. I used it mainly around the kitchen
            and bedroom. Used it to tighten screws and fit new hinges.
        </p>
    </div>
    <hr />
    <div class="col gap-10">
        <div class="row gap-10 font-14">
            <span class="ellipsis basis  font-16"> A failure of a device</span>
        </div>
        <div class="row">
            <div class="row font-14 gap-10">
                <Rating rating={3} />
                ○
                <span>Reviewed on 21 May 2021</span>
            </div>
        </div>
        <p class="row font-14 opacity-75">
            Unfortunately, even at the discounted price of £22 I've had to send this device back. As
            you can see from a few other reviews, some screwdrivers do not have magnets which makes
            them completely useless as the bits fall out. Forget about screwing anything in a
            downwards position with ease.
        </p>
    </div>
</div>
