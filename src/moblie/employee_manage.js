import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from '../_theme/default'
import Input from '../_component/base/input'
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Avatar from 'material-ui/Avatar';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import {List, ListItem} from 'material-ui/List';


// import STORE from '../_reducers/main';
// import {randomStr} from '../_modules/tool';
import {blue500, yellow600} from 'material-ui/styles/colors';
import AutoList from '../_component/base/autoList';
const thisView = window.LAUNCHER.getView();
// console.log(document.currentScript.view.dom)
thisView.setTitle('员工管理')
thisView.addEventListener('load', () => {
    ReactDOM.render(<App />, thisView)
    // console.log(thisView.prefetch())
    thisView.prefetch('share_register.js', 2);
})

require('../_sass/wallet.scss');
class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state={
            employees:[],
            edit_employee:{},
            show_sonpage:false,
            intent:'add',
            total:0,
            search:[]
        }
        this.page=1;
        // this.getEmployees=this.getEmployees.bind(this);
        // this.addEmployee=this.addEmployee.bind(this);
        // this.showDetails=this.showDetails.bind(this);
        // this.editEmployeeCancel=this.editEmployeeCancel.bind(this);
        // this.editEmployeeSubmit=this.editEmployeeSubmit.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        // this.search = this.search.bind(this);

        this._data={
            companyId:_user.customer.objectId,
            type:'<>1'
        };
        this.addEmployee = this.addEmployee.bind(this);
        this.getemployee = this.getemployee.bind(this);
    }
    // getChildContext(){
    //     return {
    //         ACT:this.act,
    //         custType:this.props.custType,
    //         showDetails:this.showDetails
    //     };
    // }

    componentDidMount() {
        this.getemployee()
    }
    getemployee() {
        Wapi.employee.list(res => {
            console.log(res.data, 'res.data')
            this.setState({
                employees:res.data,
                total:res.total,
            });
        }, {
                companyId: _user.customer.objectId
            })
    }
    addEmployee() {
        let wx_app_id = W.getCookie('current_wx');
        let url = location.origin + '/?location=tempRegister.html&intent=logout&needOpenId=true&parentId='
            + _user.customer.objectId
            + '&departId=0&wx_app_id=' + wx_app_id
            + '&name=' + _user.customer.name;
        thisView.goTo('share_register.js', url);
    }
    loadNextPage(){
        let arr=this.state.employees;
        this.page++;
        Wapi.employee.list(res=>{
            this.setState({employees:arr.concat(res.data)});
        },this._data,{
            fields:'objectId,uid,companyId,name,tel,sex,departId,isQuit,role,roleId',
            limit:20,
            page_no:this.page
        });
    }
    // search(e,val){
    //     if(!val){
    //         this.setState({search:[]});
    //         return;
    //     }
    //     let data=Object.assign({},this._data);
    //     data.name='^'+val;
    //     Wapi.employee.list(res=>{
    //         this.setState({search:res.data});
    //     },data);
    // }
    render() {
        let height = window.screen.height;
        let listDis={};
        let searchList=null;
        if (this.state.search.length) {
            searchList = <DumbList data={this.state.search} />;
            listDis.display = 'none';
        }
        return (
            <ThemeProvider>
                <div style={{ fontSize: '.24rem', minHeight: height, background: '#f7f7f7' }}>
                    {/* <div></div> */}
                    <header className="header">
                        <h1>员工列表 </h1>
                        <IconButton onClick={this.addEmployee} style={{ position: 'absolute', right: 0 }}><ContentAdd color="#fff" /></IconButton>
                    </header>
                    <div style={{paddingTop:37}}>
                        <div style={listDis}>
                            <Alist
                                max={this.state.total}
                                limit={20}
                                data={this.state.employees}
                                next={this.loadNextPage}
                            />
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}



class DumbList extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            data: props.data
        }
    }
    render() {
        console.log(this.state.data, 'dfd')
        let item = this.state.data.map((ele, index) => {
            return (
                <ListItem
                    key={index}
                    innerDivStyle={{ paddingLeft: '60px' }}
                    leftAvatar={<Avatar icon={<ActionAccountCircle />} style={{ left: 10 }} backgroundColor={blue500} />}
                    primaryText={(<div style={{ fontSize: 14 }}>
                        <span>{ele.name}</span>
                        <span style={{ padding: '0 10px' }}>{ele.sex ? '男' : '女'}</span>
                        <span>{ele.tel}</span>
                    </div>)}
                    
                />
            )
        })
        return (
            <div>
                <List>
                    {item}
                </List>
            </div>
        )
    }
}
// DumbList.contextTypes = {
//     showDetails: React.PropTypes.func
// };
let Alist = AutoList(DumbList);