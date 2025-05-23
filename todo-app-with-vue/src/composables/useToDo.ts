import { ref, computed } from "vue";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

const todos = ref<Todo[]>(loadTodos());

function loadTodos(): Todo[] {
  try {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveTodos(): void {
  localStorage.setItem("todos", JSON.stringify(todos.value));
}
function addTodo(todo: Omit<Todo, "id" | "createdAt">): void {
  todos.value.push({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...todo,
  });
  saveTodos();
}

function updateTodo(updated: Todo): void {
  const index = todos.value.findIndex((t) => t.id === updated.id);
  if (index !== -1) {
    todos.value[index] = {
      ...updated,
      createdAt: todos.value[index].createdAt,
    };
    saveTodos();
  }
}

function deleteTodo(id: number): void {
  todos.value = todos.value.filter((t) => t.id !== id);
  saveTodos();
}

function toggleComplete(id: number): void {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }
}

function getTodoById(id: string | number): Todo | undefined {
  const numericId = typeof id === "string" ? parseInt(id) : id;
  return todos.value.find((t) => t.id === numericId);
}
function clearCompleted(): void {
  todos.value = todos.value.filter((t) => !t.completed);
  saveTodos();
}
const filter = ref<"all" | "completed" | "active">("all");

const filteredTodos = computed(() => {
  switch (filter.value) {
    case "completed":
      return todos.value.filter((t) => t.completed);
    case "active":
      return todos.value.filter((t) => !t.completed);
    default:
      return todos.value;
  }
});
function getFilterValue() {
  return filter.value;
}
function setFilter(type: "all" | "completed" | "active") {
  filter.value = type;
}

export function useTodos() {
  return {
    todos: computed(() => todos.value),
    filteredTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    getTodoById,
    clearCompleted,
    setFilter,
    getFilterValue,
  };
}
