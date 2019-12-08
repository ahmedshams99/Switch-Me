import React, { Component } from "react";
import axios from "axios";
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button';
import ReactModal from 'react-modal';
import Cards from './cards';
import LoginModal from './loginModal'
import RegisterModal from './registerModal'
import CreatePostModal from './createPostModal'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './homepage.scss';
import FormData from 'form-data'
import FilterListIcon from '@material-ui/icons/FilterList';
import SnackBar from "../snackbar";
import Profile from '../profile/profile'
import FilterModal from './filterModal'
const registerModalStyle = {
	content : {
	  top                   : '5%',
	  left                  : '30%',
	  right                 : '30%',
	  bottom                : '5%'
	}
  };
  
const loginModalStyle = {
	content : {
	  top                   : '35%',
	  left                  : '40%',
	  right                 : '40%',
	  bottom                : '35%'
	}
};

const createPostModalStyle = {
	content : {
	  top                   : '15%',
	  left                  : '30%',
	  right                 : '30%',
	  bottom                : '15%'
	}
};
const buttonDiv = {
	content :{
		display :"inline"
	}
}
export default class HomePage extends Component {
	
	constructor(props) {
		super(props);
		ReactModal.setAppElement('body');
		this.state = {
			pos: {
				x: 0, 
				y: 0
			},
			shadow: true,
		    colors: [
			{
		        "background": "#2A2C39",
		        "text": "#ffffff",
		        "bold": "#FF4056"
		    }, {
		        "background": "#FCF751",
		        "text": "#2A2C39",
		        "bold": "#14151c"
			},
			{
		        "background": "#00BFFF",
		        "text": "#14151c",
		        "bold": "#F0F8FF"
			}],
			//switch  red         black     white
			backColors:[
				"#ff4056", "#2A2C39","#F0F8FF"
			],
			randColor: null,
		    background: null,
		    text: null,
			bold: null,
			showRegisterModal:false,
			showLoginModal:false,
			id:"5deb854ebc1d3234c8ffc38c",
			tutorialNumber: '',
			dash: '',
			major: '',
			posts: null,
			germanLevel:"",
			englishLevel:"",
			redirectProfile:false,
			showProfileModal:false,
			showCreatePostModal:false,
			uploadSchedule:false,
			pictures: [],
			selectedFile : null,
			showFilterModal:false,
			majorFilter:"",
			alerted:false,
			dashFilter:""
		};

	}
	async componentDidMount(){
		this.RandomBackground();
		if(localStorage.getItem("loggedIn"))
			this.setState({ lang: localStorage.getItem("lang") });
		let posts=await axios.get(`/api/users/getAllPosts`);
		let me=await axios.get(`/api/users/${this.state.id}`)
		this.setState({
			posts: posts.data,
			tutorialNumber:me.data.tutorialNumber,
			dash:me.data.dash,
			major:me.data.major,
			germanLevel:me.data.germanLevel,
			englishLevel:me.data.englishLevel
		});
	}

    onMouseMove(e) {	
        this.setState({	
        	pos: {	
        		x: e.pageX,	
        		y: e.pageY
        	}
        });

        this.CreateShadow();
    }

	CreateShadow() {
	
	    if ('ontouchstart' in window === false && this.state.shadow) {

	            let [moveX, moveY] = [(this.state.pos.x / -100), (this.state.pos.y / -120)];

	            let [Section, firstWord] = [ReactDOM.findDOMNode(this.refs.section), ReactDOM.findDOMNode(this.refs.playword)];
                firstWord.style.transform = `translate3d(${moveX / 2}px, ${moveY}px, 0)`;
				Section.style.textShadow = `${moveX}px ${-moveY}px rgba(0, 0, 0, 0.1)`;

		}
	}

