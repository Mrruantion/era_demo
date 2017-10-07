import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SonPage from '../_component/base/sonPage'
import RaisedButton from 'material-ui/RaisedButton';
// import { ThemeProvider } from '../_theme/default'
import { ThemeProvider } from '../_theme/default';
import QrImg from '../_component/base/qrImg';
import {changeToLetter} from '../_modules/tool';

const thisView = window.LAUNCHER.getView();
thisView.setTitle('二维码管理')
thisView.addEventListener('load', () => {
    ReactDOM.render(<App />, thisView)
})
const styles = {
    select: {
        overflow: 'hidden',
        width: '33.33333%',
        verticalAlign: 'bottom',
        textAlign: 'left',
    },
    babel: {
        paddingRight: '20px'
    },
    menuItem: {
        paddingLeft: '5px'
    }
}

import proArray from '../test/_product'

class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            v1: -1,
            v1Arr: [],
            v2: -1,
            v2Arr: [],
            v3: 0,
            v3Arr: [],
            show: false
        }
        this.selectFirst = this.selectFirst.bind(this);
        this.selectSecond = this.selectSecond.bind(this);
        this.selectThirst = this.selectThirst.bind(this);
        this.submit = this.submit.bind(this);
        this.hide = this.hide.bind(this);
        this.data = {}
    }
    componentDidMount() {
        let v1Arr = proArray.first;
        this.setState({ v1Arr: v1Arr })
    }
    selectFirst(e, i, v) {
        // console.log(e,v)
        this.setState({ v1: v, v2: -1, v3: 0 })
    }
    selectSecond(e, i, v) {
        this.setState({ v2: v, v3: 0 })
    }
    selectThirst(e, i, v) {
        this.setState({ v3: v })
    }
    hide() {
        this.setState({ show: false })
    }
    submit() {
        this.setState({ show: true })
        // this.data = { sUrl: 'http://baidu.com' }
        let url = WiStorm.root + 'search.html?productId=' + this.state.v3.ID
        let qrLinkData={
            url:url,
            type:4,
            uid:_user.customer.objectId,
            i:0
        }
        Wapi.qrLink.add(res=>{
            Wapi.qrLink.get(r=>{
                let id=changeToLetter(r.data.i);
                this.data.sUrl='https://t.autogps.cn/?s='+id;
                Wapi.qrLink.update(()=>{
                    W.loading(false);
                    // this.qrHide=false;
                    this.forceUpdate();
                },{
                    _objectId:res.objectId,
                    id:id
                });
            },{objectId:res.objectId});
        },qrLinkData);
        // this.data = { sUrl: url }
    }
    render() {
        let v1item = this.state.v1Arr.map((ele, index) => <MenuItem innerDivStyle={styles.menuItem} value={ele.ID} key={index} primaryText={ele.Name} />)
        v1item.unshift(<MenuItem innerDivStyle={styles.menuItem} value={-1} key={-1} primaryText={'一级类别'} />);
        let v2Arr = proArray.second.filter(ele => ele.ParentId == this.state.v1) || []
        let v2item = v2Arr.map((ele, index) => <MenuItem innerDivStyle={styles.menuItem} value={ele.ID} key={index} primaryText={ele.Name} />)
        v2item.unshift(<MenuItem innerDivStyle={styles.menuItem} value={-1} key={-1} primaryText={'产品类别'} />);
        let v3Arr = proArray.baojia.filter(ele => ele.ProductTypeID == this.state.v2) || []
        console.log(v3Arr)
        let v3item = v3Arr.map((ele, index) => <MenuItem innerDivStyle={styles.menuItem} value={ele} key={index} primaryText={ele.ProductName} />)
        v3item.unshift(<MenuItem innerDivStyle={styles.menuItem} value={0} key={-1} primaryText={'安装内容'} />);
        return (
            <ThemeProvider>
                <div style={{ fontSize: '0.256rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>选择生成二维码</h3>
                    </div>
                    <SelectField
                        value={this.state.v1}
                        onChange={this.selectFirst}
                        style={styles.select}
                        labelStyle={styles.babel}
                        menuStyle={{ width: 'auto' }}
                        autoWidth={false}
                    >
                        {/* {this.province_options} */}
                        {v1item}
                    </SelectField>

                    <SelectField
                        value={this.state.v2}
                        onChange={this.selectSecond}
                        style={styles.select}
                        labelStyle={styles.babel}
                        menuStyle={{ width: 'auto' }}
                        autoWidth={false}
                    >
                        {/* {city_options} */}
                        {v2item}
                    </SelectField>

                    <SelectField
                        value={this.state.v3}
                        onChange={this.selectThirst}
                        style={styles.select}
                        labelStyle={styles.babel}
                        menuStyle={{ width: 'auto' }}
                        autoWidth={false}
                    >
                        {/* {area_options} */}
                        {v3item}
                    </SelectField>
                    <div style={{ textAlign: 'center', position: 'absolute', bottom: '50%', width: '100%' }}>
                        <QrImg data={this.data.sUrl} style={{ display: 'inline-block', padding: 10, backgroundColor: '#fff' }} />
                    </div>
                    <div style={{ textAlign: 'center', position: 'fixed', bottom: 30, width: '100%' }}><RaisedButton disabled={this.state.v3 ? false : true} onClick={this.submit} label={'生成二维码'} primary={true} style={{ marginRight: '10px' }} /></div>
                </div>
                {/* <SonPage open={this.state.show} back={this.hide}>
                    <QrImg data={this.data.sUrl} style={{ display: 'inline-block', padding: 10, backgroundColor: '#fff' }} />
                </SonPage> */}
            </ThemeProvider>
        )
    }
}

// class QrCode extends Component {
//     constructor(props,context){
//         super(props,context)
//     }
//     // render(){
//     //     return()
//     // }
// }