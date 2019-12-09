import React from "react";
import "./cards.scss"
import axios from 'axios'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import SnackBar from "../snackbar";
class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			move: false,
			limit: false,
			mouseStartPosX: null,
			mouseStartPosY: null,
			mouseCurrPosX: null,
			mouseCurrPosY: null,
			Posx: null,
			Posy: null,
			k: 0.2,
			restX: 0,
			restY: 0,
			fx: 0,
			fy: 0,
			ax: 0,
			ay: 0,
			vx: 0.0,
			vy: 0.0,
			mass: 0.7,
			damping: 0.8,
			fromTutorial:null,
			goToTutorials:null,
			openForDoubleSwitch:null,
			major:"",
			germanLevel:null,
			englishLevel:null,
			email:"",
			dash:"",
			majorFilter:this.props.majorFilter,
			postid:"",
			creatorID:""
		};
		this.handleDown = this.handleDown.bind(this);
		this.handleUp = this.handleUp.bind(this);
		this.handleMove = this.handleMove.bind(this);
		this.animate = this.animate.bind(this);
		this.updateCard = this.updateCard.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
	}

	async componentDidMount() {
		this.animate();
		console.log(this.props.data)
		await this.setState({
			postid:this.props.data._id,
			creatorID:this.props.data.user,
			goToTutorials:this.props.data.goToTutorials,
			openForDoubleSwitch:this.props.data.openForDoubleSwitch,
			fromTutorial:this.props.data.creator.tutorialNumber,
			major:this.props.data.creator.major,
			germanLevel:this.props.data.creator.germanLevel,
			englishLevel:this.props.data.creator.englishLevel,
			email:this.props.data.creator.email,
			dash:this.props.data.creator.dash
		});
		if(this.props.senderID!=="")
		{
			const sender = await axios.get(`/api/users/${this.props.senderID}`)
			await this.setState({
				senderEmail:sender.data.email,
				senderFullName:sender.data.fullName,
				senderDash:sender.data.dash,
				senderID:sender.data.ID,
				senderMajor:sender.data.major,
				senderTutorial:sender.data.tutorialNumber,
				senderMobileNumber:sender.data.mobileNumber,
				senderFacebookAccount:sender.data.facebookAccount,
				senderGermanLevel:sender.data.germanLevel,
				senderEnglishLevel:sender.data.englishLevel
			});
		}
		axios.get(`/api/users/schedule/${this.state.fromTutorial}/${this.state.dash}/${this.state.major}`).then((res)=>{
			this.setState({scheduleLink:res.data.link})
		})
	}

	handleDown(e) {
		this.setState({
			move: true,
			active: true,
			mouseStartPosX: e.clientX,
			mouseStartPosY: e.clientY
		});
	}

	handleTouchStart(e) {
		e.persist();
		this.setState({
			move: true,
			active: true,
			mouseStartPosX: e.touches[0].screenX,
			mouseStartPosY: e.touches[0].screenY
		});
	}

	handleMove(e) {
		if (!this.state.limit) {
			if (this.state.move) {
				let mouseCurrPosX = e.clientX;
				let mouseCurrPosY = e.clientY;
				let Posx = mouseCurrPosX - this.state.mouseStartPosX;
				let Posy = mouseCurrPosY - this.state.mouseStartPosY;
				let height = window.innerHeight;
				let width = window.innerWidth;
				function map_range(value, low1, high1, low2, high2) {
					return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
				}
				let mouseRange = mouseCurrPosX;
				if (mouseRange < width / 2)
					mouseRange = width - mouseRange;
				let damping = map_range(mouseRange, width / 2, width - width * 10 / 100, 0.6, 0.8);

				this.setState({Posx, Posy, damping, mouseCurrPosX, mouseCurrPosY });

				if (mouseCurrPosX > width - width * 20 / 100) {
					let restX, restY;
					if (mouseCurrPosX > width / 2)
						restX = this.state.Posx * 5;
					else
						restX = -this.state.Posx * 5;
					
					if (mouseCurrPosY > height / 2)
						restY = this.state.Posy * 5;
					else
						restY = this.state.Posy * 5;
					
					let limit = true;
					let move = false;
					let damping = 0.06;
					this.setState(
						{
							restX,
							restY,
							limit,
							move,
							damping
						},
						() => {
							setTimeout(() => {
								window.cancelAnimationFrame(this.animate);
							}, 10);
						}
					);
				} else if (mouseCurrPosX < width * 20 / 100) {
					let restX, restY;
					if (mouseCurrPosX > width / 2) {
						restX = -this.state.Posx * 5;
					} else {
						restX = this.state.Posx * 5;
					}
					if (mouseCurrPosY > height / 2) {
						restY = this.state.Posy * 5;
					} else {
						restY = this.state.Posy * 5;
					}
					let limit = true;
					let move = false;
					let damping = 0.06;
					this.setState({
						restX,
						restY,
						limit,
						move,
						damping
					});
				}
			}
		}
	}

	handleTouchMove(e) {
		e.persist();
		if (!this.state.limit) {
			if (this.state.move) {
				let mouseCurrPosX = e.touches[0].screenX;
				let mouseCurrPosY = e.touches[0].screenY;
				let Posx = mouseCurrPosX - this.state.mouseStartPosX;
				let Posy = mouseCurrPosY - this.state.mouseStartPosY;
				let height = window.innerHeight;
				let width = window.innerWidth;
				function map_range(value, low1, high1, low2, high2) {
					return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
				}
				let mouseRange = mouseCurrPosX;
				if (mouseRange < width / 2) {
					mouseRange = width - mouseRange;
				}
				let damping = map_range(
					mouseRange,
					width / 2,
					width - width * 10 / 100,
					0.6,
					0.8
				);

				this.setState({
					Posx,
					Posy,
					damping,
					mouseCurrPosX,
					mouseCurrPosY
				});

				if (mouseCurrPosX > width - width * 10 / 100) {
					let restX, restY;
					if (mouseCurrPosX > width / 2) {
						restX = this.state.Posx * 5;
					} else {
						restX = -this.state.Posx * 5;
					}
					if (mouseCurrPosY > height / 2) {
						restY = this.state.Posy * 5;
					} else {
						restY = this.state.Posy * 5;
					}
					let limit = true;
					let move = false;
					let damping = 0.08;
					this.setState(
						{
							restX,
							restY,
							limit,
							move,
							damping
						},
						() => {
							setTimeout(() => {
								window.cancelAnimationFrame(this.animate);
							}, 10);
						}
					);
				} else if (mouseCurrPosX < width * 10 / 100) {
					let restX, restY;
					if (mouseCurrPosX > width / 2) {
						restX = -this.state.Posx * 5;
					} else {
						restX = this.state.Posx * 5;
					}
					if (mouseCurrPosY > height / 2) {
						restY = this.state.Posy * 5;
					} else {
						restY = this.state.Posy * 5;
					}
					let limit = true;
					let move = false;
					let damping = 0.08;
					this.setState({
						restX,
						restY,
						limit,
						move,
						damping
					});
				}
			}
		}
	}

	handleUp() {
		this.setState({
			move: false
		});
	}

	handleTouchEnd() {
		this.setState({
			move: false
		});
	}

	updateCard() {
		if (!this.state.move) {
			this.setState(
				{
					fx: -this.state.k * (this.state.Posx - this.state.restX),
					fy: -this.state.k * (this.state.Posy - this.state.restY)
				},
				() => {
					this.setState(
						{
							ax: this.state.fx / this.state.mass,
							ay: this.state.fy / this.state.mass
						},
						() => {
							this.setState(
								{
									vx: this.state.damping * (this.state.vx + this.state.ax),
									vy: this.state.damping * (this.state.vy + this.state.ay)
								},
								() => {
									this.setState({
										Posx: this.state.Posx + this.state.vx,
										Posy: this.state.Posy + this.state.vy
									});
								}
							);
						}
					);
				}
			);
		}
	}

	animate() {
		let el = document.getElementById("card" + this.props.no);
		if (
			this.state.Posx > window.innerWidth + 400 ||
			this.state.Posx < -window.innerWidth - 400
		) {
			cancelAnimationFrame(this.animate);
		} else {
			requestAnimationFrame(this.animate);
		}
		if (this.state.active && el) {
			el.style.transform =
				"translate(" +
				this.state.Posx +
				"px" +
				"," +
				this.state.Posy +
				"px) rotate(" +
				this.state.Posx / 9 +
				"deg) perspective(800px)";
			this.updateCard();
		}
	}

	render() {
		return (
			<div
				id={"card" + this.props.no}
				className={"card color" + this.props.color}
				onMouseDown={this.handleDown}
				onMouseMove={this.handleMove}
				onMouseUp={this.handleUp}
				onMouseLeave={this.handleUp}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}
				onTouchEnd={this.handleTouchEnd}
			>
			{this.props.senderID===this.state.creatorID? <Button style={{right:"-13vw"}} onClick={async ()=>{
				const response=await axios.delete(`/api/users/${this.props.senderID}/${this.state.postid}`)
				if(!response.data.err)
					window.location.reload();
			}}><CloseIcon/></Button>:null}{this.props.senderID===this.state.creatorID? <br/>:null}
			{this.state.scheduleLink? <img alt={"schedule"} style={{width:"22vw",height:"12vw"}}src={this.state.scheduleLink}/>:
			<img alt={"schedule"} style={{width:"12vw",height:"12vw"}}src="https://cdn3.iconfinder.com/data/icons/calendar-28/200/181-512.png"/>}
			<div className="text small">Major: {this.state.dash}-{this.state.major}</div>
            <div className="text">From: {this.state.fromTutorial}</div>
			<div className="text">To: {this.state.goToTutorials? this.state.goToTutorials.map((item,i)=>{return i>0? ", "+item:item}):null}</div>
			<div className="text inline">German:</div> <div className="text small inline">{this.state.germanLevel}</div><br/>
			<div className="text inline">English:</div> <div className="text small inline">{this.state.englishLevel}</div>
			<div className="text">Double Switch: {this.state.openForDoubleSwitch? <CheckIcon/>:<CloseIcon/>}</div><br/>
			{this.props.senderID===""? null:<Button style={{ color:"#ffffff", fontWeight: "900"}} onClick={async ()=>{
				const body={
					email:this.state.email,
					subject:"Request to switch",
					senderEmail:this.state.senderEmail,
					senderFullName:this.state.senderFullName,
					senderDash:this.state.senderDash,
					senderID:this.state.senderID,
					senderMajor:this.state.senderMajor,
					senderTutorial:this.state.senderTutorial,
					senderMobileNumber:this.state.senderMobileNumber,
					senderFacebookAccount:this.state.senderFacebookAccount,
					senderGermanLevel:this.state.senderGermanLevel,
					senderEnglishLevel:this.state.senderEnglishLevel
				}
				const response=await axios.post('/api/users/sendMail',body)
				this.props.alertSnack(response);
			}}>Send Request</Button>}
			</div>
		);
	}
}

