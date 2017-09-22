import React, { Component } from 'react'
// import { ReactDOM } from 'react-dom'
// import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './_theme/default';
import WMap from './_modules/WMap';
import Wapi from './_modules/Wapi'
// import {ThemeProvider} from './_theme/defalut'

const thisView = window.LAUNCHER.getView();
thisView.setTitle('附近搜索')
thisView.addEventListener('load', () => {
    ReactDOM.render(<App />, thisView);
})

class App extends Component {
    constructor(props,context){
        super(props,context)
        this.mapinit = this.mapinit.bind(this);
    }
    componentDidMount() {
        if(typeof WMap!='undefined'&&WMap.ready){//已经加载好
            this.mapinit();
        }else{
            window.addEventListener('W.mapready',this.mapinit);
        }
    }
    mapinit(){
        this.map = new WMap.Map('Map');
        let _this = this;
        var geolocation = new WMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new WMap.Marker(r.point);
                _this.map.addOverlay(mk);
                _this.map.panTo(r.point);
                _this.map.centerAndZoom((r.point.lng,r.point.lat),16);
                // alert('您的位置：'+r.point.lng+','+r.point.lat);
                let loc = '!'+r.point.lng+'@'+r.point.lat+'@1000'
                Wapi.customer.list(res => {
                    console.log(res.data)
                },{
                    loc:loc
                })
                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                mk.addEventListener('click',e => {
                    // openInfo('ddfd',e)
                })
            }
            else {
                alert('failed'+this.getStatus());
            }        
        },{enableHighAccuracy: true})
        // if(lastCenter){
            // this.map.centerAndZoom((111,22),5);
        // }
        if(WiStorm.agent.mobile){
            this.map.addControl(new WMap.NavigationControl({type:BMAP_NAVIGATION_CONTROL_ZOOM,anchor:BMAP_ANCHOR_BOTTOM_RIGHT,offset: new WMap.Size(5, 20)}));//添加缩放控件
        }else
            this.map.enableScrollWheelZoom();//启用滚轮放大缩小
        this.map.infoWindow=new WMap.InfoWindow('地址：北京市东城区正义路甲5号',{
            width : 350,     // 信息窗口宽度
            height: 200     // 信息窗口高度
        });
        // let div=document.createElement('div');
        // this.map.infoWindow.setContent(div);
        // this.map.infoWindow._div=div;
        // this.map.infoWindow._close=function(){};
        // this.map.infoWindow.addEventListener('close',function(){
        //     if(this._close)
        //         this._close();
        // })
        this.forceUpdate();
    }
    render(){
        let height = window.screen.height;
        return(<ThemeProvider>
           <div style={{fontSize:'0.24rem'}}>
               {/* {222} */}
               <div id="Map" style={{height:height}}></div>
            </div>
        </ThemeProvider>)
    }
}