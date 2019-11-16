import React, { useState, useReducer } from 'react';
import uuid from 'uuid/v4';
import classnames from 'classnames';

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

const SHOW_ALL = 'SHOW_ALL';
const ALL = 'ALL';
const SHOW_COMPLETE = 'SHOW_COMPLETE';
const COMPLETE = 'COMPLETE';
const SHOW_INCOMPLETE = 'SHOW_INCOMPLETE';
const INCOMPLETE = 'INCOMPLETE';

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

const DO_TODO = 'DO_TODO';
const UNDO_TODO = 'UNDO_TODO';
const ADD_TODO = 'ADD_TODO';

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
    const [task, setTask] = useState('');

    const handleChangeCheckbox = todo => {
        dispatchTodos({
            type: todo.complete ? UNDO_TODO : DO_TODO,
            id: todo.id
        });
    };

    const handleChangeInput = event => {
        setTask(event.target.value);
    };

    const handleSubmit = event => {
        if (task) {
            dispatchTodos({
                type: ADD_TODO,
                task,
                id: uuid()
            });
        }

        setTask('');

        event.preventDefault();
    };

    const handleShowAll = () => {
        dispatchFilter({ type: SHOW_ALL });
    };

    const handleShowComplete = () => {
        dispatchFilter({ type: SHOW_COMPLETE });
    };

    const handleShowIncomplete = () => {
        dispatchFilter({ type: SHOW_INCOMPLETE });
    };

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
            <div className="btn-group d-flex mb-3" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-info" onClick={handleShowAll}>Show All</button>
                <button type="button" className="btn btn-success" onClick={handleShowComplete}>Show Complete</button>
                <button type="button" className="btn btn-warning" onClick={handleShowIncomplete}>Show Incomplete</button>
            </div>

            <ul className="list-group mb-3">
                {filteredTodos.map(todo => (
                    <li key={todo.id} className={classnames({'list-group-item-success' : todo.complete}, 'list-group-item')}>
                        <label>
                            <input
                                type="checkbox"
                                checked={todo.complete}
                                onChange={() => handleChangeCheckbox(todo)}
                            />
                            {todo.task}
                        </label>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <input type="text" value={task} onChange={handleChangeInput} placeholder="Task..."
                           className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary mb-2">Add todo</button>
            </form>
        </div>
    );
};

export default App;
