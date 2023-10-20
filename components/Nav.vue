<template>
  <nav
    class="top-0 z-50 flex items-center bg-slate-50/90 px-4 py-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 backdrop-blur-sm sm:px-6 lg:px-4 xl:px-6"
  >
    <ul class="flex space-x-3">
      <slot name="menu"></slot>
    </ul>
    <slot></slot>
  </nav>
</template>
