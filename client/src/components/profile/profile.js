import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Fab from '@material-ui/core/Fab';
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export default class HomePage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
      id:"5ddc03992e5f70238c978b2c",
      user:null,
      editing:false,
      editTutorial:false,
      editMobile:false,
      editFacebook:false,
      editGerman:false,
      editEnglish:false,
      newTutorial:"",
      newMobile:"",
      newFacebook:"",
      newGerman:"",
      newEnglish:"",
      error:""
		};
	}
	async componentDidMount(){
    await this.setState({user: (await axios.get(`/api/users/${this.state.id}`)).data})
    await this.setState({
      newTutorial:  this.state.user.tutorialNumber, 
      newMobile:    this.state.user.mobileNumber,
      newFacebook:  this.state.user.facebookAccount,
      newGerman:    this.state.user.germanLevel,
      newEnglish:   this.state.user.englishLevel
    })
  }
  async submitRequest(){
    let request={
      body:{
        tutorialNumber:this.state.newTutorial,
        mobileNumber:this.state.newMobile,
        facebookAccount:this.state.newFacebook,
        germanLevel:this.state.newGerman,
        englishLevel:this.state.newEnglish
      }
    };
    const result=await axios.put(`/api/users/${this.state.id}`,request.body);
    if(result.data.error)
      this.setState({error:"Incorrect Info"})
    else
    {
      this.setState({error:"Updated Successfully"})
      this.setState({user:result.data})
    } 
  }
	render() {
        const styles = {
            avatar: {
              margin: 10
            },
            orangeAvatar: {
              margin: "auto",
              color: "#fff",
              backgroundColor: "#45454545"
            },
            purpleAvatar: {
              margin: "auto",
              color: "#fff",
              backgroundColor: " #800080"
            },
            author: {
              margin: "auto",
              padding: "0px"
            },
            card: {
              
              width: 345,
              borderRadius: 12,
              fontFamily: "Helvetica Neue",
              boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.16)",
              margin: "1%",
              display:"flex"
            },
            media: {
              height: 140
            },
            root: {
              width: 345,
              marginLeft:"-20px"
            }
          };
        const classes = { ...styles };
		return <div>
                <div style={{display:"inline-grid"}}>
