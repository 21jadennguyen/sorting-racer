import React from 'react'
import "./SortingVisualizer.scss"
import Slider from "@mui/material/Slider"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';



const testColor = 'turquoise';
const array1Color = 'darkBlue';
const array2Color = 'blue';
const swappingColor = 'darkred';
const sortedColor = 'black';
let flag = false;

export default class SortingVisualizer extends React.Component {
    // Sorting Stuff
    constructor(props) {
        super(props)

        this.state = {
            array1: [],
            array2: [],
            ARRAY_MAX: 100,
            ARRAY_MIN: 5,
            ARRAY_SIZE: 50,
            ANIMATION_DELAY: 10,
            ARRAY1_SORT: 1,
            ARRAY2_SORT: 1
        };
    }

    componentDidMount() {
        this.generateNewArrays();
    }

    generateNewArrays() {
        flag = true;
        const array1 = [];
        const array2 = [];
        for (let i = 0; i < this.state.ARRAY_SIZE; i++) {
            array1.push(Math.floor(Math.random() * (this.state.ARRAY_MAX - this.state.ARRAY_MIN + 1) + this.state.ARRAY_MIN))
        }

        for (let i = 0; i < this.state.ARRAY_SIZE; i++) {
            array2.push(Math.floor(Math.random() * (this.state.ARRAY_MAX - this.state.ARRAY_MIN + 1) + this.state.ARRAY_MIN))
        }

        this.setState({array1, array2})
    }

    resetColors(){
        let bars1 = document.getElementsByClassName('bar1');
        for (let i = 0; i < bars1.length; i++) {
            bars1[i].style.backgroundColor = array1Color;
        }

        let bars2 = document.getElementsByClassName('bar2');
        for (let i = 0; i < bars2.length; i++) {
            bars2[i].style.backgroundColor = array2Color;
        }
    }

    chooseSort(num, arrNum) {
        switch (num) {
            case 1:
                this.selectionSort(arrNum);
                break;
            case 2:
                this.insertionSort(arrNum);
                break;
            default:
                break;
        }
    }

    async selectionSort(arrNum) {
        let bars = []
        let arrayColor = ''
        let arr = []
        if (arrNum === 1) {
            arr = this.state.array1;
            arrayColor = array1Color;
        } else {
            arr = this.state.array2;
            arrayColor = array2Color;
        }
        bars = document.getElementsByClassName(`bar${arrNum}`);

        flag = false;
        for (let i = 0; i < bars.length; i++) {
            let min = i;
            bars[i].style.backgroundColor = testColor;
            for (let j = i+1; j < bars.length; j++) {
                if (flag) {
                    return;
                }
                bars[j].style.backgroundColor = testColor;
                await delay(this.state.ANIMATION_DELAY);
                bars[j].style.backgroundColor = arrayColor;
                if (arr[j] < arr[min]) {
                    bars[min].style.backgroundColor = arrayColor;
                    min = j
                    bars[min].style.backgroundColor = swappingColor;
                }
            }
            
            if (min !== i) {
                await delay(this.state.ANIMATION_DELAY);
                let temp = arr[min];
                arr[min] = arr[i];
                arr[i] = temp;

                temp = bars[min].style.height;
                bars[min].style.height = bars[i].style.height;
                bars[i].style.height = temp;

                bars[min].style.backgroundColor = arrayColor;
            }
            bars[i].style.backgroundColor = sortedColor;
        }
    }

