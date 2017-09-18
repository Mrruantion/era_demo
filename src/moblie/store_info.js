import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { ThemeProvider } from '../_theme/default';

import TextField from 'material-ui/TextField';
import AreaSelect from '../_component/base/areaSelect';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import SonPage from '../_component/base/sonPage';
import ActionSearch from 'material-ui/svg-icons/action/search';
import WMap from '../_modules/WMap';
import Checkbox from 'material-ui/Checkbox';
import ImageAdjust from 'material-ui/svg-icons/image/adjust';
import Area from '../test/_areaData';
import Input from '../_component/base/input';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

require('../_sass/store_info.scss');

const thisView = window.LAUNCHER.getView()
thisView.setTitle("门店资料");
thisView.addEventListener('load', function () {
    ReactDOM.render(<App />, thisView);
});
const styles = {
    select: {
        overflow: 'hidden',
        width: '33%',
        verticalAlign: 'bottom',
        textAlign: 'left',
    },
    babel: {
        paddingRight: '20px',
        fontSize:'0.24rem'
    },
    menuItem: {
        paddingLeft: '5px'
    }
}
class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.fromData = {};
        this.getPoi = this.getPoi.bind(this);
        this.handleclick = this.handleclick.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.yyzz = {};
        this.wdzp = [];
    }
    change() {
        // console.log(1)
    }
    getChildContext() {
        return {
            getPoi: this.getPoi
        }
    }
    getPoi(a, b, callback) {
        console.log(1);
        console.log(a, b)
        // Wapi.area.get(res => {
        //     console.log(res, 'get area')
        //     let area = {
        //         province: a.province,
        //         provinceId: res.data.provinceId,
        //         city: a.city,
        //         cityId: res.data.parentId,
        //         area: a.area,
        //         areaId: res.data.id
        //     }
        //     this.area = area;
        //     this.address = b;
        //     callback();
        //     this.fromData['address'] = b;
        //     this.fromData['area'] = area;
        //     this.forceUpdate();
        // }, {
        //         name: a.area
        //     })
        let res = Area.filter(ele => ele.areaName == a.area)[0];
        // console.log(res,'area')
        let area = {
            province: a.province,
            provinceId: res.provinceId,
            city: a.city,
            cityId: res.parentId,
            area: a.area,
            areaId: res.id
        }
        this.area = area;
        this.address = b;
        callback();
        this.fromData['address'] = b;
        this.fromData['area'] = area;
        this.forceUpdate();

    }
    handleclick(id, type) {
        let name = 'up' + id
        document.getElementById(name).click();
        let _this = this;
        document.getElementById(name).addEventListener('change', e => {
            _this.fileUpload(e, type, id)
        })
        // console.log(name)
        // document.querySelector(name).click();
        // console.log(document.getElementById(name))
    }
    fileUpload(e, types, id) {
        let imgData = {};
        let h = e.target;
        if (!h.files.length) {
            W.alert("未选择文件");
            return;
        }
        var type = h.value.split('.').pop().toLocaleLowerCase();
        var file = h.files[0];
        console.log(file, 'file')
        imgData.name = file.name;
        if ((type != "jpg" && type != "png" && type != "jpeg")) {
            h.value = "";
            h.files = null;
            W.alert("抱歉，仅支持的jpg或png或者jpeg图片");
            return;
        }
        W.loading(true, "正在上传文件，请稍等");
        let _this = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var data = e.target.result;
            var mb = (e.total / 1024) / 1024;
            console.log(mb, e.total, 'dddff')
            if (mb >= 2) {
                W.loading(false)
                W.alert('文件大小大于2M，无法上传！');
                return;
            }
            //加载图片获取图片真实宽度和高度
            var image = new Image();
            image.src = data;
            image.onload = function () {
                // var width = image.width;
                // var height = image.height;
                // imgData.size = width+'*'+height;
                Wapi.file.upload(res => {
                    W.loading(false);
                    if (res && res.status_code) {
                        W.errorCode(res);
                        return;
                    }
                    imgData.imgUrl = res.image_file_url;
                    if (types == 1) {
                        _this.small.push(imgData)
                    } else if (types === 2) {
                        _this.big.push(imgData)
                    }
                    _this.forceUpdate();
                    _this.showImg(imgData)
                }, file, function (s) {
                    W.loading(true, "正在上传文件，请稍等……" + parseInt(s * 100) + '%');
                });
            };

        };
    }
    render() {
        // console.log(this.area,'this.area');
        let imgSrc = "http://f.kalali.cn/img/default/2017/04/19/d61189c36ed44d3f8757d3cc4f867616.jpg@800"
        let storeType = [{ "ID": 1, "TypeName": "影音网会员店" }, { "ID": 2, "TypeName": "音响改装店" }, { "ID": 3, "TypeName": "导航销售店" }, { "ID": 4, "TypeName": "汽车用品店" }, { "ID": 5, "TypeName": "汽车美容店" }, { "ID": 6, "TypeName": "汽车修理厂" }, { "ID": 7, "TypeName": "4S店" }, { "ID": 8, "TypeName": "汽车装潢店" }, { "ID": 9, "TypeName": "汽贸店" }, { "ID": 10, "TypeName": "技服佳" }, { "ID": 11, "TypeName": "批发商" }, { "ID": 12, "TypeName": "二手车" }, { "ID": 13, "TypeName": "汽车电子" }]
        let storeType_ops = storeType.map((ele, index) => <MenuItem innerDivStyle={styles.menuItem} value={ele.ID} key={index} primaryText={ele.TypeName} />)
        let noItem = []; noItem=[imgSrc,imgSrc,imgSrc,imgSrc,imgSrc,imgSrc,imgSrc,imgSrc];
        this.wdzp.length ? noItem = this.wdzz : null;
        let item = noItem.map((ele, i) => {
            if (i <= 1) {
                return (<li key={i}>
                    <input type="file" accept="image/*" name="img" hidden="hidden" id={'up' + i} />
                    <div className="upload-placeholder" onClick={() => this.handleclick(i, 1)}>
                        <img src={ele||imgSrc} width='100%' />
                    </div>
                    <div className="name">{'门头'}</div>
                </li>)
            } else if (i <= 3) {
                return (<li key={i}>
                    <input type="file" accept="image/*" name="img" hidden="hidden" id={'up' + i} />
                    <div className="upload-placeholder" onClick={() => this.handleclick(i, 1)}>
                        <img src={ele||imgSrc} width='100%' />
                    </div>
                    <div className="name">{'产品'}</div>
                </li>)
            } else if (i <= 5) {
                return (<li key={i}>
                    <input type="file" accept="image/*" name="img" hidden="hidden" id={'up' + i} />
                    <div className="upload-placeholder" onClick={() => this.handleclick(i, 1)}>
                        <img src={ele||imgSrc} width='100%' />
                    </div>
                    <div className="name">{'店内'}</div>
                </li>)
            } else if (i <= 7) {
                return (<li key={i}>
                    <input type="file" accept="image/*" name="img" hidden="hidden" id={'up' + i} />
                    <div className="upload-placeholder" onClick={() => this.handleclick(i, 1)}>
                        <img src={ele||imgSrc} width='100%' />
                    </div>
                    <div className="name">{'工位'}</div>
                </li>)
            }
        })
        // console.log(item)
        return (
            <ThemeProvider>
                <div style={{ background: '#f7f7f7', minHeight: '100vh',fontSize:'.24rem' }}>
                    <div style={{ padding: 5 }}>
                        <div style={{ height: 50, background: '#2196f3', color: '#fff', lineHeight: '50px', borderRadius: '5px 5px 0 0', paddingLeft: 20 }}>{'基本信息：'}</div>
                        <div style={{ background: '#fff' }}>
                            <div>
                                <span style={{ display: 'inline-block', lineHeight: '48px', float: 'left', width: '25%' }}>{'网点名称：'}</span>
                                <TextField
                                    defaultValue={_user.customer.name}
                                    style={{width:'auto'}}
                                    inputStyle={styles.babel}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <span style={{ display: 'inline-block', lineHeight: '48px', float: 'left', width: '15%' }}>{'地址：'}</span>
                                <AreaSelect onChange={this.change} value={this.area} style={{ width: '85%', display: 'inline-block' }} />
                                <Position style={{ position: 'absolute', top: 12, right: 5 }} />
                                <Input value={this.address} name='address' onChange={this.change} hintText={___.address} />
                            </div>
                            <div>
                                <span style={{ display: 'inline-block', lineHeight: '48px', float: 'left', width: '25%' }}>{'门店性质：'}</span>
                                <SelectField
                                    style={styles.select}
                                    labelStyle={styles.babel}
                                >
                                    <MenuItem innerDivStyle={styles.menuItem} value={-1} key={-1} primaryText='选择门店性质' />
                                    {storeType_ops}
                                </SelectField>
                            </div>
                            <div>
                                <span style={{ display: 'inline-block', lineHeight: '48px', float: 'left', width: '25%' }}>{'门店电话：'}</span>
                                <TextField
                                    defaultValue={_user.customer.tel}
                                    style={{width:'auto'}}
                                    inputStyle={styles.babel}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: 5 }} className="upload-img1">
                        <div style={{ height: 50, background: '#2196f3', color: '#fff', lineHeight: '50px', borderRadius: '5px 5px 0 0', paddingLeft: 20 }}>{'营业执照：'}</div>
                        <li style={{ height: 'auto' }}>
                            <input type="file" accept="image/*" name="img" hidden="hidden" id="up8" />
                            <div className="upload-placeholder" onClick={() => this.handleclick(8, 1)}>
                                <img src={imgSrc} width='100%' />
                            </div>
                            <div className="name">{'营业执照'}</div>
                        </li>
                    </div>
                    <div style={{ padding: 5 }}>
                        <div style={{ height: 50, background: '#2196f3', color: '#fff', lineHeight: '50px', borderRadius: '5px 5px 0 0', paddingLeft: 20 }}>{'网店图片：'}</div>
                        <div className="upload-img">
                            <ul style={{listStyle:'none',padding:0}}>
                                {item}
                            </ul>
                        </div>
                    </div>
                </div>
            </ThemeProvider>)
    }
}
App.childContextTypes = {
    getPoi: React.PropTypes.func
}


