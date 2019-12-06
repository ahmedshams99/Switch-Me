import React, { Component } from "react";
import axios from "axios";
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button';
import ReactModal from 'react-modal';
import Cards from './cards';
import { Redirect } from "react-router-dom";
import LoginModal from './loginModal'
import RegisterModal from './registerModal'
import CreatePostModal from './createPostModal'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './homepage.scss';
import ImageUploader from 'react-images-upload';
import FormData from 'form-data'
 
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
			randColor: null,
		    background: null,
		    text: null,
			bold: null,
			showRegisterModal:false,
			showLoginModal:false,
			id:"1",
			posts:null,
			redirectProfile:false,
			showCreatePostModal:false,
			uploadSchedule:false,
			pictures: [],
			selectedFile : null,
		};	
        this.onDrop = this.onDrop.bind(this);

	}
	async componentDidMount(){
		this.RandomBackground();
		if(localStorage.getItem("loggedIn"))
			this.setState({ lang: localStorage.getItem("lang") });
		let posts=await axios.get(`/api/users/getAllPosts`);
		this.setState({posts: posts.data});
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
	
	async onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
		});
		console.log("lalalalala   "+ picture);
		let data = new FormData();
		data.append('file', picture, picture);




		



	}
	fileSelectedHandler = event =>{
		this.setState({
			selectedFile : event.target.files[0]
		})	
	}

	fileUploadHandler(){
		let fd = new FormData();
		fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
		axios.post('/api/users/uploadImage').then(res =>{console.log(res)});

	}
	render() {
		let sectionStyle = {
			backgroundColor: this.state.background,
			color: this.state.text
		}
		let boldStyle = {
			color: this.state.bold
		}
		if(this.state.redirectProfile)
			return <Redirect to="/profile" />
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
					{this.state.id? <div>
										<div id="login"><Button style={{ color:this.state.text}} onClick={()=>{
															this.setState({redirectProfile:true})}}>Profile</Button><br/>
															<input type="file" onChange = {this.fileSelectedHandler}/><br/>
										<Button style={{ color:this.state.text}} onClick={this.fileUploadHandler.bind(this)}>Upload</Button>
															</div> 
										
									</div>:
									<div>
										<div id="login">Already Registered?  <Button style={{ color:this.state.text}} onClick={()=>{this.toggleLoginModal()}}>Login</Button></div>
										{/* <ImageUploader
										withIcon={true}
										buttonText='Choose images'
										onChange={this.onDrop}
										imgExtension={['.jpg', '.gif', '.png', '.gif']}
										maxFileSize={5242880}/> */}
										
									</div>
					}
					<ReactModal style={loginModalStyle}isOpen={this.state.showLoginModal} onRequestClose={()=>{this.toggleLoginModal()}}>
					<LoginModal clickMe={this.toggleLoginModalInside.bind(this)}/>
					</ReactModal>
					
			</section>
			<div id="Cards">
				{this.state.posts==null? "Loading...":<Cards color={this.state.randColor} posts={this.state.posts}/>}
				{this.state.id===""? null:<Fab onClick={()=>{this.toggleCreatePostModal()}}><AddIcon /></Fab>}
				<ReactModal style={loginModalStyle}isOpen={this.state.showCreatePostModal} onRequestClose={()=>{this.toggleCreatePostModal()}}>
					<CreatePostModal id={this.state.id}/>
				</ReactModal>
			</div>
		</div>
	}
}