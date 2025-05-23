<template>
  <v-container class="py-8" max-width="600px">
    <v-card elevation="2">
      <v-card-title class="text-h5">{{
        isEditMode ? "Edit Todo" : "Create Todo"
      }}</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form @submit.prevent="onSubmit" ref="formRef" v-model="isFormValid">
          <!-- Title Field -->
          <v-text-field
            v-model="todo.title"
            label="Todo Title"
            :rules="[rules.required]"
            required
            autofocus
          />

          <!-- Description Field -->
          <v-textarea
            v-model="todo.description"
            label="Description"
            :rules="[rules.required]"
            required
          />

          <!-- Completed toggle (edit mode only) -->
          <v-switch
            v-if="isEditMode"
            v-model="todo.completed"
            label="Completed?"
          />

          <v-btn
            type="submit"
            color="primary"
            :disabled="!isFormValid"
            class="mt-4"
          >
            {{ isEditMode ? "Update" : "Create" }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodos, Todo } from "@/composables/useToDo";

const route = useRoute();
const router = useRouter();
const { addTodo, updateTodo, getTodoById } = useTodos();

const isEditMode = computed(() => route.path.includes("/edit"));

const todo = reactive<Partial<Todo>>({
  title: "",
  description: "",
  completed: false,
});

onMounted(() => {
  if (isEditMode.value && route.params.id) {
    const existing = getTodoById(route.params.id);
    if (existing) Object.assign(todo, existing);
  }
});

const formRef = ref();
const isFormValid = ref(false);
const rules = {
  required: (v: string) => !!v || "This field is required",
};

function onSubmit() {
  if (isEditMode.value && typeof route.params.id === "string") {
    updateTodo({
      ...(todo as Todo),
      id: parseInt(route.params.id),
    });
  } else {
    addTodo({
      title: todo.title ?? "",
      description: todo.description ?? "",
      completed: false,
    });
  }

  router.push("/");
}
</script>
