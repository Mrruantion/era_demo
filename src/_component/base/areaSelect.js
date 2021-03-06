import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Area from '../../test/_areaData'

const styles = {
    select: {
        overflow: 'hidden',
        width: '28%',
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
const _op = {
    fields: 'id,name,parentId,level'
}

export default class AreaSelect extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            provinces: [],
            province: '',
            provinceId: -1,

            cities: [],
            city: '',
            cityId: -1,

            areas: [],
            area: '',
            areaId: -1
        };
    }
    componentDidMount() {
        // console.log(Area, 'area')
        let _this = this;
        // Wapi.area.list(function(res){
        //     if(res.status_code!=0||res.data.length==0)return;
        //     let prs=res.data;
        //     let province_options=res.data.map(ele=><MenuItem innerDivStyle={styles.menuItem} value={ele.id} key={ele.id} primaryText={ele.name} />);
        //     province_options.unshift(<MenuItem innerDivStyle={styles.menuItem} value={-1} key={-1} primaryText={___.province} />);
        //     _this.province_options=province_options;
        //     _this.setState({
        //         provinces:res.data
        //     });
        // },{level:1},_op);
        let provinces = Area.filter(ele => ele.level == 1)
        let province_options = provinces.map(ele => <MenuItem innerDivStyle={styles.menuItem} value={ele.id} key={ele.id} primaryText={ele.areaName} />);
        province_options.unshift(<MenuItem innerDivStyle={styles.menuItem} value={-1} key={-1} primaryText={___.province} />);
        _this.province_options = province_options;
        _this.setState({
            provinces: provinces
        });
        if (this.props.value) {
            this.setValue(this.props.value);
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.value) {
            this.setValue(newProps.value);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        for (let k in this.state) {
            if (this.state[k] != nextState[k])
                return true;
        }
        return false;
    }

    setValue(value) {
        let e = true;
        for (let k in value) {
            if (this.state[k] != value[k])
                e = false;
        }
        if (e) return;

        let that = this;
        if (value.provinceId && value.provinceId != -1 && value.provinceId != this.state.provinceId) {
            // Wapi.area.list(res => {
            //     if (res.status_code != 0 || res.data.length == 0) return;
            //     that.setState({ cities: res.data });
            // }, { parentId: value.provinceId }, _op);
            let cities = Area.filter(ele => ele.parentId == value.provinceId)
            if (cities.length == 0) return;
            this.setState({ cities: cities })
        }

        if (value.cityId && value.cityId != -1 && value.cityId != this.state.cityId) {
            // Wapi.area.list(res => {
            //     if (res.status_code != 0 || res.data.length == 0) return;
            //     that.setState({ areas: res.data });
            // }, { parentId: value.cityId }, _op);
            let areas = Area.filter(ele => ele.parentId == value.cityId)
            if (areas.length == 0) return;
            this.setState({ areas: areas })
        }

        // console.log(1111111)
        console.log(value,'value')
        this.setState({
            province: value.province,
            provinceId: value.provinceId ? value.provinceId * 1 : -1,
            city: value.city,
            cityId: value.cityId ? value.cityId * 1 : -1,
            area: value.area,
            areaId: value.areaId ? value.areaId * 1 : -1
        });
    }

    provinceChange(e, i, value) {
        if (this.props.selectModel) {
            this.props.select('provinceId', value);
        }
        let areaId = value;
        if (areaId == -1) {
            this.setState({
                province: '',
                provinceId: -1,

                cities: [],
                city: '',
                cityId: -1,

                areas: [],
                area: '',
                areaId: -1
            });
        } else {
            this.setState({
                province: this.state.provinces.find(ele => ele.id == areaId).areaName,
                provinceId: areaId,
                cityId: -1,
                areaId: -1,
                areas: []
            });
            let _this = this;
            // Wapi.area.list(res => this.setState({ cities: res.data }), { parentId: areaId }, _op);
            let cities = Area.filter(ele => ele.parentId == areaId)
            this.setState({ cities: cities })
        }
    }
    cityChange(e, i, value) {
        if (this.props.selectModel) {
            this.props.select('cityId', value);
        }
        let areaId = value;
        if (areaId == -1) {
            this.setState({
                city: '',
                cityId: -1,

                areas: [],
                area: '',
                areaId: -1
            });
        } else {
            this.setState({
                city: this.state.cities.find(ele => ele.id == areaId).areaName,
                cityId: areaId,
                areaId: -1,
            });
            let _this = this;
            // Wapi.area.list(function (res) {
            //     if (res.status_code != 0 || res.data.length == 0) return;
            //     let ads = res.data;
            //     if (ads.length == 0) {
            //         let data = {
            //             province: this.state.province,
            //             provinceId: this.state.provinceId,
            //             cityId: this.state.cityId,
            //             city: this.state.city,
            //         }
            //         _this.props.onChange(data, _this.props.name);
            //     } else {
            //         _this.setState({ areas: ads });
            //     }
            // }, { parentId: areaId }, _op);
            let areas = Area.filter(ele => ele.parentId == areaId);
            if (areas.length == 0) return;
            if (areas.length == 0) {
                let data = {
                    province: this.state.province,
                    provinceId: this.state.provinceId,
                    cityId: this.state.cityId,
                    city: this.state.city
                }
                this.props.onChange(data, this.props.name)
            } else {
                this.setState({ areas: areas })
            }

        }
    }
    areaChange(e, i, value) {
        if (this.props.selectModel) {
            this.props.select('areaId', value);
        }
        let areaId = value;
        if (areaId == -1) {
            this.setState({
                area: '',
                areaId: -1
            });
        } else {
            let name = this.state.areas.find(ele => ele.id == areaId).areaName;
            this.setState({
                area: name,
                areaId: areaId
            });
            let data = {
                provinceId: this.state.provinceId,
                province: this.state.province,
                cityId: this.state.cityId,
                city: this.state.city,
                area: name,
                areaId: areaId
            }
            this.props.onChange(data, this.props.name);
        }
    }
    render() {
        console.log(this.province_options,'province')
        console.log(this.state.cities)
        let city_options = [];
        if (this.state.cities.length > 0)
            city_options = this.state.cities.map(ele => <MenuItem innerDivStyle={styles.menuItem} value={ele.id} key={ele.id} primaryText={ele.areaName} />);
        city_options.unshift(<MenuItem innerDivStyle={styles.menuItem} value={-1} key={-1} primaryText={___.city} />);
        console.log(city_options,'city_o')
        let area_options = [];
        if (this.state.areas.length > 0)
            area_options = this.state.areas.map(ele => <MenuItem innerDivStyle={styles.menuItem} value={ele.id} key={ele.id} primaryText={ele.areaName} />);
        area_options.unshift(<MenuItem innerDivStyle={styles.menuItem} value={-1} key={-1} primaryText={___.area} />);
        return (
            <div {...this.props}>
                <SelectField
                    value={this.state.provinceId}
                    onChange={this.provinceChange.bind(this)}
                    style={styles.select}
                    labelStyle={styles.babel}
                >
                    {this.province_options}
                </SelectField>

                <SelectField
                    value={this.state.cityId}
                    onChange={this.cityChange.bind(this)}
                    style={styles.select}
                    labelStyle={styles.babel}
                >
                    {city_options}
                </SelectField>

                <SelectField
                    value={this.state.areaId}
                    onChange={this.areaChange.bind(this)}
                    style={styles.select}
                    labelStyle={styles.babel}
                >
                    {area_options}
                </SelectField>
            </div>
        )
    }
}

