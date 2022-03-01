import React, { Component} from 'react';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const DynamicSelect = ({id, label, state, changeCookie, handleChange, MenuItems}) => (
    /*
    id: a unique name to describe the form input
    label: the human readable name that will be displayed
    value: the value connected to the state
    handleChange: function to be called on value change
    changeCookie: function to be called to update cookie values
    MenuItems: list of (value, label) pairs    
    */
    <FormControl fullWidth>
        <InputLabel id={`${id}-select-label`}>{label}</InputLabel>
        <Select
            labelId={`${id}-select-label`}
            id={`${id}-select`}
            value={state[id]}
            label={label}
            onChange={(event)=>{
                handleChange(id, event)
                changeCookie(id, event.target.value)
            }}
        >
        {MenuItems.map(([value,label], index) =>(
            <MenuItem key= {index} value={value}>{label}</MenuItem>
        ))}
        </Select>
    </FormControl>
)

class Options extends Component {
    constructor(props) {
        super(props);
        this.setOptions = this.props.setOptions
        this.cookies = this.props.cookies
        this.state = {
            fontSize: this.cookies.get('fontSize'),
            chatColour: this.cookies.get('chatColour'),
            lang: this.cookies.get('lang'),
            numResults: this.cookies.get('numResults'),
            isSummarised: this.cookies.get('isSummarised')
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (id, event)=>{
        this.setState({[id]: event.target.value});
        this.setOptions(this.state)
    }
    
    changeCookie = (id, value)=>{
        this.cookies.set(id, value, { path: '/' })
    }

    render() {
        return (
            <Card sx={{ 
                minWidth: 400,
                display:"flex",
                flexDirection: "column",
                rowGap: "30px",
                outline: "1px solid #ccc",
                padding: "20px",
            }}>

                <DynamicSelect 
                    id = "fontSize"
                    label = "Font Size"
                    state = {this.state}
                    handleChange = {this.handleChange}
                    changeCookie = {this.changeCookie}
                    MenuItems = {[
                        [15,"15 px"],
                        [20,"20 px"],
                        [25,"25 px"]
                    ]}
                />

                <DynamicSelect 
                    id = "chatColour"
                    label = "Chat Colour"
                    state = {this.state}
                    handleChange = {this.handleChange}
                    changeCookie = {this.changeCookie}
                    MenuItems = {[
                        ['r',"Red"],
                        ['g',"Green"],
                        ['b',"Blue"],
                        ['y',"Yellow"]
                    ]}
                />

                <DynamicSelect 
                    id = "lang"
                    label = "Language"
                    state = {this.state}
                    handleChange = {this.handleChange}
                    changeCookie = {this.changeCookie}
                    MenuItems = {[
                        "English",
                        "French",
                        "Spanish",
                        "German"
                    ].map((x,i) => [i, x])}
                />

                <DynamicSelect 
                    id = "numResults"
                    label = "Number of Results to Display"
                    state = {this.state}
                    handleChange = {this.handleChange}
                    changeCookie = {this.changeCookie}
                    MenuItems = {[1,2,3,4,5].map(x => [x, x])}
                />

                <DynamicSelect 
                    id = "isSummarised"
                    label = "Summarise Results?"
                    state = {this.state}
                    handleChange = {this.handleChange}
                    changeCookie = {this.changeCookie}
                    MenuItems ={[
                        [1,"Yes"],
                        [0, "No"]
                    ]}
                />

            </Card>
        )
    }
}

export default Options;