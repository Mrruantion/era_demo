import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from '../_theme/default'
import Input from '../_component/base/input'
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
const thisView = window.LAUNCHER.getView();
// console.log(document.currentScript.view.dom)
thisView.setTitle('员工管理')
thisView.addEventListener('load', () => {
    ReactDOM.render(<App />, thisView)
    // console.log(thisView.prefetch())
    thisView.prefetch('share_register.js',2);
})

require('../_sass/wallet.scss');
class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.addEmployee = this.addEmployee.bind(this);
    }
    addEmployee(){
        let wx_app_id=W.getCookie('current_wx');
        let url=location.origin+'/?location=tempRegister.html&intent=logout&needOpenId=true&parentId='
                +_user.customer.objectId
                +'&departId=0&wx_app_id='+wx_app_id
                +'&name='+_user.customer.name;
        thisView.goTo('share_register.js',url);
    }
    render() {
        let height = window.screen.height
        return (
            <ThemeProvider>
                <div style={{ fontSize: '.24rem', minHeight: height, background: '#f7f7f7' }}>
                {/* <div></div> */}
                    <header className="header">
                        <h1>员工列表 </h1>
                        <IconButton onClick={this.addEmployee} style={{position:'absolute',right:0}}><ContentAdd color="#fff"/></IconButton>
                    </header>
                </div>
            </ThemeProvider>
        )
    }
}