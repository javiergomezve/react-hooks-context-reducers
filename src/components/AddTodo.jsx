import React, { useState, useContext } from 'react';
import uuid from "uuid/v4";

import {ADD_TODO, TodoContext} from "./App";

const AddTodo = () => {
    const dispatch = useContext(TodoContext);

    const [task, setTask] = useState('');

    const handleChangeInput = event => setTask(event.target.value);

    const handleSubmit = event => {
        if (task) {
            dispatch({
                type: ADD_TODO,
                task,
                id: uuid()
            });
        }

        setTask('');

        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
                <input type="text" value={task} onChange={handleChangeInput} placeholder="Task..."
                       className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary mb-2">Add todo</button>
        </form>
    );
};

export default AddTodo;
