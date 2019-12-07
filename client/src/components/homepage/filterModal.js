import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
class filterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
	
    render(){
        return <div>
            <FormControl variant="outlined" fullWidth>
				<InputLabel>Major</InputLabel>
					<Select fullWidth onChange={(e)=>{this.props.onFilterMajor(e)}} >
						<MenuItem value={""}>Show All Majors</MenuItem>
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
            <FormControl variant="outlined" fullWidth>
                <InputLabel>Dash</InputLabel>
                <Select fullWidth onChange={(e)=>{this.props.onFilterDash(e)}} >
                    <MenuItem value={""}>Show All Dashes</MenuItem>
                    <MenuItem value={37}>37-</MenuItem>
                    <MenuItem value={40}>40-</MenuItem>
                    <MenuItem value={43}>43-</MenuItem>
                    <MenuItem value={46}>46-</MenuItem>
                    <MenuItem value={49}>49-</MenuItem>
                </Select>
            </FormControl>
        </div>
    }
}
export default filterModal;