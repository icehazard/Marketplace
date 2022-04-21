<script>
    import Icon from "@iconify/svelte";
</script>

<div class="border gap-10 w-400 curve align-center px-20 h-40 mobile-w100">
    <Icon icon="mdi-light:magnify" class='font-22'/>
    <input type="text" class="w100"  placeholder="Search for anything"  />
</div>

<style>

	@media only screen and (max-width: 1006px) {
    .mobile-w100 {
		width: 100%;
       
    }
}
</style>
