import React, { Component } from 'react'
import { Card, Input, Button, Table ,Content,Layout } from 'antd';
import { Radio } from 'antd';
import api from '../api'
var math=require('mathjs')
class Centraloh2 extends Component{
    constructor(){
        super();
        this.state={
            fx: "",
            x: 0,
            h: 0,
            d: 0,
            real: 0,
            ans: 0,
            error: 0,
            showOutput: false,
        }
    }
    ctoh=(x,h,d)=>{
        var fx=this.state.fx
        var real
        var ans
        var sum=parseFloat(0.000000)
        real=this.funcd(x,d)

        if (d==1){
            ans=(this.func(x+h)-this.func(x-h))/(2*h)
        }
        else if (d==2){
            ans=((this.func(x+h)-(2*this.func(x))+this.func(x-h))/(Math.pow(h,2)))
        }
        else if (d==3){
            ans=((this.func(x+(2*h))-(2*this.func(x+h))+(2*this.func(x-h))-this.func(x-(2*h)))/(2*(Math.pow(h,3))))
        }
        else if (d==4){
            ans=((this.func(x+(2*h))-(4*this.func(x+h))+(6*this.func(x))-(4*this.func(x-h))+this.func(x-(2*h)))/(Math.pow(h,4)))
        }
        sum=this.error(real,ans)
        console.log(ans)
        console.log(sum)
        this.setState({
            real: real,
            ans: ans,
            error: sum,
            showOutput: true,
        })
    }
    func(X){
        return math.compile(this.state.fx).eval({x: X})
    }
    funcd(X,d){
        var temp = this.state.fx, expr 
        for (var i=1 ; i<=d ; i++) {
            temp = math.derivative(temp, 'x')
            expr = temp
        }
        let scope={ x: parseFloat(X) }
        return expr.evaluate(scope)
    }
        
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    handleChange=(event)=> {
        this.setState({
            [event.target.name]: event.target.value 
        });
    }
    handleDiff=(event)=> {
        this.setState({
            d: event.target.value 
        });
    }
    componentDidMount = async() => { 
        await api.getDiff("5e78f6059cd18e145854aa33").then(db => {
        this.setState({
            fx:db.data.data[0].fx,
            x:db.data.data[0].x,
            h:db.data.data[0].h,
            d:db.data.data[0].d,
        })
        })
      }
    render(){
        return(
            <Layout style={{background: '#C9E2EF',padding: 24,minHeight: 1000, marginLeft: 0}}>
                <div>
        <h2 style={{ color: "black", fontWeight: "bold" }}>Central O(h^2)</h2>
                    <div onChange={this.handleChange}>
                        <h2>Fx&nbsp;&nbsp;<Input size="medium" name="fx" style={{ width: 300 }}></Input></h2>
                        <h2>X&nbsp;&nbsp;<Input size="medium" name="x" style={{ width: 300 }}></Input></h2>
                        <h2>h&nbsp;&nbsp;<Input size="medium" name="h" style={{ width: 300 }}></Input></h2>
                        <Radio.Group value={this.state.d} onChange={this.handleDiff}>
                            <Radio.Button value="1">F'(x)</Radio.Button>
                            <Radio.Button value="2">F''(x)</Radio.Button>
                            <Radio.Button value="3">F'''(x)</Radio.Button>
                            <Radio.Button value="4">F''''(x)</Radio.Button>
                        </Radio.Group>
                        <br /><br />
                        <Button onClick={() => this.ctoh(parseFloat(this.state.x),parseFloat(this.state.h),parseFloat(this.state.d))
                            }
                            style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button>
                        <Button onClick={() => this.ctoh(parseFloat(this.state.x),parseFloat(this.state.h),parseFloat(this.state.d))
                            }
                            style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Fx : {this.state.fx} X : {this.state.x} h: {this.state.h} d: {this.state.d}</Button><br /><br />
                    </div>
                    {this.state.showOutput &&
                        <div style={{background: '#FFE7E2',width: 400}}>
                            <h2>Real Value: {this.state.real}</h2>
                            <h2>CTO(h<sup>{this.state.d}</sup>): F<sup>{this.state.d}</sup>(x)={this.state.ans}</h2>
                            <h2>Error: {this.state.error}</h2>
                        </div>
                    }
                </div>
            </Layout>
        )
    }
}
export default Centraloh2