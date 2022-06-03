<script setup>
import { useDialog } from "../composables/useDialog";
import { DATA_ATTR } from "../constants";

const props = defineProps({
  name: {
    type: [String, Number],
    required: true,
  },
});

const { closeDialog, dialogName, isDialogOpen } = useDialog(props.name);
</script>

<template>
  <dialog v-bind="{ [DATA_ATTR]: dialogName }" class="v-dialog-element">
    <header>
      <slot name="header" :close="closeDialog">
        <button class="v-dialog-element-button-close" @click="closeDialog">
          <slot name="close-icon">&times;</slot>
        </button>
      </slot>
    </header>
    <slot v-if="isDialogOpen"></slot>
  </dialog>
</template>

<style>
.v-dialog-element {
  max-width: 1080px;
  width: calc(100vw - 20px);
  box-sizing: border-box;
  border: none;
}

.v-dialog-element-button-close {
  position: absolute;
  top: 0px;
  right: 0px;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  width: 22px;
  height: 22px;
  cursor: pointer;
  font-size: 22px;
  outline: none;
}
</style>