/*export default class AreaSelect extends Component{
    constructor(props,context) {
        super(props,context);
        this.state={
            provinces:[],
            province:'',
            provinceId:-1,

            cities:[],
            city:'',
            cityId:-1,

            areas:[],
            area:'',
            areaId:-1
        };
    }
    componentDidMount() {
        console.log(Area,'area')
        let _this=this;
        Wapi.area.list(function(res){
            if(res.status_code!=0||res.data.length==0)return;
            let prs=res.data;
            let province_options=res.data.map(ele=><MenuItem innerDivStyle={styles.menuItem} value={ele.id} key={ele.id} primaryText={ele.name} />);
            province_options.unshift(<MenuItem innerDivStyle={styles.menuItem} value={-1} key={-1} primaryText={___.province} />);
            _this.province_options=province_options;
            _this.setState({
                provinces:res.data
            });
        },{level:1},_op);
        if(this.props.value){
            this.setValue(this.props.value);
        }
    }
    componentWillReceiveProps(newProps){
        if(newProps.value){
            this.setValue(newProps.value);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        for(let k in this.state){
            if(this.state[k]!=nextState[k])
                return true;
        }
        return false;
    }
    
    setValue(value){
        let e=true;
        for(let k in value){
            if(this.state[k]!=value[k])
                e=false;
        }
        if(e)return;

        let that=this;
        if(value.provinceId&&value.provinceId!=-1&&value.provinceId!=this.state.provinceId){
            Wapi.area.list(res=>{
                if(res.status_code!=0||res.data.length==0)return;
                that.setState({cities:res.data});
            },{parentId:value.provinceId},_op);
        }
            
        if(value.cityId&&value.cityId!=-1&&value.cityId!=this.state.cityId){
            Wapi.area.list(res=>{
                if(res.status_code!=0||res.data.length==0)return;
                that.setState({areas:res.data});
            },{parentId:value.cityId},_op);
        }
            

        this.setState({
            province:value.province,
            provinceId:value.provinceId?value.provinceId*1:-1,
            city:value.city,
            cityId:value.cityId?value.cityId*1:-1,
            area:value.area,
            areaId:value.areaId?value.areaId*1:-1
        });
    }
    
    provinceChange(e,i,value){
        if(this.props.selectModel){
            this.props.select('provinceId',value);
        }
        let areaId=value;
        if(areaId==-1){
            this.setState({
                province:'',
                provinceId:-1,

                cities:[],
                city:'',
                cityId:-1,

                areas:[],
                area:'',
                areaId:-1
            });
        }else{
            this.setState({
                province:this.state.provinces.find(ele=>ele.id==areaId).name,
                provinceId:areaId,
                cityId:-1,
                areaId:-1,
                areas:[]
            });
            let _this=this;
            Wapi.area.list(res=>this.setState({cities:res.data}),{parentId:areaId},_op);
        }
    }
    cityChange(e,i,value){
        if(this.props.selectModel){
            this.props.select('cityId',value);
        }
        let areaId=value;
        if(areaId==-1){
            this.setState({
                city:'',
                cityId:-1,

                areas:[],
                area:'',
                areaId:-1
            });
        }else{
            this.setState({
                city:this.state.cities.find(ele=>ele.id==areaId).name,
                cityId:areaId,
                areaId:-1,
            });
            let _this=this;
            Wapi.area.list(function(res){
                if(res.status_code!=0||res.data.length==0)return;
                let ads=res.data;
                if(ads.length==0){
                    let data={
                        province:this.state.province,
                        provinceId:this.state.provinceId,
                        cityId:this.state.cityId,
                        city:this.state.city,
                    }
                    _this.props.onChange(data,_this.props.name);
                }else{
                    _this.setState({areas:ads});
                }
            },{parentId:areaId},_op);
        }
    }
    areaChange(e,i,value){
        if(this.props.selectModel){
            this.props.select('areaId',value);
        }
        let areaId=value;
        if(areaId==-1){
            this.setState({
                area:'',
                areaId:-1
            });
        }else{
            let name=this.state.areas.find(ele=>ele.id==areaId).name;
            this.setState({
                area:name,
                areaId:areaId
            });
            let data={
                provinceId:this.state.provinceId,
                province:this.state.province,
                cityId:this.state.cityId,
                city:this.state.city,
                area:name,
                areaId:areaId
            }
            this.props.onChange(data,this.props.name);
        }
    }
    render(){
        let city_options=[];
        if(this.state.cities.length>0)
            city_options=this.state.cities.map(ele=><MenuItem innerDivStyle={styles.menuItem} value={ele.id} key={ele.id} primaryText={ele.name} />);
        city_options.unshift(<MenuItem innerDivStyle={styles.menuItem} value={-1} key={-1} primaryText={___.city} />);

        let area_options=[];
        if(this.state.areas.length>0)
            area_options=this.state.areas.map(ele=><MenuItem innerDivStyle={styles.menuItem} value={ele.id} key={ele.id} primaryText={ele.name} />);
        area_options.unshift(<MenuItem innerDivStyle={styles.menuItem} value={-1} key={-1} primaryText={___.area} />);
        return(
            <div {...this.props}>
                <SelectField
                    value={this.state.provinceId}
                    onChange={this.provinceChange.bind(this)}
                    style={styles.select}
                    labelStyle={styles.babel}
                >
                    {this.province_options}
                </SelectField>

                <SelectField
                    value={this.state.cityId}
                    onChange={this.cityChange.bind(this)}
                    style={styles.select}
                    labelStyle={styles.babel}
                >
                    {city_options}
                </SelectField>

                <SelectField
                    value={this.state.areaId}
                    onChange={this.areaChange.bind(this)}
                    style={styles.select}
                    labelStyle={styles.babel}
                >
                    {area_options}
                </SelectField>
            </div>
        )
    }
}*/