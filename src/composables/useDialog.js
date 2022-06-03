import { computed, onMounted, reactive, ref } from "vue";
import { DATA_ATTR } from "../constants";

const DIALOG_STATUS_OPEN = "open";
const DIALOG_STATUS_CLOSED = "closed";

const state = reactive({
  dialogs: [],
});

const generateDialogId = () => {
  return (
    new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
  );
};

const addDialog = (name) => {
  if (state.dialogs.some((dialog) => dialog.name === name)) {
    return;
  }

  state.dialogs.push({
    name,
    status: DIALOG_STATUS_CLOSED,
  });
};

const setDialogStatus = (name, status) => {
  const dialogItem = state.dialogs.find((dialog) => dialog.name === name);

  if (!dialogItem) {
    return;
  }

  dialogItem.status = status;
};

const getDialogElement = (id) => {
  return document.querySelector(`[${DATA_ATTR}="${id}"]`);
};

export const useDialog = (name) => {
  const dialogName = ref(name || generateDialogId());
  const dialog = ref(null);
  const currentDialogItem = computed(() => {
    return state.dialogs.find((dialog) => dialog.name === dialogName.value);
  });
  const isDialogOpen = computed(() => {
    return (
      currentDialogItem.value &&
      currentDialogItem.value.status === DIALOG_STATUS_OPEN
    );
  });

  addDialog(dialogName.value);

  onMounted(() => {
    dialog.value = getDialogElement(dialogName.value);

    dialog.value.addEventListener("close", () => {
      setDialogStatus(dialogName.value, DIALOG_STATUS_CLOSED);
    });
  });

  const openDialog = () => {
    dialog.value.showModal();
    setDialogStatus(dialogName.value, DIALOG_STATUS_OPEN);
  };

  const closeDialog = () => {
    dialog.value.close();
  };

  return {
    dialogs: state.dialogs,
    isDialogOpen,
    dialogName,
    openDialog,
    closeDialog,
  };
};
