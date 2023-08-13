<template>
  <div>
    <h2>Todo List</h2>
    <input
      v-model="newTodo"
      placeholder="Add a new todo"
      @keyup.enter="addTodoI()"
    />
    <button @click="addTodoI()">Add</button>
    <ul>
      <li v-for="todo in getTodos" :key="todo.id">
        {{ todo.text }}
        <button @click="toggleTodoStatus(todo)">{{ todo.status }}</button>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { v1 } from 'uuid'
import { IStatus } from '~/store/todos'

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
      updateTodoStatus: 'todos/updateTodoStatus',
    }),
    addTodoI() {
      this.addNewTodo({
        status: IStatus.do,
        id: v1(),
        text: this.newTodo,
      })
      this.newTodo = ''
    },
    toggleTodoStatus(todo) {
      const newStatus = todo.status === 'DO' ? IStatus.undo : IStatus.do
      this.updateTodoStatus({ id: todo.id, newStatus })
    },
  },
}
</script>
