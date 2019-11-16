import React, { useState, useReducer } from 'react';
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
            throw new Error();
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
            throw new Error();
    }
};

const App = () => {
    const [filter, dispatchFilter] = useReducer(filterReducer, ALL);
    const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);



    const filteredTodos = todos.filter(todo => {
        if (filter === ALL) {
            return true;
        }

        if (filter === COMPLETE && todo.complete) {
            return true;
        }

        if (filter === INCOMPLETE && !todo.complete) {
            return true;
        }

        return false;
    });

    return (
        <div className="container mt-5">
            <Filter dispatch={dispatchFilter} />
            <TodoList dispatch={dispatchTodos} todos={filteredTodos} />
            <AddTodo dispatch={dispatchTodos} />
        </div>
    );
};

export default App;
