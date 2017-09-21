import React, { Component } from 'react'
// import { ReactDOM } from 'react-dom'
// import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './_theme/default';
// import {ThemeProvider} from './_theme/defalut'

const thisView = window.LAUNCHER.getView();
thisView.setTitle('附近搜索')
thisView.addEventListener('load', () => {
    ReactDOM.render(<App />, thisView);
})

class App extends Component {
    constructor(props,context){
        super(props,context)
    }
    render(){
        return(<ThemeProvider>
           <div>{222}</div>
        </ThemeProvider>)
    }
}