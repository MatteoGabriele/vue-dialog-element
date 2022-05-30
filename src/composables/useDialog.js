import { onMounted, reactive, ref } from "vue";
import { DATA_ATTR } from "../constants";

const state = reactive({
  dialogs: [],
});

const generateDialogId = () => {
  return (
    new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
  );
};

const addDialog = (name) => {
  if (state.dialogs.includes(name)) {
    return;
  }

  state.dialogs.push(name);
};

const getDialogElement = (id) => {
  return document.querySelector(`[${DATA_ATTR}="${id}"]`);
};

export const useDialog = (name) => {
  const dialogId = name || generateDialogId();
  const isDialogOpen = ref(false);
  const dialog = ref(null);

  addDialog(dialogId);

  onMounted(() => {
    dialog.value = getDialogElement(dialogId);

    dialog.value.addEventListener("close", () => {
      isDialogOpen.value = false;
    });
  });

  const openDialog = () => {
    dialog.value.showModal();
    isDialogOpen.value = true;
  };

  const closeDialog = () => {
    dialog.value.close();
  };

  return {
    isDialogOpen,
    dialogId,
    openDialog,
    closeDialog,
  };
};
