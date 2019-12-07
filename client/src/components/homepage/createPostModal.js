import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Cards from './cards'
class createPostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id,
            tutorial:"",
            goToTutorials:[],
            error:"",
            openForDoubleSwitch:false,
            posts:[]
        }
    }
    async componentDidMount(){
        axios.get(`/api/users/preCreatePost/${this.state.id}`).then((res)=>{
            this.setState({posts:res.data.suggestions})
            // console.log(this.state.posts)
        })
    }
    handleAdd(){
        let arr=this.state.goToTutorials;
        if(!arr.includes(this.state.tutorial) && !isNaN(this.state.tutorial) && this.state.tutorial!=="")
        {
                arr.push(this.state.tutorial)
                this.setState({
                    error:"Added Successfully",
                    goToTutorials:arr
                })
        }
        else if(isNaN(this.state.tutorial) || this.state.tutorial==="")
            this.setState({error:"Invalid Tutorial Number"})
        else
            this.setState({error:"This tutorial has already been added."})
                
    }
    async handleClick(){
        var data = {
			user: this.state.id,
			goToTutorials:this.state.goToTutorials,
			openForDoubleSwitch:this.state.openForDoubleSwitch
		};
        var result = await axios.post(`/api/users/createPost/${this.state.id}`, data);
        this.setState({error: result.error? "Invalid Post data":"Post Created Successfully"})
    }
    render() {
        return <div style={{textAlign:"center"}}>
            {this.state.error}
            <TextField fullWidth id="outlined-basic" label="Go To Tutorial" variant="outlined" onChange={async (e)=>{this.setState({tutorial:e.target.value})}}/>
            <Button onClick={()=>{this.handleAdd()}}>Add</Button>
            <Button onClick={()=>{this.setState({goToTutorials:[],tutorial:this.state.tutorial})}}>Clear</Button><br/>
            {this.state.goToTutorials.map((item,i)=>{return<div key={i} style={{display:"inline"}}>{+i>0? ",":""}{item}</div>})}<br/>
            <FormControlLabel value="end" control={<Checkbox color="primary" />} label="is Open For Double Switch" labelPlacement="end" onChange={()=>{this.setState({openForDoubleSwitch: !this.state.openForDoubleSwitch})}}/><br/>
            <Button onClick={this.handleClick.bind(this)}>Create Post</Button>
            {this.state.posts.length>0? <Cards color={this.props.randColor} posts={this.state.posts} majorFilter="" senderID={this.state.id}/>:"No suggestions"}
        </div>
    }

}
export default createPostModal;