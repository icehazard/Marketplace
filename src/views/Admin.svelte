<script>
    import Settings from "comp/toolbars/categories/Settings.svelte";
    import PendingShops from "comp/admin/PendingShops.svelte";
    import admin from '@/store/admin'

    admin.get()
</script>

<section class="row container my-50 gap-50 grow">
    <Settings />
    <PendingShops />
</section>
