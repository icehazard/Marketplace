<script>
    import Settings from "#/toolbars/categories/Settings.svelte";
    import PendingShops from "#/admin/PendingShops.svelte";
    import admin from '@/store/admin'

    admin.get()
</script>

<section class="row container my-50 gap-50 grow">
    <Settings />
    <PendingShops />
</section>
