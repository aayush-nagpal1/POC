import React from 'react';
import Header from '../headernew';
import Sidebar from '../sidebar';
import ReactLoading from 'react-loading'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Services from '../../services'
import './style.css';
import { css } from 'glamor';
import Balance from '../Balances'

export default class Custom extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            debitData : [],
            creditData : [],
            cardData : [],
            load: false,
            load1: false,
            toastId: null
        }
    }




    componentWillMount() {
      var token = sessionStorage.getItem("token");
      Services.totalBalancesCall(token, function(data){
          this.setState({accSumary : data});
          console.log(data)
     }.bind(this),function(err){
         console.log(err);
     })
      Services.creditCall(token, function(data){
          this.setState({creditData : data.banks});

     }.bind(this),function(err){
         console.log(err);
     })
      Services.debitCall(token,function(data){
          this.setState({debitData : data.banks});
      }.bind(this),function(err){
          console.log(err);
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
           <div className="container">
           <div><h1>My Transactions</h1></div>
            <div className="row">
              <div className="col">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div class="form-group">
                  <input type="text" class="form-control" id="usr" style={{width:'70%'}}/>
                </div>
              </div>
              <div className="col">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <button type="button" class="btn btn-success">Submit</button>
              </div>
            </div>
          </div>
           
            </div>
            <ToastContainer autoClose={4000} closeButton={false} hideProgressBar={true} transition={Zoom}/>
            </div>:
            <div>
            <center><ReactLoading type='bubbles' color='black' height={'20%'} width={'20%'} /></center>
            </div>
        );
    }
}
