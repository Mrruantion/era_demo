import React, { Component } from 'react';

import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';

import VerificationCode from '../base/verificationCode';
import VerificationOrig from '../base/verificationOrig';
import Register from './register';
import RegisterOrig from './registerOrig';
import Login from './index';
import AreaSelect from '../base/areaSelect';
import Input from '../base/input';
import SexRadio from '../base/sexRadio';

/*
 * 接受的props：
 *      parentId 新注册的客户的上级id
 *      typeId 注册客户的类型
 *      success 注册流程完成时的回调，未必注册成功
 *          props.success(res) 传入一个对象res，根据res._code的值判断是否注册成功，
 *          不存在或为0是注册成功，等于1为密码错误且之前已经注册过用户，
 *          等于2是输入了正确的密码，而且已经是一个客户，客户表中已有数据，所以不能注册
 */

const sty = {
    f: {
        width: '100%'
    },
    r: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: '3px 10px',
        borderBottom: '1px solid #dddddd',
        backgroundColor: '#fff',
    },
    input: {
        width: '100%',
        height: '40px',
        fontSize: '16px',
        border: 'none',
        outline: 'none'
    }
}

class AgentRegisterBox extends Component {
    constructor(props, context) {
        super(props, context);

        this.data = {
            name: '',
            contact: '',
            sex: 1
        };

        this.nameChange = this.nameChange.bind(this);
        this.sexChange = this.sexChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.registerSuccess = this.registerSuccess.bind(this);
        this.beforRegister = this.beforRegister.bind(this);
    }
    registerSuccess() {
        W.loading(1);
        let user = this._user;
        let that = this;
        // let pid=this.props.parentId;
        let tid = getCustType();
        if (!tid) {
            W.alert(___.cust_type_err);
            return;
        }
        let cust = Object.assign({}, this.data, { tel: user.mobile, custTypeId: tid });
        let token = user.access_token;
        cust.access_token = token;
        cust.uid = user.uid;
        Wapi.customer.add(function (res) {
            cust.objectId = res.objectId;
            user.customer = cust;
            that.props.success(user);
        }, cust);
    }
    handleNext(res) {
        W.loading(1);
        let user = res;
        let that = this;
        Wapi.user.login(function (data) {//先登录获取token
            if (data.status_code) {
                W.loading();
                if (data.status_code == 2 && user.status_code == 8) {//密码错误且之前已经注册过用户
                    user._code = 1;
                    that.props.success(user);
                    return;
                }
                W.errorCode(data);
                return;
            }
            delete data.status_code;
            Object.assign(user, data);//用户信息
            that._user = user;

            if (user.status_code == 8) {//如果是之前就已经注册过用户则先校验一下有没有添加过客户表
                customerCheck(user, that, function () {
                    // 如果为品牌商，代理商，服务商，则增加扫码挪车代理权限
                    that.registerSuccess();
                });
            } else {
                that.registerSuccess();
            }
        }, {
                account: user.mobile,
                password: user.password
            });
    }

    nameChange(e) {
        this.data[e.target.name] = e.target.value;
    }
    sexChange(val) {
        this.data.sex = val;
    }
    beforRegister(callback) {
        if (!this.data.name) {
            W.alert(___.pls_input_company_name);
            return;
        }
        if (!this.data.contact) {
            W.alert(___.contact_empty);
            return;
        }
        callback();
    }
    render() {
        return (
            <div>
                <div style={sty.r}>
                    <input name='name' placeholder={'账号名称'} style={sty.input} onChange={this.nameChange} />
                </div>
                <div style={sty.r}>
                    <form style={{ position: 'relative', width: '100%', background: '#fff' }}>
                        <input name='contact' onChange={this.nameChange} placeholder={___.person_name} style={sty.input} />
                        {/* <SexRadio onChange={this.sexChange} style={{ position: 'absolute', right: '0px', top: '8px' }} /> */}
                    </form>
                </div>
                <RegisterOrig onSuccess={this.handleNext} beforRegister={this.beforRegister} />
            </div>
        );
    }
}

class AgentShowBox extends Component {
    render() {
        let box = <AgentRegisterBox success={this.props.success} key='register' />
        return (
            <div>
                <h4 style={{ textAlign: 'center' }}>{'闪装时代'}</h4>
                <p style={{ textAlign: 'center' }}>
                    {

                        _g.custType === '1' ? '卖家注册' :
                            _g.custType === '5' ? '卖家注册' : '错误类型注册'
                    }
                </p>
                {box}
            </div>
        );
    }
}



function customerCheck(user, that, nullCallback) {
    Wapi.customer.get(function (cust) {
        if (cust.data) {//如果有，则校验类型
            user.customer = cust.data;
            if (_g.custType === '10' || user.customer.custTypeId == getCustType()) {//判断类型         
                user._code = 0;
                that.props.success(user);
            } else {//不是，则提示类型不正确，返回登录
                W.loading();
                user._code = 2;
                that.props.success(user);
            }
        } else {//如果没有，则是完善资料流程
            nullCallback ? nullCallback() : null;
        }
    }, {
            uid: user.uid,
            access_token: user.access_token,
            appId: WiStorm.config.objectId
        });
}

function getCustType() {
    let t = parseInt(_g.custType);
    let type = [1, 5, 8,];
    if (type.includes(t))
        return t;
    else
        return;
}

export default AgentShowBox;