<Card style={classes.card}>
  <CardActionArea>
    <CardContent>
      {this.state.editing? this.state.error:null}
      <Typography gutterBottom variant="h5" component="h2" />
        <List style={classes.root}>
          <ListItem>
            <ListItemText primary="Full Name" secondary={this.state.user? this.state.user.fullName:"Loading"} />
            <Avatar style={styles.purpleAvatar}> {this.state.user? this.state.user.fullName.charAt(0):"?"}</Avatar>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Email" secondary={this.state.user? this.state.user.email:"Loading"} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Dash" secondary={this.state.user? this.state.user.dash:"Loading"} />
            <ListItemText primary="ID" secondary={this.state.user? this.state.user.ID:"Loading"} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Major" secondary={this.state.user? this.state.user.major:"Loading"} />
          </ListItem>
          <Divider />

          <ListItem>
            {
              this.state.editTutorial? <TextField id="outlined-basic" onChange={(e)=>{this.setState({newTutorial:e.target.value})}} label="Tutorial Number" defaultValue={this.state.user? this.state.user.tutorialNumber:"Loading"} variant="outlined" />:
              <ListItemText primary="Tutorial Number" secondary={this.state.user? this.state.user.tutorialNumber:"Loading"} />
            }
            {
              this.state.editing? 
              this.state.editTutorial? 
              <Fab size="small" onClick={()=>{this.setState({editTutorial: false});this.submitRequest()}} style={{backgroundColor: "#FFFFFF"}}>
                <CheckIcon />
              </Fab>
              :
              <Fab size="small" onClick={()=>{this.setState({editTutorial: true})}} style={{backgroundColor: "#FFFFFF"}}>
                <EditIcon />
              </Fab>:null
            }
          </ListItem>

          <Divider />

          <ListItem>
          {
              this.state.editMobile? <TextField id="outlined-basic" onChange={(e)=>{this.setState({newMobile:e.target.value})}} label="Mobile Number" defaultValue={this.state.user? this.state.user.mobileNumber:"Loading"} variant="outlined" />:
              <ListItemText primary="Mobile Number" secondary={this.state.user? (this.state.user.mobileNumber? this.state.user.mobileNumber:"Not Submitted"):"Loading"} />
            }
            {
              this.state.editing? 
              this.state.editMobile? 
              <Fab size="small" onClick={()=>{this.setState({editMobile: false});this.submitRequest()}} style={{backgroundColor: "#FFFFFF"}}>
                <CheckIcon />
              </Fab>
              :
              <Fab size="small" onClick={()=>{this.setState({editMobile: true})}} style={{backgroundColor: "#FFFFFF"}}>
                <EditIcon />
              </Fab>:null}
          </ListItem>

          <Divider />
          
          <ListItem>
          {
              this.state.editFacebook? <TextField id="outlined-basic" onChange={(e)=>{this.setState({newFacebook:e.target.value})}} label="Facebook Account" defaultValue={this.state.user? this.state.user.facebookAccount:"Loading"} variant="outlined" />:
              <ListItemText primary="Facebook Account" secondary={this.state.user? (this.state.user.facebookAccount? this.state.user.facebookAccount:"Not Submitted"):"Loading"} />
            }
            {
              this.state.editing? 
              this.state.editFacebook? 
              <Fab size="small" onClick={()=>{this.setState({editFacebook: false});this.submitRequest()}} style={{backgroundColor: "#FFFFFF"}}>
                <CheckIcon />
              </Fab>
              :
              <Fab size="small" onClick={()=>{this.setState({editFacebook: true})}} style={{backgroundColor: "#FFFFFF"}}>
                <EditIcon />
              </Fab>:null}
          </ListItem>

          <Divider />

          <ListItem>
          {
            this.state.editGerman? 
              (<FormControl variant="outlined" fullWidth>
                <InputLabel>German Level</InputLabel>
                <Select value={this.state.newGerman}onChange={(e)=>{this.setState({newGerman:e.target.value})}} >
                  <MenuItem value={"German Language I"}>German Language I</MenuItem>
                  <MenuItem value={"German Language II"}>German Language II</MenuItem>
                  <MenuItem value={"German Language III"}>German Language III</MenuItem>
                  <MenuItem value={"German Language IV"}>German Language IV</MenuItem>
                  <MenuItem value={"None"}>None</MenuItem>
                </Select>
              </FormControl>):
              <ListItemText primary="German Level" secondary={this.state.user? this.state.user.germanLevel:"Loading"} />
            }
            {
              this.state.editing? 
              this.state.editGerman? 
              <Fab size="small" onClick={()=>{this.setState({editGerman: false});this.submitRequest()}} style={{backgroundColor: "#FFFFFF"}}>
                <CheckIcon />
              </Fab>
              :
              <Fab size="small" onClick={()=>{this.setState({editGerman: true})}} style={{backgroundColor: "#FFFFFF"}}>
                <EditIcon />
              </Fab>:null}
          </ListItem>

          <Divider />
              
          <ListItem>
          {
            this.state.editEnglish? 
              (<FormControl variant="outlined" fullWidth>
                <InputLabel>English Level</InputLabel>
                <Select value={this.state.newEnglish}onChange={(e)=>{this.setState({newEnglish:e.target.value})}} >
                  <MenuItem value={"Academic English"}>Academic English</MenuItem>
                  <MenuItem value={"Academic Study Skills"}>Academic Study Skills</MenuItem>
                  <MenuItem value={"Critical Thinking & Scientific Methodology"}>Critical Thinking & Scientific Methodology</MenuItem>
                  <MenuItem value={"Communication & Presentation Skills"}>Communication & Presentation Skills</MenuItem>
                  <MenuItem value={"Research Paper Writing"}>Research Paper Writing</MenuItem>
                  <MenuItem value={"None"}>None</MenuItem>
                </Select>
             </FormControl>):
              <ListItemText primary="English Level" secondary={this.state.user? this.state.user.englishLevel:"Loading"} />
            }
            {
              this.state.editing? 
              this.state.editEnglish? 
              <Fab size="small" onClick={()=>{this.setState({editEnglish: false});this.submitRequest()}} style={{backgroundColor: "#FFFFFF"}}>
                <CheckIcon />
              </Fab>
              :
              <Fab size="small" onClick={()=>{this.setState({editEnglish: true})}} style={{backgroundColor: "#FFFFFF"}}>
                <EditIcon />
              </Fab>:null}
          </ListItem>
          
        </List>
      </CardContent>
  </CardActionArea>
</Card>
<br/>
<Button size="small" color="primary" onClick={() => {
  this.setState({ 
    editing: !this.state.editing,
    editTutorial:false,
    editMobile:false,
    editFacebook:false,
    editGerman:false,
    editEnglish:false,
  })
}}>
  {this.state.editing? "Confirm":"Edit Profile"}
  {this.state.editing? <CheckIcon />:<EditIcon />}
</Button>
</div>
</div>
	}
}