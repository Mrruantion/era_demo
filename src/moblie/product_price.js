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
import Checkbox from 'material-ui/Checkbox';

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
        this.changePrice = this.changePrice.bind(this);
        this.submit = this.submit.bind(this);
        this.selectProd = this.selectProd.bind(this);
        this.seArr = [];
        this.type = {};
        this.subArr = [];
    }

    componentDidMount() {
        let _this = this;
        // let custArr = _user.customer.product_price || [];
        // this.subArr
        thisView.addEventListener('show', e => {
            // console.log(e,'hhh')
            _this.type = e.params
            // let noTypeArr = _user.customer.product_price?_user.customer.product_price.filter(ele => ele.ProductTypeID != e.params.ID):[]
            let custArr = _user.customer.product_price ? _user.customer.product_price.filter(ele => ele.ProductTypeID == e.params.ID) : []
            _this.subArr = custArr;
            _this.seArr = proArray.baojia.filter(ele => ele.ProductTypeID == e.params.ID);
            // _this.seArr.map(ele => ele.isSelect = false)
            // _this.seArr.forEach(ele => custArr.forEach(cu => ele.ID == cu.ID ? ele.isSelect = true : null))
            _this.forceUpdate();
        })
        // console.log(2)
    }
    changePrice(e, v, data, i) {
        // thisView.goTo('./order_list.js')
        console.log(v,i)
        let flat = 0;
        if(data.isSelect){
            this.subArr.forEach((sub, index) => sub.ID == data.ID ? flat = index : null)
            this.subArr[flat].ContractPrice = parseFloat(v||0)
        }
        this.seArr[i].ContractPrice = parseFloat(v||0)
        this.forceUpdate();
    }
    selectProd(e, value, data, i) {
        let flat = 0;
        if (value) {
            this.subArr.push(data)
        } else {
            this.subArr.forEach((sub, index) => sub.ID == data.ID ? flat = index : null)
            this.subArr.splice(flat, 1)
        }
        this.forceUpdate()
    }
    submit() {
        this.subArr.map(ele => { delete ele.isSelect; return ele })
        let product = _user.customer.product_price ? _user.customer.product_price.filter(ele => ele.ProductTypeID != this.type.ID) : []
        let option = {
            product_price: product.concat(this.subArr),
            _objectId: _user.customer.objectId
        }
        console.log(option, 'option')
        Wapi.customer.update(res => {
            Wapi.customer.get(info => {
                _user.customer = info.data;
                W.setSetting('user', _user)
                W.alert('save success')
            }, { objectId: _user.customer.objectId })
        }, option)
    }
    render() {
        console.log(this.subArr, 'subArr')
        let height = window.screen.height;
        // let productList = ['原车屏升级', '汽车防盗安防', '车灯', '360全景']
        let _this = this;

        let productList = this.seArr.map(ele => {
            ele.isSelect = false
            this.subArr.forEach(cu => {
                if (ele.ID == cu.ID) {
                    ele.isSelect = true;
                    ele.ContractPrice = cu.ContractPrice
                }
            })
            return ele
        })
        let liItem = productList.map((ele, index) => {
            return (<li key={index} style={{ position: 'relative' }}>
                <Checkbox
                    checked={ele.isSelect || false}
                    style={{ position: 'absolute', width: '.40rem', height: '0.40rem', display: 'inline-block', top: '0.22rem' }}
                    onCheck={(e, v) => this.selectProd(e, v, ele, index)}
                />
                <span className="price-1">{ele.ProductName}</span>
                <span className="price-2 light">
                    <Input
                        value={ele.ContractPrice}
                        onChange={(e, v) => this.changePrice(e, v, ele, index)}
                        hintText='0'
                        style={{ lineHeight: '.91rem', fontSize: '0.26rem', marginTop: 0, height: '0.91rem' }}
                        inputStyle={{ top: 0, fontSize: '0.26rem' }}
                        hintStyle={{ bottom: 0, fontSize: '0.26rem' }}
                    />
                </span>
            </li>)
        })
        return (
            <ThemeProvider>
                <div style={{ fontSize: '.24rem', minHeight: height, background: '#f7f7f7' }}>
                    {/* <div></div> */}
                    <header className="header">
                        {/* <a className="goback" href="javascript: window.history.go(-1);"></a> */}
                        <h1>添加报价</h1>
                    </header>
                    <div className="page" style={{ marginBottom: 20 }}>
                        <div className="item-list price-bill">
                            <ul>
                                <li style={{ textAlign: 'center', fontSize: '.34rem' }}>{'产品类别：'}{this.type.Name}</li>
                                <li className="hd"><span className="price-1">安装内容</span><span className="price-3">合约报价(￥)</span></li>
                                {liItem}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <RaisedButton label={___.save} primary={true} labelStyle={{ fontSize: '.24rem' }} style={{ width: '100%', marginTop: '10px', position: 'fixed', bottom: 0, }} onClick={this.submit} labelColor='#eee' />
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