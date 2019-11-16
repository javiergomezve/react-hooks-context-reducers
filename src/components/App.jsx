import React, { useState } from 'react';
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

const App = () => {
    const [todos, setTodos] = useState(initialTodos);
    const [task, setTask] = useState('');

    const handleChangeCheckbox = id => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo, complete: !todo.complete
                    }
                }

                return todo;
            })
        );
    };

    const handleChangeInput = event => {
        setTask(event.target.value);
    };

    const handleSubmit = event => {
        if (task) {
            setTodos(todos.concat({ id: uuid(), task, complete: false }));
        }

        setTask('');

        event.preventDefault();
    };

    return (
        <div className="container mt-5">
            <ul className="list-group mb-3">
                {todos.map(todo => (
                    <li key={todo.id} className={classnames({'list-group-item-success' : todo.complete}, 'list-group-item')}>
                        <label>
                            <input
                                type="checkbox"
                                checked={todo.complete}
                                onChange={() => handleChangeCheckbox(todo.id)}
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
