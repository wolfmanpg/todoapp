import { createStore } from 'vuex';

import tasksModule from './modules/tasks/index.js';

const store = createStore({
  modules: {
    tasks: tasksModule,
  },
});

export default store;