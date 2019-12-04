import React, { Component } from "react";
import axios from "axios";
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button';
import ReactModal from 'react-modal';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Cards from './cards';
import { Redirect } from "react-router-dom";
import './homepage.scss';
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
			showRegisterModal: false,
			showLoginModal: false,
			id:"40",
			posts:null,
			redirectProfile:false
		};
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

	toggleLoginModal () {
		this.setState({ showLoginModal: !this.state.showLoginModal });
	}
	toggleRegisterModal () {
		this.setState({ showRegisterModal: !this.state.showRegisterModal });
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
						this.state.id ?  null : <Button variant="outlined" onClick={this.toggleRegisterModal.bind(this)}>Register Now</Button> 
					}
					<ReactModal style={registerModalStyle}isOpen={this.state.showRegisterModal} onRequestClose={this.toggleRegisterModal.bind(this)}>
					<h5>Register<br/></h5>
						<TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
						<TextField fullWidth id="outlined-basic" label="fullName" variant="outlined"/>
						<TextField fullWidth id="outlined-basic" label="password" variant="outlined" type="password"/>
						<Select fullWidth value="age">
							<MenuItem value={37}>37-</MenuItem>
							<MenuItem value={40}>40-</MenuItem>
							<MenuItem value={43}>43-</MenuItem>
							<MenuItem value={46}>46-</MenuItem>
							<MenuItem value={49}>49-</MenuItem>
						</Select>
						<TextField fullWidth id="outlined-basic" label="ID" variant="outlined" />
						<Select fullWidth value="major">
							<MenuItem value={"Computer Science and Engineering"}>Computer Science and Engineering</MenuItem>
							<MenuItem value={"Digital Media Engineering and Technology"}>Digital Media Engineering and Technology</MenuItem>
							<MenuItem value={"Information Engineering and Technology"}>Information Engineering and Technology</MenuItem>
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
						<TextField fullWidth id="outlined-basic" label="tutorialNumber" variant="outlined" />
						<TextField fullWidth id="outlined-basic" label="germanLevel" variant="outlined" />
						<TextField fullWidth id="outlined-basic" label="englishLevel" variant="outlined" />
						<TextField fullWidth id="outlined-basic" label="mobileNumber" variant="outlined" />
						<TextField fullWidth id="outlined-basic" label="facebookAccount" variant="outlined" />
					</ReactModal>
				</h1>
					<div id="smallText">Switching has never been this easy.</div>
					<div className="arrow" onClick={ () => {
						var scrollTo=document.getElementById("Cards").getClientRects()[0].y
						window.scrollBy({top: scrollTo, left: 0, behavior: 'smooth'})
						}}/>
					{this.state.id? <div id="login"><Button style={{ color:this.state.text}} onClick={()=>{
						this.setState({redirectProfile:true})}}>Profile</Button></div>:
					<div id="login">Already Registered?  <Button style={{ color:this.state.text}} onClick={this.toggleLoginModal.bind(this)}>Login</Button></div>}
					<ReactModal style={loginModalStyle}isOpen={this.state.showLoginModal} onRequestClose={this.toggleLoginModal.bind(this)}>
					Login
					<TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
					<TextField fullWidth id="outlined-basic" label="Password" variant="outlined" type="password"/>
					<Button style={{textAlign:"center"}}>Login</Button>
					</ReactModal>
			</section>
			<div id="Cards">
				{this.state.posts==null? "Loading...":<Cards color={this.state.randColor} posts={this.state.posts}/>}
			</div>
			</div>
	}
}