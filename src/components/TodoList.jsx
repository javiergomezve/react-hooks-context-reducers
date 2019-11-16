import React, { useContext } from 'react';
import classnames from "classnames";

import {DO_TODO, TodoContext, UNDO_TODO} from "./App";

const TodoList = ({ todos }) => {

    return (
        <ul className="list-group mb-3">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};

const TodoItem = ({ todo }) => {
    const dispatch = useContext(TodoContext);

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
