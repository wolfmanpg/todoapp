<template>
    <nav class="flex justify-center bg-secondary p-4">
        <router-link to="add-task">
          <base-button>Add Task</base-button>
        </router-link>
        <router-link to="tasks" class="ml-10">
          <base-button>View All Tasks</base-button>
        </router-link>
    </nav>
</template>

<script>
export default {
};
</script>
