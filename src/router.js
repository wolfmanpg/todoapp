import { createRouter, createWebHistory } from 'vue-router';

import AddTask from './components/AddTask.vue';
import AllTasks from './components/AllTasks.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: 'add-task' },
    { path: '/add-task', component: AddTask },
    { path: '/tasks', component: AllTasks },
  ]
});

export default router;