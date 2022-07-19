<script>
    export let item;
</script>

<div class="row pa-20 " class:justify-end={item.sender}>
    <div class="col gap-10" class:align-end={item.sender}>
        <div
            class="pa-20 curve"
            class:primary={!item.sender}
            class:shade3={item.sender}
        >
            {item.text}
        </div>
        <span class="font-14">{item.time}</span>
    </div>
</div>
