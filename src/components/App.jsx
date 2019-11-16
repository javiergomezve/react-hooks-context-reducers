import React, { useReducer, createContext } from 'react';
import uuid from 'uuid/v4';

import Filter from './Filter';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

const initialTodos = [
    {
        id: uuid(),
        task: 'Learn React',
        complete: true,
    },
    {
        id: uuid(),
        task: 'Learn Firebase',
        complete: true,
    },
    {
        id: uuid(),
        task: 'Learn GraphQL',
        complete: false,
    },
];

export const SHOW_ALL = 'SHOW_ALL';
export const ALL = 'ALL';
export const SHOW_COMPLETE = 'SHOW_COMPLETE';
export const COMPLETE = 'COMPLETE';
export const SHOW_INCOMPLETE = 'SHOW_INCOMPLETE';
export const INCOMPLETE = 'INCOMPLETE';

const filterReducer = (state, action) => {
    switch (action.type) {
        case SHOW_ALL:
            return ALL;

        case SHOW_COMPLETE:
            return COMPLETE;

        case SHOW_INCOMPLETE:
            return INCOMPLETE;

        default:
            return state;
    }
};

export const DO_TODO = 'DO_TODO';
export const UNDO_TODO = 'UNDO_TODO';
export const ADD_TODO = 'ADD_TODO';

const todoReducer = (state, action) => {
    switch (action.type) {
        case DO_TODO:
            return state.map(todo => {
                if (todo.id === action.id) {
                    return {
                        ...todo, complete: true
                    };
                }

                return todo;
            });

        case UNDO_TODO:
            return state.map(todo => {
                if (todo.id === action.id) {
                    return {
                        ...todo, complete: false
                    };
                }

                return todo;
            });

        case ADD_TODO:
            return state.concat({
                task: action.task,
                id: action.id,
                complete: false,
            });

        default:
            return state;
    }
};

export const DispatchContext = createContext(null);

const useCombinedReducer = combinedReducers => {
    // Global state
    const state = Object.keys(combinedReducers).reduce(
        (acc, key) => ({ ...acc, [key]: combinedReducers[key][0] }),
        {}
    );

    // Global dispatch function
    const dispatch = action => Object.keys(combinedReducers)
        .map(key => combinedReducers[key][1])
        .forEach(fn => fn(action));

    return [state, dispatch];
};

const App = () => {
    const [state, dispatch] = useCombinedReducer({
        filter: useReducer(filterReducer, ALL),
        todos: useReducer(todoReducer, initialTodos)
    });

    const filteredTodos = state.todos.filter(todo => {
        if (state.filter === ALL) {
            return true;
        }

        if (state.filter === COMPLETE && todo.complete) {
            return true;
        }

        if (state.filter === INCOMPLETE && !todo.complete) {
            return true;
        }

        return false;
    });

    return (
        <DispatchContext.Provider value={dispatch}>
            <div className="container mt-5">
                <Filter dispatch={dispatch} />
                <TodoList todos={filteredTodos} />
                <AddTodo />
            </div>
        </DispatchContext.Provider>
    );
};

export default App;
