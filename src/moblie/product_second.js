import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '../_theme/default';

import { Tabs, Tab } from 'material-ui/Tabs';

// import AppBar from '../_component/base/appBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import SonPage from '../_component/base/sonPage';
import AutoList from '../_component/base/autoList';
import Input from '../_component/base/input';
import MobileChecker from '../_component/base/mobileChecker';
import VerificationOrig from '../_component/base/verificationOrig'

import proArray from '../test/_product'
require('../_sass/product.scss');

const thisView = window.LAUNCHER.getView();//第一句必然是获取view
thisView.setTitle('服务报价');

thisView.addEventListener('load', function () {
    ReactDOM.render(<App />, thisView);
    thisView.prefetch('product_price.js',2)
    
});

const styles = {
    appbar: { position: 'fixed', top: '0px' },
    head: { width: '100%', display: 'block', textAlign: 'center', padding: '40px 0', backgroundColor: '#3c9bf9' },
    head_str: { fontSize: '14px', marginBottom: '5px', color: '#ffffff' },
    head_num: { fontSize: '.42rem', marginBottom: '20px', color: '#ffffff' },
    bill: { padding: '5px 10px', borderBottom: '1px solid #cccccc' },
    bill_remark: { paddingTop: '5px' },
    main: { margin: '10px' },
    income: { float: 'right' },
    expenses: { color: '#990000', float: 'right' },
    line: { margin: '0px 15px', padding: '15px 5px', borderBottom: '1px solid #dddddd' },
    line_right: { float: 'right' },
    a: { color: '#FFFF8D', fontSize: '.34rem' },
    sonpage_main: { marginLeft: '10px', marginRight: '10px', textAlign: 'center' },
    inputGroup: { display: 'block', paddingTop: '1em', paddingBottom: '1em' },
    no_record: { width: '100%', textAlign: 'center' },
}
function combineStyle(arr) {
    return arr.reduce((a, b) => Object.assign({}, styles[a], styles[b]));
}
function vmiddle(num, sty) {
    return Object.assign({ marginTop: ((window.innerHeight - num) / 2 - 50) + 'px' }, sty);
}

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.secondProduct = this.secondProduct.bind(this);
        this.seArr = [];
    }

    componentDidMount() {
        let _this = this;
        thisView.addEventListener('show',e => {
            // console.log(e,'hhh')
            if(e.params){
                _this.seArr = proArray.second.filter(ele => ele.ParentId == e.params.ID )
                _this.forceUpdate();
            }
            
        })
        console.log(1)
    }
    secondProduct(data){
        thisView.goTo('./product_price.js',data)
    }
    render() {
        let height = window.screen.height;
        // let productList = ['原车屏升级', '汽车防盗安防', '车灯', '360全景']
        let productList = this.seArr
        let liItem = productList.map((ele, index) => {
            return (<li key={index}>
                <span className="span-1">{ele.Name}</span>
                <span className="span-2 light">
                    <span className="btn"><a className="g-btn" onClick={() => this.secondProduct(ele)}>我要合作</a></span>
                </span>
            </li>)
        })
        return (
            <ThemeProvider>
                <div style={{ fontSize: '.24rem', minHeight: height, background: '#f7f7f7' }}>
                    {/* <div></div> */}
                    <header className="header">
                        {/* <a className="goback" href="javascript: window.history.go(-1);"></a> */}
                        <h1>服务报价 </h1>
                    </header>
                    <div className="page">
                        <div className="item-list price-bill">
                            <ul>
                                <li className="hd"><span className="span-1">产品类别</span><span className="span-2">操作</span></li>
                                {liItem}
                            </ul>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}


//工具方法 金额转字符
function toMoneyFormat(money) {
    return money.toFixed(2);
}



// class ProductPrice extends Component {
//     constructor(props,context){
//         super(props,context)
//     }
//     render(){
//         return(<div></div>)
//     }
// }