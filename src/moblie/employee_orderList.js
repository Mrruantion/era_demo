import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ThemeProvider from '../_theme/default'
const thisView = window.LAUNCHER.getView()

thisView.setTitle('我的订单')
thisView.addEventListener('load', () => {
    ReactDOM.render(<App />, thisView)
})

import orderlist from '../test/_orderList'

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            status: 0
        }
        this.changeStatus = this.changeStatus.bind(this);
    }
    componentDidMount() {
        // console.log(this.refs.main,'refs')
        // console.log(this.refs.init,'ninit')
        console.log(orderlist)
    }
    changeStatus(status) {
        // if(status ==)
        this.setState({ status })
    }
    render() {
        let style = {
            main: { position: 'relative', float: 'left', width: '49%', height: '.71rem', border: '1px solid #00a1ff', boxSizing: 'border-box', lineHeight: '.71rem', fontSize: '.26rem', textAlign: 'center' },
            left: { borderRadius: '.14rem 0 0 .14rem' },
            right: { borderRadius: '0 .14rem .14rem 0' },
            active: { background: '#00a1ff', color: '#fff' }
        }
        let finished = orderlist.filter(ele => ele.OrderStatus == 8)
        let unfinished = orderlist.filter(ele => ele.OrderStatus == 4)
        console.log(finished, 'finished')
        console.log(unfinished, 'unfinished')
        let left = !this.state.status ? Object.assign({}, style.main, style.left, style.active) : Object.assign({}, style.main, style.left)
        let right = this.state.status ? Object.assign({}, style.main, style.right, style.active) : Object.assign({}, style.main, style.right)

        let showItems = this.state.status ? finished : unfinished
        let item = showItems.map((ele, index) => {
            return (<div style={{ position: 'relative', paddingBottom: '.24rem', overflow: 'hidden' }}>
                <div style={{ height: '.64rem', lineHeight: '.64rem', textAlign: 'center', background: '#00a1ff', borderRadius: '.14rem .14rem 0 0', color: '#fff' }}>
                    {'订单号：'}<span style={{ paddingLeft: '.3rem' }}>{ele.ID}</span>
                </div>
                <div style={{ background: '#fff', color: '#555', padding: '.12rem 0 .19rem' }}>
                    <p style={{ margin: 0 }}>
                        <span style={{float:'left',width:'28%',textAlign:'right'}}>{'电话：'}</span>
                        <span style={{width:'72%',paddingLeft:'5%'}}>{ele.CardOwerName}</span>
                    </p>
                    <p style={{ margin: 0 }}>
                        <span style={{float:'left',width:'28%',textAlign:'right'}}>{'电话：'}</span>
                        <span style={{width:'72%',paddingLeft:'5%'}}>{ele.CardOwerMobile}</span>
                    </p>
                </div>
            </div>)
        })
        return (
            <ThemeProvider>
                <div style={{ fontSize: '.256em', minHeight: 667, background: '#f7f7f7' }}>
                    {/* <div><span>{'待完工'}</span><span>{'已完工'}</span></div> */}
                    <div style={{ height: 45, lineHeight: '45px', textAlign: 'center', background: '#00a1ff', color: '#fff', marginBottom: 20 }}>{'订单列表'}</div>
                    <div style={{ width: '100%', height: '0.71rem', boxSizing: 'border-box', padding: '0 20%', marginBottom: "0.32rem" }}>
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            <li style={left} onClick={() => { this.changeStatus(0) }}>{'待完工'}</li>
                            <li style={right} onClick={() => { this.changeStatus(1) }}>{'已完工'}</li>
                        </ul>
                    </div>
                    <div style={{ padding: '0 .24rem' }}>
                        {item}
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}

// class Hle extends Component {
//     constructor(props,context){
//         super(props,context)
//         // this.dd = this.dd.bind(this);
//     }
//     dd(){

//     }
//     render(){
//         return(<div></div>)
//     }
// }