    async insertionSort(arrNum){
        let bars = []
        let arrayColor = ''
        let arr = []
        if (arrNum === 1) {
            arr = this.state.array1;
            arrayColor = array1Color;
        } else {
            arr = this.state.array2;
            arrayColor = array2Color;
        }
        bars = document.getElementsByClassName(`bar${arrNum}`);

        flag = false;
        let i, key, j, keyHeight;
        for (i = 1; i < bars.length; i++) {
            if (flag) {
                return;
            }
            key = arr[i];
            keyHeight = bars[i].style.height;
            bars[i].style.backgroundColor = swappingColor;
            j = i - 1;

            while (j >= 0 && arr[j] > key) {
                bars[j+1].style.backgroundColor = testColor;
                await delay(this.state.ANIMATION_DELAY);
                bars[j+1].style.height = bars[j].style.height;
                arr[j+1] = arr[j];
                bars[j+1].style.backgroundColor = arrayColor;
                j = j - 1;
            }
            arr[j+1] = key;
            bars[j+1].style.color = swappingColor;
            await delay(this.state.ANIMATION_DELAY);
            bars[j+1].style.color = arrayColor;
            bars[j+1].style.height = keyHeight;
        }
        for (i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = sortedColor;
        }
    }

    render() {
        const {array1, array2} = this.state;

        return (
        <>
            <div className='container' id='container'> 
                <div className='arrayContainer' id='arrayContainer'>
                    {array1.map((value, i) => (
                    <div className='bar1' id='bar1' key={i} style={{height: `${(value/this.state.ARRAY_MAX)*100}%`, backgroundColor: `${array1Color}`, width: `${100/this.state.ARRAY_SIZE}%`}}></div>
                    ))}
                </div>
                <div className='arrayContainer' id='arrayContainer'>
                    {array2.map((value, i) => (
                    <div className='bar2' id='bar2' key={i} style={{height: `${(value/this.state.ARRAY_MAX)*100}%`, backgroundColor: array2Color, width: `${100/this.state.ARRAY_SIZE}%`}}></div>
                    ))}
                </div>
            </div>
            <div className='bottomBar' id='bottomBar'>
                <Button variant='contained' className='button' id='button' onClick={() => {this.generateNewArrays(); this.resetColors()}}>Generate New Arrays</Button>
                <Button variant='contained' className='button' id='button' onClick={() => {this.chooseSort(this.state.ARRAY1_SORT, 1); this.chooseSort(this.state.ARRAY2_SORT, 2)}}>Sort Arrays</Button>
                <div className='componentBox' id='componentBox' style={{width: `15%`}}>
                    <div>Animation Delay: {`${this.state.ANIMATION_DELAY}`}ms</div>
                    <Slider min={1} max={200} value={this.state.ANIMATION_DELAY} onChange={(event, value) => {this.setState({ANIMATION_DELAY: value})}} size='small' />
                </div>
                <div className='componentBox' id='componentBox' style={{width: `10%`}}>
                    <div>Size of Arrays: {`${this.state.ARRAY_SIZE}`}</div>
                    <Slider min={1} max={75} value={this.state.ARRAY_SIZE} onChange={(event, value) => {this.setState({ARRAY_SIZE: value})}} size='small' />
                </div> 
                <div className='componentBox' id='componentBox' style={{width: `15%`}}>
                    Array 1 Sorting Algorithm:
                    <FormControl style={{width: `100%`}} >
                        <Select
                            value={this.state.ARRAY1_SORT}
                            onChange={(event, value) => {this.setState({ARRAY1_SORT: event.target.value})}}
                            style={{color: 'white', height: '55%', borderColor: 'white'}}
                        >
                            <MenuItem value={1}>Selection Sort</MenuItem>
                            <MenuItem value={2}>Insertion Sort</MenuItem>
                        </Select>
                    </FormControl>
                </div> 
                <div className='componentBox' id='componentBox' style={{width: `15%`}}>
                    <div> Array 2 Sorting Algorithm: </div>
                    <FormControl style={{width: `100%`}} >
                        <Select
                            value={this.state.ARRAY2_SORT}
                            onChange={(event, value) => {this.setState({ARRAY2_SORT: event.target.value})}}
                            style={{color: 'white', height: '55%'}}
                        >
                            <MenuItem value={1}>Selection Sort</MenuItem>
                            <MenuItem value={2}>Insertion Sort</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </>
        )
    }
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n);
    });
}

// Material-ui stuff
