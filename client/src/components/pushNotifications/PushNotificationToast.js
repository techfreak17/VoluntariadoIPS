import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import pushTemplates from '../../models/pushNotificationTemplates';





   // const notify = (msg) => {
        //toast(msg, {position: "bottom-right"})
   // }


toast.configure()
class PushNotificationToast extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            msgs: [],
            position: 0
        };
    }

    componentDidMount(){
        Axios.get('/api/notifications/listNotifications/' + this.props.auth.user.id)
          .then(response => {
              console.log(response);
              this.setState({ msgs: response.data});
          })
          .catch(function (error) {
            console.log(error);
          })
      }

    notify = () => {
        if(this.state.msgs[this.state.position]){
            toast(this.state.msgs[this.state.position].body, {position: "bottom-right"});
            this.setState({position: this.state.position +1});
        }else{
            toast('Não existem notificações', {position: "bottom-right"});
        }
    }
    
   
    render(){
        return(
            <button onClick={this.notify}  style={{ backgroundColor: "transparent", color: "white", border:"none" }}><i className="material-icons">notifications</i></button>
        );
    }



}

PushNotificationToast.propTypes = {
    
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
    
)(PushNotificationToast);