class Position extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            opo: false
        }
        this.map = null;
        this.mapinit = this.mapinit.bind(this);
        this.back = this.back.bind(this);
    }
    componentDidMount() {

    }

    mapinit() {

        //  console.log(123);
        this.setState({ opo: true })
    }
    back() {
        this.setState({ opo: false })
    }
    render() {
        return (
            <div {...this.props}>
                <span onClick={this.mapinit}><MapsPlace /></span>
                {/* <div id="allmap" style={this.state.opo?{display:'block'}:{display:'none'}}></div> */}
                <SonPage open={this.state.opo} back={this.back}>
                    {/* <Maps /> */}
                    {this.state.opo ? <Maps back={this.back} /> : <div></div>}
                </SonPage>
            </div>
        )
    }
}

class Maps extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            Pois: null,
            searchD: null,
            target: ''
        }
        this.search = this.search.bind(this);
        this.select = this.select.bind(this);
        this.mapinit = this.mapinit.bind(this);
        this.selectS = this.selectS.bind(this);
        this.change = this.change.bind(this);
        this.addOverlay = this.addOverlay.bind(this);
        this.delOverlay = this.delOverlay.bind(this);
        this.submit = this.submit.bind(this);
        this.flat = null;
    }
    componentDidMount() {
        if (typeof WMap != 'undefined' && WMap.ready) {//已经加载好
            this.mapinit();
        } else {
            window.addEventListener('W.mapready', this.mapinit);
        }
    }
    //初始化定位/拖拽
    mapinit() {
        this.flat = -1;
        this.map = new WMap("allmap");
        var myGeo = new WMap.Geocoder();
        this.setState({ searchD: null })
        if (WiStorm.agent.mobile) {
            // alert(1)
            this.map.addControl(new WMap.NavigationControl({ type: BMAP_NAVIGATION_CONTROL_ZOOM, anchor: BMAP_ANCHOR_BOTTOM_RIGHT, offset: new WMap.Size(5, 20) }));//添加缩放控件
        } else {
            this.map.enableScrollWheelZoom();//启用滚轮放大缩小
        }
        let that = this
        this.map.centerAndZoom(new WMap.Point(114.025974, 22.546054), 11)
        //定位
        var geolocation = new WMap.Geolocation();
        console.log(geolocation)
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                that.setState({ searchD: null })
                that.addOverlay(r.point)
                that.map.centerAndZoom(new WMap.Point(r.point.lng, r.point.lat), 15);
                myGeo.getLocation(new WMap.Point(r.point.lng, r.point.lat), function (result) {
                    // console.log(result,'result')
                    result.isSelec = true;
                    that.setState({ Pois: result })

                });
            }
            else {
                alert('failed' + this.getStatus());
            }
        }, { enableHighAccuracy: true });
        //点击定位
        var geolocationControl = new WMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function (e) {
            // 定位成功事件
            that.setState({ searchD: null })
            that.flat = -1
            that.setState({ target: '' })
            myGeo.getLocation(new WMap.Point(e.point.lng, e.point.lat), function (result) {
                // console.log(result,'result')
                result.isSelec = true;
                // console.log(result,'result')
                that.setState({ Pois: result })

            });
        });
        this.map.addControl(geolocationControl);
        //拖拽位置
        this.map.addEventListener("dragend", function () {
            that.setState({ searchD: null });
            that.flat = -1;
            that.setState({ target: '' })
            that.delOverlay()
            var center = that.map.getCenter(); //地图中心点   
            let mk = that.addOverlay(center)  //添加标注

            myGeo.getLocation(new WMap.Point(center.lng, center.lat), function (result) {
                result.isSelec = true;
                that.setState({ Pois: result })
                var opts = {
                    width: 200,     // 信息窗口宽度
                    height: 100,     // 信息窗口高度
                    title: result.business,
                }
                let addr = null
                if (result.surroundingPois.length) {
                    addr = result.surroundingPois[0].address == " " ? result.address : result.surroundingPois[0].address
                    opts.title = result.surroundingPois[0].title; // 信息窗口标题
                } else {
                    addr = result.address
                }
                var infoWindow = new WMap.InfoWindow(addr, opts);  // 创建信息窗口对象 
                mk.addEventListener("click", function () {
                    that.map.openInfoWindow(infoWindow, center); //开启信息窗口
                });
            });
        });
    }
    //选择定位/拖拽到的地址
    select(index, point) {
        this.flat = index;
        this.delOverlay();
        this.addOverlay(point)
        if (index == -1) {
            this.state.Pois.isSelec = true
            // this.addOverlay(point) 
            this.state.Pois.surroundingPois.forEach((e, ix) => {
                e.isSelec = false;
            })
        } else {
            this.state.Pois.isSelec = false
            // this.addOverlay(point)
            this.state.Pois.surroundingPois.forEach((e, ix) => {
                e.isSelec = false;
                if (index == ix) {
                    e.isSelec = true
                }
            })
        }
        this.setState({ Pois: this.state.Pois })
    }
    //选择搜索到的地址
    selectS(index, point) {
        this.flat = index;
        this.delOverlay();
        this.addOverlay(point)
        this.state.searchD.forEach((e, ix) => {
            e.isSelec = false;
            if (index == ix) {
                e.isSelec = true;
            }
        })
        this.setState({ searchD: this.state.searchD })
    }
    change(e) {
        this.setState({ target: e.target.value })
    }
    //搜索地址
    search(value) {
        // console.log(value)
        this.flat = 0;
        this.setState({ Pois: null })
        var myGeo = new WMap.Geocoder();
        var that = this;
        var options = {
            forceLocal: 'false',
            onSearchComplete: function (results) {
                // 判断状态是否正确
                if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                    // let itme = local.getResults();
                    // console.log(itme)
                    // var s = [];
                    var sData = []
                    for (var i = 0; i < results.getCurrentNumPois(); i++) {
                        let inx = i;
                        myGeo.getLocation(new WMap.Point(results.getPoi(i).point.lng, results.getPoi(i).point.lat), function (re) {
                            console.log(re, 'result')
                            let op = re
                            // op.address = re.address;
                            // op.addressComponents = re.addressComponents;
                            // op.point = re.point;
                            op.title = results.getPoi(inx).title
                            sData.push(op)
                            if (sData.length) {
                                sData[0].isSelec = true
                                that.addOverlay(sData[0].point)
                            }
                            that.setState({ searchD: sData })
                        });
                    }
                }
            }
        };
        var local = new WMap.LocalSearch(this.map, options);
        local.search(value);
    }
    //添加标注
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
    submit() {
        let address1 = null;
        let address2 = null;
        let address3 = null;
        if (this.state.Pois) {
            let addr = this.state.Pois.addressComponents
            address1 = addr.province + addr.city + addr.district;
            address3 = {
                province: addr.province,
                city: addr.city,
                area: addr.district
            }
            if (this.flat == -1) {
                address2 = addr.street + addr.streetNumber
            } else {
                let addrs = this.state.Pois.surroundingPois[this.flat]
                let addre = addrs.address;
                if (addr.district) {
                    if (addrs.address.indexOf(addr.district) > -1) {
                        let ite = addrs.address.split(addr.district)
                        addre = ite[1]
                    } else if (addrs.address.indexOf(addr.city) > -1) {
                        let ite = addrs.address.split(addr.city)
                        addre = ite[1]
                    }
                }
                address2 = addre + addrs.title
            }
        } else if (this.state.searchD) {
            let addr = this.state.searchD[this.flat].addressComponents
            let addrs = this.state.searchD[this.flat]
            address1 = addr.province + addr.city + addr.district;
            address3 = {
                province: addr.province,
                city: addr.city,
                area: addr.district
            }
            let addre = addrs.address;
            if (addr.district) {
                if (addrs.address.indexOf(addr.district) > -1) {
                    let ite = addrs.address.split(addr.district)
                    addre = ite[1]
                } else if (addrs.address.indexOf(addr.city) > -1) {
                    let ite = addrs.address.split(addr.city)
                    addre = ite[1]
                }
            }
            address2 = addre + addrs.title
        }
        console.log(address1, address2)
        this.context.getPoi(address3, address2, this.props.back)
    }

    render() {
        console.log(this.flat, 'how flat')
        let height = (window.screen.height - 40) / 2;
        let width = (window.screen.width - 20) / 3;
        let widths = window.screen.width / 2 - 16;
        console.log(this.state.Pois, 'pois');
        console.log(this.state.searchD, 'searchD')
        let item = [];
        if (this.state.Pois) {
            if (this.state.Pois.surroundingPois.length) {
                item = this.state.Pois.surroundingPois.map((ele, index) => {
                    return (
                        <div onClick={() => this.select(index, ele.point)} key={index} style={{ padding: '5px 10px', paddingRight: '36px', borderBottom: '1px solid #ccc', height: 40, lineHeight: '20px', position: 'relative' }}>
                            <h3 style={{ margin: 0, fontSize: '0.24rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ele.title}</h3>
                            <div style={{ fontSize: '0.23rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ele.address}</div>
                            {
                                ele.isSelec ?
                                    <Checkbox
                                        checkedIcon={<ImageAdjust />}
                                        checked={true}
                                        uncheckedIcon={<ImageAdjust />}
                                        label=""
                                        labelPosition="left"
                                        style={{ position: 'absolute', right: 12, top: 15, width: 40 }}
                                    /> : null
                            }
                        </div>
                    )
                })
            }
            item.unshift(
                <div onClick={() => this.select(-1, this.state.Pois.point)} key={-1} style={{ padding: '5px 10px', paddingRight: '36px', borderBottom: '1px solid #ccc', minHeight: 30, lineHeight: '30px', position: 'relative' }}>
                    <div style={{ fontSize: '0.23rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{this.state.Pois.address}</div>
                    {
                        this.state.Pois.isSelec ?
                            <Checkbox
                                checkedIcon={<ImageAdjust />}
                                checked={true}
                                uncheckedIcon={<ImageAdjust />}
                                label=""
                                labelPosition="left"
                                style={{ position: 'absolute', right: 12, top: 10, width: 40 }}
                            /> : null
                    }
                </div>
            )
        }
        if (this.state.searchD) {
            if (this.state.searchD.length) {
                item = this.state.searchD.map((ele, index) => {
                    return (
                        <div onClick={() => this.selectS(index, ele.point)} key={index} style={{ padding: '5px 10px', paddingRight: '36px', borderBottom: '1px solid #ccc', height: 40, lineHeight: '20px', position: 'relative' }}>
                            <h3 style={{ margin: 0, fontSize: '0.24rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ele.title}</h3>
                            <div style={{ fontSize: '0.23rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ele.address}</div>
                            {
                                ele.isSelec ?
                                    <Checkbox
                                        checkedIcon={<ImageAdjust />}
                                        checked={true}
                                        uncheckedIcon={<ImageAdjust />}
                                        label=""
                                        labelPosition="left"
                                        style={{ position: 'absolute', right: 12, top: 15, width: 40 }}
                                    /> : null
                            }
                        </div>
                    )
                })
            }
        }
        return (
            <div>
                <div style={{ height: '30px', lineHeight: '30px', padding: '5px 10px', background: '#000' }}>
                    <span style={{ display: 'inline-block', width: width, color: '#fff' }}><span onClick={this.props.back}>{'取消'}</span></span>
                    <span style={{ display: 'inline-block', width: width, textAlign: 'center', color: '#fff' }}>{'位置'}</span>
                    <span style={{ display: 'inline-block', width: width, textAlign: 'right', color: '#fff' }}><span onClick={this.submit}>{'确定'}</span></span>
                </div>
                <div>
                    <TextField
                        style={{ width: '90%', height: 38 }}
                        value={this.state.target}
                        hintStyle={{ bottom: 8 }}
                        hintText={(<div style={{ position: 'relative', left: widths }}>{'搜索'}</div>)}
                        underlineStyle={{ bottom: 0 }}
                        underlineFocusStyle={{ bottom: 0 }}
                        onChange={this.change}
                    />
                    <span onClick={() => { this.search(this.state.target) }} style={{ width: '10%', height: 37, borderBottom: '1px solid #ccc', display: 'inline-block', position: 'absolute', textAlign: 'center' }}>
                        <ActionSearch style={{ width: '70%', height: 38, color: "#5acc18" }} />
                    </span>
                </div>
                <div id="allmap" style={{ height: height, width: '100%' }}></div>
                <div style={{ height: height - 38, overflow: 'auto' }} >
                    {item}
                </div>
            </div>
        )

    }
}
Maps.contextTypes = {
    getPoi: React.PropTypes.func
}