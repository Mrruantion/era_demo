import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from '../_theme/default'
import Input from '../_component/base/input'

const thisView = window.LAUNCHER.getView();
// console.log(document.currentScript.view.dom)
thisView.setTitle('员工管理')
thisView.addEventListener('load', () => {
    ReactDOM.render(<App />, thisView)
})


class App extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <ThemeProvider>
                <div style={{ fontSize: '.256rem' }}>
                    <Input name="search"/>
                </div>
            </ThemeProvider>
        )
    }
}