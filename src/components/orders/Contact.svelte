<script>
    export let order = {}
</script>


<button class="row w100 align-center border py-20 curve shine shadow">
    <div class="pa-20">
        <div class="round primary pa-30" />
    </div>
    <div class="col grow justify-center gap-15 pr-20">
        <span>Amnesia Haze</span>
        <span>{order._id}</span>
        <span>{order.address}</span>
        <span>{order.total}</span>
    </div>
</button>

