import React , { Component } from 'react';
import { Router ,Route, Link} from 'react-router';
import './main.scss'

 const App = props => {

        return (
            <div>
                <h1>H5 Effects with react</h1>
                <ul>
                    <li>(1)<Link to="/dragdemo">DragDemo</Link></li>
                </ul>
            </div>
        )

}

export default App;
