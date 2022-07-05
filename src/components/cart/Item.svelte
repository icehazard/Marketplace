<script>
    export let data = [];
    import cart from "@/store/cart.js";
    import { formatCurrency } from "@/assets/library/CommonFunctions.js";

    function remove() {
        cart.removeFromCart(data);
    }
</script>

<div class="row shade1 curve wrapper">
    <img src={data.imageURL} alt="" />
    <div class="row pa-20 grow gap-50">
        <div class="col grow description gap-10">
            <div class="weight-600 font-18">{data.name}</div>
           <div> {data.desc}</div>
        </div>
        <div class="col space-between">
            <div class="row gap-10">
                <label for="cars">Quantaty:</label>
                <select name="cars" class="px-10" id="fd">
                    <option value="volvo">1</option>
                    <option value="saab">2</option>
                    <option value="mercedes">3</option>
                    <option value="audi">4</option>
                </select>
            </div>
            <button on:click={remove} class="font-14 weight-600">Remove</button>
        </div>
        <div class="col space-between">
            <span>{formatCurrency(data.price)}</span>
            <span class="font-14 weight-600">Save for later</span>
        </div>
    </div>
</div>

<style>
    img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
    }

    .wrapper {
        max-height: 200px;
    }

    .description {
        overflow: hidden;
    }
</style>
