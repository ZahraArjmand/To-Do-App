import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/index.vue";
import TodoPage from "@/views/ToDoFormPage/index.vue";
import NotFound from "@/views/NotFound/index.vue";
import { useTodos } from "@/composables/useToDo";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/home", redirect: "/" },
  { path: "/create", name: "CreateTodo", component: TodoPage },
  {
    path: "/edit/:id",
    component: TodoPage,
    props: true,
    beforeEnter: (to, from, next) => {
      const { getTodoById } = useTodos();
      const todo = getTodoById(to.params.id);
      if (todo) {
        next();
      } else {
        next("/notfound");
      }
    },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
