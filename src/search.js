import React, { Component } from 'react'
// import { ReactDOM } from 'react-dom'
// import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './_theme/default';
import WMap from './_modules/WMap';
import Wapi from './_modules/Wapi'
import Sonpage from './_component/base/sonPage';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import VerificationCode from './_component/base/verificationCode';
import VerificationOrig from './_component/base/verificationOrig';
import Input from './_component/base/input';
// import {ThemeProvider} from './_theme/defalut'

const thisView = window.LAUNCHER.getView();
thisView.setTitle('附近搜索')
thisView.addEventListener('load', () => {
    ReactDOM.render(<App />, thisView);
})

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            cust: null
        }
        this.mapinit = this.mapinit.bind(this);
        this.getMk = this.getMk.bind(this);
        this.delOverlay = this.delOverlay.bind(this);
        this.addOverlay = this.addOverlay.bind(this);
        this.select = this.select.bind(this);
        this.back = this.back.bind(this);
    }
    componentDidMount() {
        if (typeof WMap != 'undefined' && WMap.ready) {//已经加载好
            this.mapinit();
        } else {
            window.addEventListener('W.mapready', this.mapinit);
        }
    }
    mapinit() {
        this.map = new WMap.Map('Map');
        let _this = this;
        var myGeo = new WMap.Geocoder();
        var geolocation = new WMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new WMap.Marker(r.point);
                _this.map.addOverlay(mk);
                _this.map.panTo(r.point);
                _this.map.centerAndZoom((r.point.lng, r.point.lat), 16);
                // alert('您的位置：'+r.point.lng+','+r.point.lat);
                let loc = '!' + r.point.lng + '@' + r.point.lat + '@1000'
                Wapi.customer.list(res => {
                    // console.log(res.data)
                    _this.getMk(res.data)
                }, {
                        loc: loc
                    })
            }
            else {
                alert('failed' + this.getStatus());
            }
        }, { enableHighAccuracy: true })
        if (WiStorm.agent.mobile) {
            this.map.addControl(new WMap.NavigationControl({ type: BMAP_NAVIGATION_CONTROL_ZOOM, anchor: BMAP_ANCHOR_BOTTOM_RIGHT, offset: new WMap.Size(5, 20) }));//添加缩放控件
        } else
            this.map.enableScrollWheelZoom();//启用滚轮放大缩小
        this.forceUpdate();

        this.map.addEventListener("dragend", function () {
            _this.delOverlay()
            var center = _this.map.getCenter(); //地图中心点   
            let mk = _this.addOverlay(center)  //添加标注
            let loc = '!' + center.lng + '@' + center.lat + '@1000'
            Wapi.customer.list(res => {
                _this.getMk(res.data)
            }, {
                    loc: loc
                })
        });
    }

    getMk(data) {
        console.log(data, 'data')
        let _this = this
        let opts = {
            width: 250,     // 信息窗口宽度
            height: 200,     // 信息窗口高度
        }
        let custOne = []
        data.forEach((ele, index) => {
            ele.product_price.forEach(e => e.ID == _g.productId ? custOne.push(ele) : null)
        })
        console.log(custOne, 'custOne')
        // let custOne = data.filter(ele => ele.product_price)
        custOne.forEach(ele => {
            var point = new BMap.Point(ele.loc.coordinates[0], ele.loc.coordinates[1]);
            let product = ele.product_price.filter(ele => ele.ID == _g.productId)
            var mk = new WMap.Marker(point);
            this.map.addOverlay(mk);
            var sContent = "<div>" +
                "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>店铺：" + ele.name + "</h4>" +
                "<div style='margin:0 0 5px 0;padding:0.2em 0'><span>产品类别：</span>" +
                "<span>" + product[0].ProductName + "</span></div>" +
                "<div style='margin:0 0 5px 0;padding:0.2em 0'><span>产品价格：</span>" +
                "<span>" + product[0].ContractPrice + "</span></div>" +
                "<h5 style='margin:0 0 5px 0;padding:0.2em 0'>服务说明：</h5>" +
                "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+ele.declare+"</p>" +
                "</div>";

            let div = document.createElement('div');
            let div1 = document.createElement('div');
            div.style.fontSize = '0.24rem';
            div.innerHTML = sContent;
            let b = document.createElement('button');
            b.innerText = "安装产品"
            b.addEventListener('click', () => {
                // console.log('button')
                _this.select(ele)
            })
            div1.style.textAlign = 'center';
            div1.style.marginTop = '20px'
            div1.appendChild(b)
            div.appendChild(div1)
            mk.addEventListener('click', (e) => {
                var p = e.target
                var point = new WMap.Point(p.getPosition().lng, p.getPosition().lat);
                var infoWindow = new WMap.InfoWindow(div, opts);  // 创建信息窗口对象 
                _this.map.openInfoWindow(infoWindow, point);
            })
        })
    }
    addOverlay(point) {
        var mk = new WMap.Marker(point);
        this.map.addOverlay(mk);
        this.map.panTo(point);
        return mk;
    }
    //删除标注
    delOverlay() {
        var allOverlay = this.map.getOverlays();
        for (var i = 0; i < allOverlay.length; i++) {
            this.map.removeOverlay(allOverlay[i])
        }
    }
    select(data) {
        // console.log(111)
        this.setState({ show: true, cust: data })
    }
    back() {
        this.setState({ show: false, cust: null })
    }
    render() {
        let height = window.screen.height;
        // console.log(this.map,'this.map')
        let display = this.state.show ? 'none' : 'block'
        return (<ThemeProvider>
            <div style={{ fontSize: '0.24rem' }}>
                {/* {222} */}
                <div id="Map" style={{ height: height, display: display }}></div>
                {
                    this.state.show ? <Sonpage open={this.state.show} back={this.back}><Install data={this.state.cust} /></Sonpage> : null
                }
            </div>
        </ThemeProvider>)
    }
}

