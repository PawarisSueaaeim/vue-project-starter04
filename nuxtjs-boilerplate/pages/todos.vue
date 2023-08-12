<template>
  <div>
    <h2>Todo List</h2>
    <input
      v-model="newTodo"
      placeholder="Add a new todo"
      @keyup.enter="addTodo"
    />
    <button @click="addTodoI()">Add</button>
    <ul>
      <li v-for="todo in getTodos" :key="todo.id">
        {{ todo.text }}
        <button @click="updateTodo(todo.id)">Toggle</button>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { v1 } from 'uuid'

export default {
  data() {
    return {
      newTodo: '',
    }
  },
  computed: {
    ...mapGetters({
      getTodos: 'todos/getTodos',
    }),
  },
  methods: {
    ...mapActions({
      addNewTodo: 'todos/addTodo',
      deleteTodo: 'todos/deleteTodo',
    }),
    addTodoI() {
      this.addNewTodo({
        id: v1(),
        text: this.newTodo,
      })
      this.newTodo = ''
    },
    toggleTodoStatus(todo) {
      const newStatus = todo.status === 'DO' ? 'UNDO' : 'DO'
      this.updateTodoStatus({ id: todo.id, newStatus })
    },
  },
}
</script>
