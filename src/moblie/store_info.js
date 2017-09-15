import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { ThemeProvider } from '../_theme/default';

import TextField from 'material-ui/TextField';
import AreaSelect from '../_component/base/areaSelect';
const thisView = window.LAUNCHER.getView()
thisView.setTitle("门店资料");
thisView.addEventListener('load', function () {
    ReactDOM.render(<App />, thisView);
});
class App extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <ThemeProvider>
                <div style={{ background: '#f7f7f7', minHeight: '100vh' }}>
                    <div style={{ padding: 5 }}>
                        <div style={{ height: 50, background: '#2196f3', color: '#fff', lineHeight: '50px', borderRadius: '5px 5px 0 0', paddingLeft: 20 }}>{'基本信息：'}</div>
                        <div style={{ height: 240, background: '#fff' }}>
                            <div>{'网点名称：'}
                                <TextField
                                    id="text-field-default"
                                    defaultValue={_user.customer.name}
                                />
                            </div>
                            <div>{'地址'}
                                <AreaSelect onChange={this.change} value={this.area} style={{width:'90%'}}/> 
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </ThemeProvider>)
    }
}