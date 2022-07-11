import axios from "axios";

const url =
  "https://todoapp-115b9-default-rtdb.europe-west1.firebasedatabase.app/tasks";

export default {
  async loadTasks(context){
    console.log('context.gettters.getShouldLoadTasks : ' + context.getters.getShouldLoadTasks);
    if (! context.getters.getShouldLoadTasks){
      return;
    } 

    await axios
      .get(url + '.json')
      .then((response) => {
        let data = response.data, tasks = [];

        for (const key in data){
          tasks.push({
            id: key,
            title: data[key].title,
            description: data[key].description,
            importance: data[key].importance,
            isCompleted: data[key].isCompleted,
          });
        }

        context.commit('setTasks', tasks);
        context.commit('setShouldLoadTasks', false);
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
      });

  },
  async saveNewTask(context, task) {

    await axios
      .post(url + '.json', JSON.stringify(task))
      .then((response) => {

        console.log(response);

        context.commit('saveNewTask', {
          ...task,
          id: response.data.name
        });

        context.commit('setShouldLoadTasks', false);
      })
      .catch((errorResponse) => {
        console.log(errorResponse);
      });
  },
  async changeTaskState(context, task){

    context.commit('setTaskState', task);
    
    // let updatedTask = {
    //   title: task.title,
    //   description: task.description,
    //   importance: task.importance,
    //   isCompleted: task.isCompleted,
    // };

    // await axios
    // .post(url + '/' + task.id + '.json', JSON.stringify(updatedTask))
    // .then(() => {
      
    //   context.commit('setTaskState', task);
    
    // })
    // .catch((errorResponse) => {
    //   console.log(errorResponse);
    // });

  },
};
