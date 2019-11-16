import React from 'react';
import classnames from "classnames";

import {DO_TODO, UNDO_TODO} from "./App";

const TodoList = ({ dispatch, todos }) => {

    return (
        <ul className="list-group mb-3">
            {todos.map(todo => (
                <TodoItem key={todo.id}  dispatch={dispatch} todo={todo} />
            ))}
        </ul>
    );
};

const TodoItem = ({ dispatch, todo }) => {

    const handelChange = () => dispatch({
        type: todo.complete ? UNDO_TODO : DO_TODO,
        id: todo.id
    });

    return (
        <li className={classnames({'list-group-item-success' : todo.complete}, 'list-group-item')}>
            <label>
                <input
                    type="checkbox"
                    checked={todo.complete}
                    onChange={() => handelChange(todo)}
                />
                {todo.task}
            </label>
        </li>
    );
};

export default TodoList;
