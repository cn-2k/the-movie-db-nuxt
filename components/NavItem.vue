<template>
  <nuxt-link :to="to" v-slot="{ isExactActive }">
    <div
      class="cursor-pointer rounded-md bg-[#f2f2f2] px-3 py-2 font-bold tracking-wide text-slate-700 shadow-sm hover:bg-[#ebedef]"
      :class="{ 'router-link-exact-active': isExactActive }"
    >
      <slot></slot>
      <slot name="favorites"></slot>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{
  to?: any;
}>();
</script>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply rounded-md bg-sky-500 text-white;
}
</style>