class cards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user:[],
			loaded:false,
			alerted:false,
			alertMsg:"",
			alertType:""
		}
	}
	async componentDidMount() {
		
	}
	async alertSnack(response){
		if (response.data.err) {
			await this.setState({
			  alerted: true,
			  alertType: "error",
			  alertMsg: "Error sending request."
			});
		  } else {
			await this.setState({
			  alerted: true,
			  alertType: "success",
			  alertMsg: "Request has been sent successfully."
			});
		  }
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
		return <div className="app" style={{backgroundColor:this.props.backColor}}>
		{this.props.showButtons? <div style ={{float:"left", width:"25vw", marginTop:"100px"}}>
				<Fab onClick={this.props.showFilterModal}><FilterListIcon/></Fab>
		</div>:null}
		{this.props.showButtons? <div style ={{ float:"right",width:"25vw",marginTop:"100px"}}>
						{this.state.id===""? null:<Fab onClick={this.props.showPostModal}><AddIcon /></Fab>}
		</div>:null}
		
		{this.props.posts.length>0?
		(
			this.props.posts.map((item, i) => 
			{
				return ((this.props.majorFilter==="" || item.creator.major===this.props.majorFilter) && (this.props.dashFilter==="" || item.creator.dash===this.props.dashFilter))?
				<Card key={i} no={i} color={this.props.color} data={item} senderID={this.props.senderID} alertSnack={this.alertSnack.bind(this)}/>:null;
			})
		):"No posts found"
		}
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
export default cards;