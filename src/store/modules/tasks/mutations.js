export default {
  setTasks(state, tasks) {
    state.tasks = tasks;
  },
  saveNewTask(state, task) {
    state.tasks.push(task);
  },
  setShouldLoadTasks(state, shouldLoad) {
    state.shouldLoadTasks = shouldLoad;
  },
  setTaskState(state, task){

    state.tasks = state.tasks.map(el => {
      if (el.id === task.id){
        return task;
      }

      return el;
    });

  }
};