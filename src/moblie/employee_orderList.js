import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ThemeProvider from '../_theme/default'
const thisView = window.LAUNCHER.getView()

thisView.setTitle('我的订单')
thisView.addEventListener('load', () => {
    ReactDOM.render(<App />, thisView)
})

import orderlist from '../test/_orderList'

class App extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidMount() {
        // console.log(this.refs.main,'refs')
        // console.log(this.refs.init,'ninit')
        console.log(orderlist)
    }
    
    render() {
        return (
            <ThemeProvider>
                <div style={{fontSize:'.256em'}}>
                    
                </div>
            </ThemeProvider>
        )
    }
}

// class Hle extends Component {
//     constructor(props,context){
//         super(props,context)
//         // this.dd = this.dd.bind(this);
//     }
//     dd(){
        
//     }
//     render(){
//         return(<div></div>)
//     }
// }