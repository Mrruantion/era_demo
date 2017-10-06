import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// import { ThemeProvider } from '../_theme/default'
import { ThemeProvider } from '../_theme/default';

const thisView = window.LAUNCHER.getView();
thisView.setTitle('二维码管理')
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
                <div style={{fontSize:'0.256rem'}}>
                    
                </div>
            </ThemeProvider>
        )
    }
}