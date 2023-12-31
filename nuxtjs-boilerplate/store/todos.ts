import { ActionContext } from 'vuex'

// ///////////// enum ///////////////////////////////////
export enum IStatus {
  do = 'DO',
  undo = 'UNDO',
}

// ////////////////// type of object ///////////////////
export interface ITodo {
  status: IStatus
  id: string
  text: string
}

export interface ITodoState {
  todos: ITodo[]
}

export interface IRootState {
  todos: ITodoState
}

// ///////////////// state  ////////////////////////////
const getters = {
  getTodos: (state: IRootState) => state.todos,
}

const state = (): ITodoState => ({
  todos: [],
})

const actions = {
  addTodo: (ctx: ActionContext<ITodoState, IRootState>, payload: string) => {
    const { commit } = ctx
    commit('ADD_TODO', payload)
  },
  deleteTodo: (ctx: ActionContext<ITodoState, IRootState>, id: string) => {
    const { commit } = ctx
    commit('DELETE_TODO', id)
  },
  updateTodoStatus: (
    ctx: ActionContext<ITodoState, IRootState>,
    payload: { id: string; newStatus: IStatus }
  ) => {
    const { commit } = ctx
    commit('UPDATE_TODOS', payload)
  },
}

const mutations = {
  ADD_TODO(state: ITodoState, payload: ITodo) {
    state.todos.push(payload)
  },
  DELETE_TODO(state: ITodoState, id: string) {
    state.todos = state.todos.filter((todo) => todo.id !== id)
  },
  UPDATE_TODOS(state: ITodoState, payload: { id: string; newStatus: IStatus }) {
    const todoToUpdate = state.todos.find((todo) => todo.id === payload.id)
    if (todoToUpdate) {
      todoToUpdate.status = payload.newStatus
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
