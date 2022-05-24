<script setup>
import { ref } from "vue";

const props = defineProps({
  name: String,
});

const dialog = ref(null);

const close = () => {
  dialog.value.close();
};
</script>

<template>
  <dialog
    :data-v-dialog-element-id="name"
    class="v-dialog-element"
    ref="dialog"
  >
    <header>
      <button @click="close">close me</button>
    </header>
    <slot />
  </dialog>
</template>

<style>
.v-dialog-element {
  max-width: 800px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
