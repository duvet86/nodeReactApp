'use strict';

import type { Action } from './ChartActions';

import { MapStore } from 'immutable';
import { ReduceStore } from 'flux/utils';
import { Line, Pie } from './Chart';
import TodoDispatcher from './ChartDispatcher';

// Set up the store, If we didn't care about order we could just use MapStore
type State = MapStore<string, Todo>;

class TodoStore extends ReduceStore<string, Todo> {
  getInitialState(): State {
    return MapStore();
  }

  reduce (state: State, action: Action): State {
    switch (action.type) {
      case 'todo/complete':
        return state.setIn([action.id, 'complete'], true);

      case 'todo/create':
        return createTodo(state, action.text);

      case 'todo/destroy':
        return state.delete(action.id);

      case 'todo/destroy-completed':
        return state.filter(todo => !todo.complete);

      case 'todo/toggle-complete-all':
        const setCompleted = !this.areAllComplete();
        return state.map(todo => todo.set('complete', setCompleted));

      case 'todo/undo-complete':
        return state.setIn([action.id, 'complete'], false);

      case 'todo/update-text':
        return state.setIn([action.id, 'text'], action.text.trim());

      default:
        return state;
    }
  }

  areAllComplete(): boolean {
    return this.getState().every(todo => todo.complete);
  }
}

// Pure helper function to create a new Todo and add it to the state.
function createTodo(state: State, text: ?string): State {
  if (!text) {
    return state;
  }
  var newTodo = new Todo(text);
  return state.set(newTodo.id, newTodo);
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const instance = new TodoStore(TodoDispatcher);
export default instance;