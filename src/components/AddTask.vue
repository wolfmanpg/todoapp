<template>
  <div class="w-full">
    <page-header>Add New Task</page-header>

    <div class="flex flex-col">
      <input
        class="w-full border-2 p-3 font-normal text-md lg:text-xl mb-5"
        placeholder="Task Name.."
        type="text"
        name="title"
        id="title"
        v-model="title"
      />

      <textarea
        class="w-full border-2 p-3 font-normal text-md lg:text-xl mb-5"
        placeholder="Task Description.."
        type="description"
        name="description"
        id="description"
        v-model="description"
        rows="5"
        cols="5"
      />

      <div class="mb-5">
        <p class="text-primary font-semibold mb-2">Importance :</p>
        <input type="radio" v-model="importance" value="high" /> High
        <input type="radio" class="ml-5" v-model="importance" value="medium" />
        Medium
        <input type="radio" class="ml-5" v-model="importance" value="small" />
        Small
      </div>

      <base-button @click="addTask">Add</base-button>

      <Transition name="fade">
        <div
          v-if="successMessage !== '' || errorMessage !== ''"
          :class="messageClassObject"
        >
          <p>{{ successMessage !== "" ? successMessage : errorMessage }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  emits: ["saveTask"],

  setup() {
    const $store = useStore();

    const title = ref("");
    const description = ref("");
    const importance = ref("");

    const successMessage = ref("");
    const errorMessage = ref("");

    const messageClassObject = computed(() => {
      return {
        "border-2": true,
        "text-xl": true,
        "mt-3": true,
        "p-5": true,
        "text-white": true,
        "success-message": successMessage.value !== "",
        "error-message": errorMessage.value !== "",
      };
    });

    return {
      title,
      description,
      importance,
      successMessage,
      errorMessage,
      messageClassObject,

      addTask() {
        $store
          .dispatch("tasks/saveNewTask", {
            title: title.value,
            description: description.value,
            importance: importance.value,
            isCompleted: false
          })
          .then(() => {
            title.value = "";
            description.value = "";
            importance.value = false;

            successMessage.value = "Task has been added successfully!";

            setTimeout( () => {
              successMessage.value = '';
            }, 4000);
          })
          .catch((error) => {
            errorMessage.value = error;

            setTimeout(() => {
              errorMessage.value = "";
            }, 3000);
          });
      },
    };
  },
};
</script>

<style>
.success-message {
  background-color: green;
  border-color: white;
}

.error-message {
  color: red;
  border-color: red;
}

.fade-enter-active {
  transition: opacity 1s ease-in;
}

.fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
