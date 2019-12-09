import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import bcrypt from 'bcryptjs'
class registerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
			password:"",
			fullName:"",
			dash:"",
			ID:"",
			major:"",
			tutorialNumber:"",
			mobileNumber:"",
			facebookAccount:"",
			germanLevel:"",
            englishLevel:"",
            error:""
        }
    }
    hashPassword = function(password){
        const hashedPassword = bcrypt.hashSync(password, 10)
        return hashedPassword
    }
	async handleRegister () {
        const body={
            email:this.state.email,
            password:this.hashPassword(this.state.password),
            fullName:this.state.fullName,
            dash:this.state.dash,
            ID:this.state.ID,
            major:this.state.major,
            tutorialNumber:this.state.tutorialNumber,
            mobileNumber:this.state.mobileNumber,
            facebookAccount:this.state.facebookAccount,
            germanLevel:this.state.germanLevel,
            englishLevel:this.state.englishLevel
        }
        const response=await axios.post('/api/users',body);
        if(!response.data.error && !response.data.err)
            this.props.clickMe(response.data._id);
        else
			this.setState({error:response.data.err? response.data.err:"Invalid data"}); 
	}
	render() {
        return <div>
            <h5>Register<br/></h5>{this.state.error}
						<TextField fullWidth id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{this.setState({email:e.target.value})}}/>
						<TextField fullWidth id="outlined-basic" label="fullName" variant="outlined" onChange={(e)=>{this.setState({fullName:e.target.value})}}/>
						<TextField fullWidth id="outlined-basic" label="password" variant="outlined" type="password" onChange={(e)=>{this.setState({password:e.target.value})}}/>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>Dash</InputLabel>
						<Select fullWidth value={this.state.dash} onChange={(e)=>{this.setState({dash:e.target.value})}} >
							<MenuItem value={37}>37-</MenuItem>
							<MenuItem value={40}>40-</MenuItem>
							<MenuItem value={43}>43-</MenuItem>
							<MenuItem value={46}>46-</MenuItem>
							<MenuItem value={49}>49-</MenuItem>
						</Select>
						</FormControl>
						<TextField fullWidth id="outlined-basic" label="ID" variant="outlined" onChange={(e)=>{this.setState({ID:e.target.value})}}/>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>Major</InputLabel>
							<Select fullWidth value={this.state.major}onChange={(e)=>{this.setState({major:e.target.value})}} >
								<MenuItem value={"Computer Science and Engineering"}>Computer Science and Engineering</MenuItem>
								<MenuItem value={"Digital Media Engineering and Technology"}>Digital Media Engineering and Technology</MenuItem>
								<MenuItem value={"Networks"}>Networks</MenuItem>
								<MenuItem value={"Communications"}>Communications</MenuItem>
								<MenuItem value={"Electronics"}>Electronics</MenuItem>
								<MenuItem value={"Materials Engineering"}>Materials Engineering</MenuItem>
								<MenuItem value={"Design and Production Engineering"}>Design and Production Engineering</MenuItem>
								<MenuItem value={"Mechatronics Engineering"}>Mechatronics Engineering</MenuItem>
								<MenuItem value={"Civil Engineering"}>Civil Engineering</MenuItem>
								<MenuItem value={"Architecture Engineering"}>Architecture Engineering</MenuItem>
								<MenuItem value={"Pharmacy & Biotechnology"}>Pharmacy & Biotechnology</MenuItem>
								<MenuItem value={"Biotechnology"}>Biotechnology</MenuItem>
								<MenuItem value={"General Management"}>General Management</MenuItem>
								<MenuItem value={"Business Informatics"}>Business Informatics</MenuItem>
								<MenuItem value={"Technology-based Management"}>Technology-based Management</MenuItem>
								<MenuItem value={"Graphic Design"}>Graphic Design</MenuItem>
								<MenuItem value={"Media Design"}>Media Design</MenuItem>
								<MenuItem value={"Graphic Design"}>Graphic Design</MenuItem>
								<MenuItem value={"Product Design"}>Product Design</MenuItem>
								<MenuItem value={"Faculty of Law and Legal Studies"}>Faculty of Law and Legal Studies</MenuItem>
							</Select>
						</FormControl>
						<TextField fullWidth id="outlined-basic" label="tutorialNumber" variant="outlined" onChange={(e)=>{this.setState({tutorialNumber:e.target.value})}}/>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>German Level</InputLabel>
							<Select value={this.state.germanLevel} onChange={(e)=>{this.setState({germanLevel:e.target.value})}} >
								<MenuItem value={"German Language I"}>German Language I</MenuItem>
								<MenuItem value={"German Language II"}>German Language II</MenuItem>
								<MenuItem value={"German Language III"}>German Language III</MenuItem>
								<MenuItem value={"German Language IV"}>German Language IV</MenuItem>
								<MenuItem value={"None"}>None</MenuItem>
							</Select>
						</FormControl>
						<FormControl variant="outlined" fullWidth>
							<InputLabel>English Level</InputLabel>
							<Select value={this.state.englishLevel} onChange={(e)=>{this.setState({englishLevel:e.target.value})}} >
							<MenuItem value={"Academic English"}>Academic English</MenuItem>
							<MenuItem value={"Academic Study Skills"}>Academic Study Skills</MenuItem>
							<MenuItem value={"Critical Thinking & Scientific Methodology"}>Critical Thinking & Scientific Methodology</MenuItem>
							<MenuItem value={"Communication & Presentation Skills"}>Communication & Presentation Skills</MenuItem>
							<MenuItem value={"Research Paper Writing"}>Research Paper Writing</MenuItem>
							<MenuItem value={"None"}>None</MenuItem>
							</Select>
						</FormControl><br/>
						<TextField fullWidth id="outlined-basic" label="mobileNumber" variant="outlined" onChange={(e)=>{this.setState({mobileNumber:e.target.value})}}/>
						<TextField fullWidth id="outlined-basic" label="facebookAccount" variant="outlined" onChange={(e)=>{this.setState({facebookAccount:e.target.value})}}/>
                        
						<Button style={{textAlign:"center"}} onClick = {()=>{this.handleRegister()}} >Register</Button>
        </div>
    }
}
export default registerModal;