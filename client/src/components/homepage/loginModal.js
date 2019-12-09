import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
class loginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            error:""
        }
    }
    async handleLogin(){
        const body={
            email:this.state.email,
            password:this.state.password
        }
        const response=await axios.put('/login',body);
        console.log(response);
        if(!response.data.error){
            console.log(response.data)
            this.props.clickMe(response.data.id,response.data.token);

        }
        else
            this.setState({error:response.data.err? response.data.err:"Invalid data"}); 
    }
	render() {
        return <div>
                    Login<br/>
                    {this.state.error}
					<TextField fullWidth id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{this.setState({email:e.target.value})}}/>
					<TextField fullWidth id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e)=>{this.setState({password:e.target.value})}}/>
					<Button style={{textAlign:"center"}} onClick={()=>{this.handleLogin()}}>Login</Button>
        </div>
    }
}
export default loginModal;