class Install extends Component {
    constructor(props, context) {
        super(props, context);
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 1);
        minDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        maxDate.setHours(0, 0, 0, 0);

        this.state = {
            minDate: minDate,
            maxDate: maxDate,
            autoOk: false,
            disableYearSelection: false,
            value24: new Date(),
            menuVal: parseInt(_g.productId),
            account: null,
            valid_code: null,
        };
        this.changeDate = this.changeDate.bind(this);
        this.handleChangeTimePicker24 = this.handleChangeTimePicker24.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.accountChange = this.accountChange.bind(this);
        this.change = this.change.bind(this);
        this.formData = {
            mobile: null,
            valid_code: null,
            valid_type: 1,
            password: null,
        };
    }
    changeDate(e, date) {
        console.log(e, W.dateToString(date))
    }
    handleChangeTimePicker24(event, date) {
        console.log(date, 'date')
        this.setState({ value24: date });
    };
    handleChange(e, i, v) {
        this.setState({ menuVal: v })
    }
    //输入手机号码
    accountChange(e) {
        // console.log(reg.test(val))
        // let reg=/^[1][3578][0-9]{9}$/;
        let val = e.target.value
        var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(n15[0-3]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        console.log(reg.test(val))
        if (reg.test(val)) {
            console.log(true)
            this.formData['mobile'] = val;
            this.setState({ account: val });
        } else {
            this.setState({ account: null });
            if (val.length == 11) {
                // console.log(1)
                W.alert('请输入正确的手机号码')
            }
        }
    }
    //输入验证码
    change(val, name) {
        console.log(val, name)
        if (val) {
            this.setState({ valid_code: val })
        } else {
            this.setState({ valid_code: null })
        }
        this.formData[name] = val;
    }
    render() {
        console.log(this.formData)
        // console.log(_g)
        // console.log(this.props.data)
        let disabled = true
        let height = window.screen.height;
        let product = this.props.data.product_price || [];
        console.log(this.state.menuVal, 'menuVal')
        let item = product.map((ele, index) => <MenuItem value={ele.ID} key={index} primaryText={ele.ProductName} />)
        console.log(this.state.menuVal, 'menuVal')
        let price = product.filter(ele => ele.ID == this.state.menuVal)
        console.log(price, 'price')
        return (<div style={{ minHeight: height, background: "#f7f7f7" }}>
            <h4 style={{ fontSize: '0.30rem', margin: 0, padding: 0, textAlign: 'center', lineHeight: '0.7rem', color: '#fff', background: '#2196f3' }}>{'预约安装'}</h4>
            <div style={{ fontSize: '.256rem', padding: '10px 10px 0', backgroundColor: '#fff' }}>
                <div style={{ height: 40 }}>
                    <span style={{ display: 'inline-block', lineHeight: '40px', float: 'left' }}>{'预约服务：'}</span>
                    <DropDownMenu
                        value={this.state.menuVal}
                        onChange={this.handleChange}
                        style={{ height: 40, float: 'left' }}
                        labelStyle={{ fontSize: '.256rem', lineHeight: '40px', padding: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 220 }}
                        underlineStyle={{ margin: 0, bottom: 8, marginRight: '-18px' }}
                        iconStyle={{ right: '-20px', top: 10 }}
                        menuStyle={{ width: 'auto' }}
                        autoWidth={false}
                    >
                        {item}
                    </DropDownMenu>
                </div>
                <div style={{ height: 40 }}>
                    <span style={{ display: 'inline-block', lineHeight: '40px', float: 'left' }}>{'安装价格：'}</span>
                    <Input onChange={(e, v) => { console.log(e, v) }} value={price[0].ContractPrice} style={{ fontSize: '.256rem', height: 40, lineHeight: '20px', marginTop: 0, width: '120px' }} inputStyle={{ top: 0 }} name="price" />
                </div>
                <div>
                    <span style={{ display: 'inline-block', lineHeight: '40px' }}>{'预约时间：'}</span>
                    <span>
                        <DatePicker
                            name="date"
                            defaultDate={this.state.minDate}
                            autoOk={this.state.autoOk}
                            minDate={this.state.minDate}
                            maxDate={this.state.maxDate}
                            onChange={this.changeDate}
                            disableYearSelection={this.state.disableYearSelection}
                            style={{ display: 'inline-block' }}
                            textFieldStyle={{ width: '1.5rem', fontSize: '.256rem', height: 40, lineHeight: '20px' }}
                        />
                        <TimePicker
                            format="24hr"
                            name="time"
                            value={this.state.value24}
                            onChange={this.handleChangeTimePicker24}
                            style={{ display: 'inline-block' }}
                            textFieldStyle={{ width: '0.65rem', fontSize: '.256rem', height: 40, lineHeight: '20px', paddingLeft: 5 }}
                        />
                    </span>
                </div>

            </div>
            <div style={{ backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', padding: '3px 10px', borderBottom: '1px solid #dddddd' }}>
                    <input
                        name='account'
                        type='tel'
                        placeholder={___.phone_num}
                        style={{ width: '100%', height: '40px', fontSize: '.256rem', border: 'none', outline: 'none' }}
                        onChange={this.accountChange}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', padding: '3px 10px' }}>
                    <VerificationCode
                        name='valid_code'
                        type={1}
                        account={this.state.account}
                        onSuccess={this.change}
                        onChange={this.change}
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div style={{ fontSize: '.26rem', textAlign: 'center', marginTop: 30 }}>
                <RaisedButton disabled={disabled} label={'确认预约'} primary={true} labelStyle={{ fontSize: '.24rem' }} style={{}} onClick={this.cusSave} labelColor='#eee' />
            </div>
        </div>)
    }
}