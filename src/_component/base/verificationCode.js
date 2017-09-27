import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Input from './input';
import FlatButton from 'material-ui/FlatButton';

let sty = {
    box: {
        position: 'relative'
    },
    b: {
        position: 'absolute',
        right: '0px',
        bottom: '5px'
    },
    input:{
        width:'100%',
        height:'40px',
        fontSize:'0.256rem',
        border:'none',
        outline:'none'
    }
}

class VerificationCode extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            code_err: null,
            second: 0
        }
        this.change = this.change.bind(this);
        this.getCode = this.getCode.bind(this);
        this.accountFormat = false;
    }
    componentDidMount() {
        // this.checkMobile(this.props.account);
        if(this.props.account){
            this.accountFormat = true
        }
    }
    componentWillUnmount() {
        clearInterval(this._time_id);
    }
    componentWillReceiveProps(nextProps) {
        // this.checkMobile(nextProps.account);
        if(nextProps.account){
            this.accountFormat = true;
        }
    }
    // componentWillUnmount() {
    //     clearInterval(this._time_id);
    // }


    change(e) {
        let val=e.target.value;
        let that = this;
        if (val.length == (this.props.length || 4)) {
            let data = {
                valid_type: this.props.type,
                valid_code: val
            }
            data[this.props.accountType || 'mobile'] = this.props.account;
            Wapi.comm.validCode(function (res) {
                console.log(res,'res')
                if (res.status_code) {
                    W.errorCode(res);
                    return;
                }
                if (res.valid) {
                    that.setState({ code_err: null });
                    that.props.onSuccess(val, that.props.name);
                } else {
                    that.setState({ code_err: ___.code_err });
                    W.alert(___.code_err)
                }
            }, data);
            // if (this.props.onChange) {
            //     this.props.onChange(val, this.props.name);
            // }
        }
    }
    getCode() {
        if (!this.props.account) {
            W.alert(___.phone_empty);
            return;
        }
        let that = this;
        that.setState({ second: 60 });
        that._time_id = setInterval(function () {
            if (that.state.second > 0)
                that.setState({ second: that.state.second - 1 });
            else
                clearInterval(that._time_id);
        }, 1000);

        let send = (this.props.accountType && this.props.accountType == 'email') ? 'sendEmail' : 'sendSMS';
        Wapi.comm[send](function (res) {
            if (res.status_code) {
                clearInterval(that._time_id);
                that.setState({ second: 0 });
                W.errorCode(res);
                return;
            }
        }, this.props.account, this.props.type);
    }

    render() {
        let box = Object.assign({}, sty.box, this.props.style);
        // console.log({...this.props},'tis.props')
        // let inputStyle = [style1, underlineStyle, underlineFocusStyle, inputStyle, hintStyle, floatingLabelStyle, floatingLabelFocusStyle ] = this.props
        // let {labelStyle,style2} = this.props
        // console.log(inputStyle,labelStyle)
        return (
            <div style={box}>
                <input
                    placeholder={___.verification_code}
                    onChange={this.change}
                    type="tel"
                    style={sty.input}
                />
                <FlatButton
                    label={this.state.second || ___.getCode}
                    primary={!this.state.second}
                    disabled={!!this.state.second || !this.accountFormat}
                    onClick={this.getCode}
                    style={sty.b}
                />
            </div>
        );
    }
}

export default VerificationCode;