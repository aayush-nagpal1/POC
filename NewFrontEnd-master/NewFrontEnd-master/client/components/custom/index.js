import React from 'react';
import Header from '../headernew';
import Sidebar from '../sidebar';
import ReactLoading from 'react-loading'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import services from '../../services'
import './style.css';
import { css } from 'glamor';

export default class Custom extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            cardData : [],
            load: false,
            load1: false,
            toastId: null
        }
    }




    componentWillMount(){
        var context = this
            var token = sessionStorage.getItem("token");
          services.makePaymentCall(token,function (data) {
            services.offeringCall(token,function (data1) {
                console.log(data1);
              context.setState({cardData : data1});
              setTimeout(function(){
                context.setState({timer: true,type:data.totalAvailableBalance});
              }.bind(this),2000)
            })
          })

        }

    componentDidMount(){
        var username =
        this.setState({
          username: sessionStorage.getItem("username")
        })
        setTimeout(this.loader.bind(this),2000)
      }
      loader(){
        this.setState({
          load: true
        })
      }

      notify() {
        this.setState({
          load1: true
        })
      setTimeout(this.fun.bind(this), 500)
      //this.fun.bind(this)
    }
    fun(){
      this.setState({
        load1: false
      })
      toast.success(`Your transaction is being processed. You will receive confirmation
        message within 24 hrs. !`, {
          className: css({
        background: '#006a4d'
      }),
      position: toast.POSITION.BOTTOM_CENTER
    });
    }

      
    render(){
        console.log(this.state.cardData)
      return(
          this.state.load ?
            <div>
                <Header username = {this.state.username} history = {this.props.history}/>
            <div style = {{display:"flex"}}>
           <Sidebar/>
           
            </div>
            <ToastContainer autoClose={4000} closeButton={false} hideProgressBar={true} transition={Zoom}/>
            </div>:
            <div>
            <center><ReactLoading type='bubbles' color='black' height={'20%'} width={'20%'} /></center>
            </div>
        );
    }
}