	RandomBackground(){
		let getRandomInt = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		let RandomID 	= getRandomInt(0, 2);

		this.setState({
			randColor: RandomID,
			background: this.state.colors[RandomID].background,
			text: this.state.colors[RandomID].text,
			bold: this.state.colors[RandomID].bold
		})
	}

	
    toggleRegisterModal () {
		this.setState({ showRegisterModal: !this.state.showRegisterModal });
	}
	toggleRegisterModalInside (loggedInId) {
		this.setState({showRegisterModal: !this.state.showRegisterModal});
		if(loggedInId)
		{
			this.setState({id:loggedInId});
			localStorage.setItem('id',loggedInId)
		}
	}
    toggleLoginModal () {
		this.setState({ showLoginModal: !this.state.showLoginModal });
	}
    toggleProfileModal () {
		this.setState({ showProfileModal: !this.state.showProfileModal });
	}
	toggleLoginModalInside (loggedInId,token) {
		this.setState({ showLoginModal: !this.state.showLoginModal });
		if(loggedInId)
		{
			this.setState({id:loggedInId})
			localStorage.setItem('id',loggedInId)
			localStorage.setItem('token',token)
		}
	}
	async toggleCreatePostModal () {
		
		this.setState({ showCreatePostModal: !this.state.showCreatePostModal });
	}
	fileSelectedHandler = event =>{
		this.setState({
			selectedFile : event.target.files[0]
		})
	}

	async fileUploadHandler(){
		await this.setState({ alerted: false, alertType: "", alertMsg: "" });
		var apiBaseUrl = 'https://api.cloudinary.com/v1_1/dhulnnjtc/upload';
		var upPreset = 'ts1wan6f';

		let fd = new FormData();
		fd.append('file' , this.state.selectedFile);
		fd.append('upload_preset' , upPreset)
		let me =this
		try{
			axios({
				url:apiBaseUrl,
				method:'POST',
				headers:{
					'Content-Type':'application/x-www-form-urlencoded'
				},
				data:fd
			}).then(async function(res){
				var link = res.data.secure_url;
				
				const body={
					tutorialNumber: me.state.tutorialNumber ,
					dash: me.state.dash ,
					major: me.state.major,
					url:link,
					germanLevel:me.state.germanLevel,
					englishLevel:me.state.englishLevel
				}
				console.log(body)
				try{
					let response = axios.post(`/api/users/schedule`,body).then((res)=>{
						console.log(res);
					});
					if(response.data.err){
						await me.setState({
							alerted: true,
							alertType: "error",
							alertMsg: "Somebody has already uploaded this schedule."
						});
					}
					else{
						await me.setState({
							alerted: true,
							alertType: "success",
							alertMsg: "You Have Uploaded a Schedule"
						});
					}
					
					//window.location.reload();
				} catch (err) {
					await me.setState({
						alerted: true,
						alertType: "error",
						alertMsg: "Somebody has already uploaded this schedule."
					});
				}
			}).catch(async function(err){
				// console.log(err);
				
			});
		}
		catch(err){

		}
		
	}
	
