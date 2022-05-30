<script setup>
import { useDialog } from "../composables/useDialog";
import DialogCloseIcon from "../DialogCloseIcon";
import { DATA_ATTR } from "../constants";

const props = defineProps({
  name: String,
  open: {
    type: Boolean,
    default: false,
  },
});

const { closeDialog } = useDialog(props.name);
</script>

<template>
  <dialog :open="open" v-bind="{ [DATA_ATTR]: name }" class="v-dialog-element">
    <header>
      <slot name="header" :close="closeDialog">
        <button class="v-dialog-element-button-close" @click="closeDialog">
          <slot name="close-icon">
            <DialogCloseIcon />
          </slot>
        </button>
      </slot>
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

.v-dialog-element-button-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
