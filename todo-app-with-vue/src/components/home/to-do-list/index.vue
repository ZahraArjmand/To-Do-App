<template>
  <v-container class="py-8">
    <v-card elevation="2">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Your Todos</span>

        <div class="d-flex flex-wrap ga-2">
          <v-btn color="primary" to="/create" tag="router-link"
            >+ Add Todo</v-btn
          >
          <v-btn color="error" @click="clearCompleted">Delete Completed</v-btn>
        </div>
      </v-card-title>

      <v-card-subtitle class="d-flex flex-wrap ga-2 mb-2">
        <v-btn
          :variant="filterStatusState === 'all' ? 'elevated' : 'outlined'"
          @click="setFilter('all')"
          >All</v-btn
        >
        <v-btn
          :variant="filterStatusState === 'active' ? 'elevated' : 'outlined'"
          @click="setFilter('active')"
          >Active</v-btn
        >
        <v-btn
          :variant="filterStatusState === 'completed' ? 'elevated' : 'outlined'"
          @click="setFilter('completed')"
          >Completed</v-btn
        >
      </v-card-subtitle>
      <v-divider />

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="filteredTodos"
          item-value="id"
          class="elevation-1"
          :items-per-page="5"
        >
          <template #item.createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>

          <template #item.completed="{ item }">
            <v-chip :color="item.completed ? 'green' : 'grey'" size="small">
              {{ item.completed ? "Completed" : "Active" }}
            </v-chip>
          </template>

          <template #item.actions="{ item }">
            <div class="d-flex ga-2">
              <v-btn
                :icon="
                  item.completed
                    ? 'mdi-checkbox-marked'
                    : 'mdi-checkbox-blank-outline'
                "
                @click="toggleComplete(item.id)"
                :title="'Toggle Status'"
              >
              </v-btn>

              <v-btn
                icon="mdi-pencil"
                color="primary"
                :to="`/edit/${item.id}`"
                :title="'Edit'"
              >
              </v-btn>

              <v-btn icon="mdi-delete" color="red" @click="deleteTodo(item.id)">
              </v-btn>
            </div>
          </template>
        </v-data-table>

        <v-alert v-if="todos.length === 0" type="info" class="mt-4">
          You don't have any todos yet. Click "Add Todo" to get started!
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useTodos } from "@/composables/useToDo";
import { Todo } from "@/composables/useToDo";
import { computed } from "vue";
import { ref } from "vue";
const {
  todos,
  deleteTodo,
  toggleComplete,
  clearCompleted,
  filteredTodos,
  setFilter,
  getFilterValue,
} = useTodos();

const headers = computed(() => [
  { title: "Title", key: "title" },
  { title: "Description", key: "description" },
  { title: "Created At", key: "createdAt" },
  { title: "Status", key: "completed" },
  { title: "Actions", key: "actions", sortable: false },
]);
const filterStatusState = computed(() => {
  return getFilterValue();
});

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>