	async filterMajorState(e){
		await this.setState({majorFilter:e.target.value})
	}
	async filterDashState(e){
		await this.setState({dashFilter:e.target.value})
	}
	render() {
		let alertSnack;
		if (this.state.alerted)
		alertSnack = (
			<SnackBar
			message={this.state.alertMsg}
			variant={this.state.alertType}
			/>
		);
		let sectionStyle = {
			backgroundColor: this.state.background,
			color: this.state.text
		}
		let boldStyle = {
			color: this.state.bold
		}
		const filterModalStyle = {
			content : {
			  top                   : '35%',
			  left                  : '40%',
			  right                 : '40%',
			  bottom                : '35%'
			}
		}
		const profileModalStyle = {
			content : {
			  top                   : '0%',
			  left                  : '37%',
			  right                 : '37%',
			  bottom                : '0%'
			}
		}
		return <div>
		<section id="app" onMouseMove={this.onMouseMove.bind(this)} style={sectionStyle}>
				<h1 className="middle" ref="section">
					<span className="bold" ref="playword" style={boldStyle}>Switch</span>Me<br/>
					{
						this.state.id ?  null : <Button variant="outlined" onClick={()=>{this.toggleRegisterModal()}}>Register Now</Button> 
					}
					<ReactModal style={registerModalStyle}isOpen={this.state.showRegisterModal} onRequestClose={()=>{this.toggleRegisterModal()}}>
						<RegisterModal clickMe={this.toggleRegisterModalInside.bind(this)}/>
					</ReactModal>
				</h1>
					<div id="smallText">Switching has never been this easy.</div>
					<div className="arrow" onClick={ () => {
						var scrollTo=document.getElementById("Cards").getClientRects()[0].y
						window.scrollBy({top: scrollTo, left: 0, behavior: 'smooth'})
						}}/>
					<ReactModal style={profileModalStyle} isOpen={this.state.showProfileModal} onRequestClose={()=>{this.toggleProfileModal()}}>
						<Profile id={this.state.id}/>
					</ReactModal>
					{this.state.id? <div>
					<div id="login"><Button style={{ color:this.state.text}} onClick={()=>{
					this.setState({showProfileModal:true})}}>Profile</Button><br/>
					<Button style={{ color:this.state.text}} component="label">Upload Schedule<input type="file" onChange = {this.fileSelectedHandler} style={{ display: "none" }}/></Button><br/>

					<h6>{this.state.selectedFile? this.state.selectedFile.name:"No file Selected"}</h6><br/>
					<Button style={{ color:this.state.text}} onClick={this.fileUploadHandler.bind(this)}>Upload</Button>
					</div> 
					</div>
					:
					<div>
						<div id="login">Already Registered?  <Button style={{ color:this.state.text}} onClick={()=>{this.toggleLoginModal()}}>Login</Button></div>						
					</div>
					}
					<ReactModal style={loginModalStyle}isOpen={this.state.showLoginModal} onRequestClose={()=>{this.toggleLoginModal()}}>
						<LoginModal clickMe={this.toggleLoginModalInside.bind(this)}/>
					</ReactModal>
					
					
			</section>
			
			
			<div id="Cards">

					
				{this.state.posts==null? "Loading...":<Cards backColor={this.state.backColors[this.state.randColor]} color={this.state.randColor} posts={this.state.posts} majorFilter={this.state.majorFilter} dashFilter={this.state.dashFilter} senderID={this.state.id}/>}
			<ReactModal style={filterModalStyle} isOpen={this.state.showFilterModal} onRequestClose={()=>{this.setState({showFilterModal:!this.state.showFilterModal})}}>
					<FilterModal onFilterMajor={this.filterMajorState.bind(this)} onFilterDash={this.filterDashState.bind(this)}/>
			</ReactModal>
			{/* <div style = {{paddingBottom:"20px" , backgroundColor:this.state.backColors[this.state.randColor]}}>
					<div style ={{ display:"inline",width:"25vw" }}>
						{this.state.id===""? null:<Fab onClick={()=>{this.toggleCreatePostModal()}}><AddIcon /></Fab>}
					</div>
					<div style ={{display:"inline", width:"25vw", marginLeft:"20px" }}>
						<Fab onClick={()=>{this.setState({showFilterModal:true})}}><FilterListIcon/></Fab>
					</div>
			</div> */}
			
					
			
				<ReactModal style={createPostModalStyle}isOpen={this.state.showCreatePostModal} onRequestClose={()=>{this.toggleCreatePostModal()}}>
					<CreatePostModal id={this.state.id} randColor={this.state.randColor}/>
				</ReactModal>
			</div>
			
			<div
              style={{
                align: "center",
                display: "flex",
                marginTop: "-50px",
                marginBottom: "20px"
              }}
            >
              {alertSnack}
            </div>
		</div>
	}
}