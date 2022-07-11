<template>
  <page-header>All Tasks</page-header>

  <div class="mb-3">
    <base-button @click="filterCompleted">{{ filterCompletedText }}</base-button>

    <p class="mt-5 font-bold">Filter by importance: </p>

    <div class="flex mb-5">
      <input type="checkbox" id="showHigh" value="high" v-model="importance" />
      <label class="ml-1" for="showHigh">High</label>

      <input class="ml-5" type="checkbox" value="medium" id="showMedium" v-model="importance" />
      <label class="ml-1" for="showMedium">Medium</label>

      <input class="ml-5"  type="checkbox" value="small" id="showSmall" v-model="importance" />
      <label class="ml-1" for="showSmall">Small</label>
    </div>

  </div>
  
  <div v-for="task in tasks" :key="task.id">
    <div :class="getTaskClasses(task.importance)">
      <div class="flex-none">
        <input type="checkbox" id="complete" name="complete" :checked="task.isCompleted" @change="changeTaskState($event, task)"/>
      </div>
      <div :class="{'text-sm': true, 'flex-auto': true, 'w-62' : true, 'ml-3': true, 'task-completed': task.isCompleted}">
        <p class="font-bold text-black border-hi">{{ task.title }}</p>
        <p class="font-normal text-black">{{ task.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();
    const allTasks = ref([]);
    const filterCompleted = ref(false);

    const importance = ref([]);

    const loadTasks = () => {

      $store.dispatch('tasks/loadTasks').then( () => {
          allTasks.value = $store.getters["tasks/getTasks"];
      })

    }

    loadTasks();

    const tasks = computed( () => {
      let finalTasks = allTasks.value;

      if (filterCompleted.value){
        finalTasks = finalTasks.filter(t => t.isCompleted);
      }

      finalTasks = finalTasks.filter( t => {
        if (importance.value.length === 0){
          return true;
        }

        let includeSmall = false, includeMedium = false, includeHigh = false;

        if (importance.value.includes('small') && t.importance === 'small'){
            includeSmall = true;
        } 

        if (importance.value.includes('medium') && t.importance === 'medium'){
             includeMedium = true;
        } 

        if (importance.value.includes('high') && t.importance === 'high'){
            includeHigh = true;
        }
        
        return includeSmall || includeMedium || includeHigh;
      });

      return finalTasks;
    });

    const filterCompletedText = computed( () => {
      if (filterCompleted.value){
        return 'Show All Tasks'
      }

      return 'Show Completed';
    });

    return {
      allTasks,
      tasks,
      filterCompletedText,

      importance,

      filterCompleted(){
        filterCompleted.value = ! filterCompleted.value;
      },

      getTaskClasses(importance) {
        return {
          "flex": true,
          "border-2": true,
          "text-xl": true,
          "mb-5": true,
          "p-5": true,
          "high-importance": importance === "high",
          "medium-importance": importance === "medium",
          "small-importance": importance === "small",
        };
      },

      changeTaskState(e, task){

        let newTask = {...task, isCompleted: ! task.isCompleted};

        $store.dispatch('tasks/changeTaskState', newTask).then( () => {
            allTasks.value = $store.getters["tasks/getTasks"];
        });

      }
    };
  },
};
</script>

<style scoped>

.task-completed{
     text-decoration: line-through;
}

.high-importance {
  border-color: #c80a0a;
}

.medium-importance {
  border-color: #e8e035;
}

.small-importance {
  border-color: #128635
}
</style>
