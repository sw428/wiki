<script setup>
import { onMounted, ref } from 'vue';
import { palettes, applyPalette, loadPalette, savePalette } from './palettes.mjs';

const selected = ref(palettes[0].id);

function storage() {
  try { return window.localStorage; }
  catch { return null; }
}

function select(id) {
  selected.value = applyPalette(document.documentElement, id);
  savePalette(storage(), selected.value);
}

onMounted(() => {
  selected.value = applyPalette(document.documentElement, loadPalette(storage()));
});
</script>

<template>
  <div class="palette" role="group" aria-label="配色を選ぶ">
    <button
      v-for="palette in palettes"
      :key="palette.id"
      type="button"
      class="swatch"
      :style="{ '--swatch-color': palette.swatch || palette.light[1] }"
      :aria-label="`${palette.label}の配色`"
      :title="`${palette.label}の配色`"
      :aria-pressed="selected === palette.id"
      @click="select(palette.id)"
    >
      <span class="color" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.palette {
  display: grid;
  grid-template-columns: repeat(4, 24px);
  align-items: center;
  gap: 2px 4px;
  margin-left: 12px;
  padding-left: 12px;
  border-left: 1px solid var(--vp-c-divider);
}

.swatch {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 5px;
  cursor: pointer;
}

.color {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--swatch-color);
}

.swatch[aria-pressed="true"] .color {
  outline: 2px solid var(--vp-c-text-1);
  outline-offset: 3px;
}

.swatch:hover {
  background: var(--vp-c-default-soft);
}

.swatch:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

@media (max-width: 767px) {
  .palette {
    gap: 0;
    margin-left: 0;
    padding-left: 4px;
  }

  .color {
    width: 12px;
    height: 12px;
  }
}
</style>
