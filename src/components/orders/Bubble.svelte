<script>
    export let item;
    import dayjs from 'dayjs'
    import user from '@/store/user'
    
    let me = item.senderId == $user._id
</script>

<div class="row pa-20 " class:justify-end={me}>
    <div class="col gap-10" class:align-end={me}>
        <div
            class="pa-20 curve"
            class:primary={!me}
            class:shade3={me}
        >
            {item.msg}
        </div>
        <span class="font-14">{dayjs(item.time).format("HH:mm")}</span>
    </div>
</div>
