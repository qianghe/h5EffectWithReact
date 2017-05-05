import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router ,Route , browserHistory} from 'react-router';

const rootRoute = {
    path: '/',
    indexRoute: {
        getComponent(nextState,cb){
            require.ensure([], (require) => {
                cb(null, require('./App').default)
            }, 'App')
        }
    },
    childRoutes: [
        require('./route/DragDemo').default
    ]
}

//加入react-router 路由
ReactDOM.render(
    <Router
      history={browserHistory}
      routes={rootRoute}
      />
    ,document.getElementById('content'));
