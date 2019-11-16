import React, { useContext } from 'react';

import {DispatchContext, SHOW_ALL, SHOW_COMPLETE, SHOW_INCOMPLETE} from './App';

const Filter = () => {

    const dispatch = useContext(DispatchContext);

    const handleShowAll = () => {
        dispatch({ type: SHOW_ALL });
    };

    const handleShowComplete = () => {
        dispatch({ type: SHOW_COMPLETE });
    };

    const handleShowIncomplete = () => {
        dispatch({ type: SHOW_INCOMPLETE });
    };

    return (
        <div className="btn-group d-flex mb-3" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-info" onClick={handleShowAll}>Show All</button>
            <button type="button" className="btn btn-success" onClick={handleShowComplete}>Show Complete</button>
            <button type="button" className="btn btn-warning" onClick={handleShowIncomplete}>Show Incomplete</button>
        </div>
    );
};

export default Filter;
