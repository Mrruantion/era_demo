/**
 * 08/03
 * 小吴
 * 管理平台的主页，主要功能是 按用户权限展示功能模块的入口
 */
"use strict";
import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '../_theme/default';
import { Tabs, Tab } from 'material-ui/Tabs';

import ActionPermContactCalendar from 'material-ui/svg-icons/action/perm-contact-calendar';
import EditorMonetizationOn from 'material-ui/svg-icons/editor/monetization-on';
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books'
import CommunicationBusiness from 'material-ui/svg-icons/communication/business'
import ImageBlurOn from 'material-ui/svg-icons/image/blur-on'
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline'
// import NotificationWifi from'material-ui/svg-icons/notification/wifi'

import AreaSelect from '../_component/base/areaSelect';
import SexRadio from '../_component/base/sexRadio';
import ModuleCard from '../_component/base/moduleCard';
import AutoList from '../_component/base/autoList';
import { getOpenIdKey, changeToLetter } from '../_modules/tool';;
import Wapi from '../_modules/Wapi'
// import STORE from '../_reducers/main';
// import {user_type_act,brand_act,department_act,product_act,role_act} from '../_reducers/dictionary';

require('../_sass/home.scss');
const styles = {
    main: { paddingTop: '0px', paddingBottom: '0px', width: '100%' },
    card: { marginTop: '15px', width: '100%', backgroundColor: '#ffffff' },//170118
    hide: { display: 'none' },
    table_left: { width: window.innerWidth * 0.62 + 'px', height: '125px', padding: '0px', backgroundColor: '#ffffff' },
    table_right: { width: window.innerWidth * 0.38 + 'px' },
    no_act: { marginTop: '30px', width: '100%', display: 'block', textAlign: 'center' },
    share_page: { width: '100%', height: window.innerHeight + 'px', display: 'block', backgroundColor: '#ffffff', position: 'fixed', top: '0px', left: '0px' },
};

//加载各种字典数据,权限啊等等
// function loadDictionary(){
//     STORE.dispatch(user_type_act.get({useType:_user.customer.custTypeId}));//用户类型
//     STORE.dispatch(brand_act.get({uid:_user.customer.objectId}));//品牌  
//     STORE.dispatch(product_act.get({uid:_user.customer.objectId}));//品牌
//     STORE.dispatch(department_act.get({uid:_user.customer.objectId}));//部门
//     STORE.dispatch(role_act.get({uid:_user.customer.objectId}));//角色
// }
// loadDictionary();

const thisView = window.LAUNCHER.getView();//第一句必然是获取view
thisView.setTitle("闪装时代");
thisView.addEventListener('load', function () {
    ReactDOM.render(<App />, thisView);
    if (_g.loginLocation) {
        thisView.goTo(_g.loginLocation+'.js');
    }
    // thisView.prefetch('./myMarketing/marketing_data.js',2);
    // thisView.prefetch('./myAccount/my_order.js',2);
});
const sty = {
    icon: {
        height: '34px',
        width: '34px',
        fill: '#42A5F5'
    },
    iconActive: {
        height: '34px',
        width: '34px',
        fill: 'rgb(255, 152, 0)'
    },
    tabs: {
        position: 'fixed',
        width: '100vw',
        bottom: '0px'
    },
    main: {
        marginBottom: '50px'
    },
    head: {
        width: '100%',
        height: '180px',
        display: 'block',
        textAlign: 'center',
        paddingTop: '20px',
        // backgroundColor:'#33ccee',
        backgroundColor: '#3c9bf9',
        color: '#ffffff'
    },
    head_pic: {
        width: '100px',
        height: '100px',
        borderRadius: '50%'
    },
    head_links: {
        display: 'table',
        width: '100%',
        marginTop: '15px'
    },
    head_link: {
        display: 'table-cell',
        width: '33%',
        borderRight: '1px solid #ffffff'
    },
    head_link2: {
        display: 'table-cell',
        width: '50%',
        borderRight: '1px solid #ffffff'
    }
}


const _pages = [
    {   /*门店资料 */
        href: 'store_info',
        name: '门店资料',
        icon: <ActionPermContactCalendar style={sty.icon} />
    },{   /*我的钱包 */
        href: 'wallet',
        name: '我的钱包',
        icon: <EditorMonetizationOn style={sty.icon} />
    },{   /*我的订单 */
        href: 'order_list',
        name: '我的订单',
        icon: <AvLibraryBooks style={sty.icon} />
    },{   /*服务报价 */
        href: 'product',
        name: '服务报价',
        icon: <CommunicationBusiness style={sty.icon} />
    },{   /*员工管理 */
        href: 'employee_manage',
        name: '员工管理',
        icon: <SocialPersonOutline style={sty.icon} />
    },
]

const _pages2 = [
    {   /*二维码管理 */
        href: 'qrCode_manage',
        name: '二维码管理',
        icon: <ImageBlurOn style={sty.icon} />
    }
]

class App extends Component {
    constructor(props, context) {
        super(props, context)

    }
    getChildContext() {
        return {
            view:thisView
        };
    }
    go(tab){
        thisView.goTo(tab.props.value+'.js');
    }
    render() {
        let pages = _user.customer.custTypeId == 1 ? _pages2 : _user.customer.custTypeId == 5 ? _pages : []
        const cards = pages.map(e => (<ModuleCard title={e.name} icon={e.icon} href={e.href} key={e.href} />));
        return (
            <ThemeProvider>
                <div style={sty.main}>
                    <div style={sty.head} >
                        <div style={{ fontSize: '18px' }} onClick={this.personalInfo}>
                            <img src='../../img/head.png' style={sty.head_pic} />
                            <div>
                                {_user.mobile}
                            </div>
                        </div>
                    </div>
                    <div className='main'>
                        {cards}
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}
App.childContextTypes = {
    view: React.PropTypes.object
};