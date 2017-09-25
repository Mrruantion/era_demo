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
        data.forEach(ele => {
            var point = new BMap.Point(ele.loc.coordinates[0], ele.loc.coordinates[1]);
            var mk = new WMap.Marker(point);
            this.map.addOverlay(mk);
            var sContent = "<div>" +
                "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>店铺：" + ele.name + "</h4>" +
                "<h5 style='margin:0 0 5px 0;padding:0.2em 0'>服务说明：</h5>" +
                "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" +
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
            menuVal: 0
        };
        this.changeDate = this.changeDate.bind(this);
        this.handleChangeTimePicker24 = this.handleChangeTimePicker24.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    changeDate(e, date) {
        console.log(e, W.dateToString(date))
    }
    handleChangeTimePicker24(event, date) {
        console.log(date, 'date')
        this.setState({ value24: date });
    };
    handleChange(e, v) {
        this.setState({ menuVal: v })
    }
    render() {
        console.log(this.props.data)
        let height = window.screen.height;
        let product = this.props.data.product_price;
        product = product.map((ele, index) => <MenuItem value={index} key={index} primaryText={ele.ProductName} />)

        return (<div style={{ minHeight: height, background: "#f7f7f7" }}>
            <h4 style={{ fontSize: '0.30rem', margin: 0, padding: 0, textAlign: 'center' }}>{'预约安装'}</h4>
            <div style={{ fontSize: '.256rem', padding: '0 10px' }}>
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
                <div>
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
                        {product}
                    </DropDownMenu>
                </div>
            </div>
        </div>)
    }
}