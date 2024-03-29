import React from 'react';
import './yearPickerStyle.css'
import CalendarIcon from './assets/calendar-icon.svg';
import LeftArrow from './assets/left-arrow.svg';
import RightArrow from './assets/right-arrow.svg';
import ActiveCalendarIcon from './assets/calendar-icon-active.svg';

const getYearsArrayFromRange = (startYear, endYear) => {
    const yearTabs = [];
    for (let i = endYear; i >= startYear; i--) {
        yearTabs.push(i);
    }
    return yearTabs;
}

class YearPicker extends React.Component {
    constructor(props) {
        super(props);

        let { minRange, maxRange, yearArray = [] } = this.props;
        if (!yearArray.length) {
            yearArray = getYearsArrayFromRange(1800, new Date().getFullYear);
        }
        if (minRange && maxRange) {
            yearArray = getYearsArrayFromRange(minRange, maxRange);

        }

        console.log('yearArray', yearArray)
        this.state = {
            showPicker: false,
            selectedValue: this.props.value,
            selectedIndexArray: 0,
            selectedArray: this.getYearsArray(yearArray, 0, 12),
            originalArray: yearArray,

        }
    }

    getYearsArray = (originalArray, initailIndex, lastIndex) => {
        let newArray = originalArray;
        newArray = newArray.slice(initailIndex, lastIndex);
        return newArray;
    }

    handlePicker = () => {
        this.setState({
            showPicker: !this.state.showPicker
        })
    }
    static getDerivedStateFromProps(nextProps, prevState) {

        let { yearArray = [], minRange, maxRange, value } = nextProps;
        const { originalArray, selectedValue } = prevState;
        console.log('originalArrayoriginalArray', originalArray)
        if (!yearArray.length) {
            yearArray = getYearsArrayFromRange(1800, new Date().getFullYear());
        }
        if (minRange && maxRange) {
            yearArray = getYearsArrayFromRange(minRange, maxRange);
        }
        if (JSON.stringify(yearArray) === JSON.stringify(originalArray) && value !== selectedValue) {
            return {
                showPicker: false,
                selectedValue: value
            };
        }
        if (JSON.stringify(yearArray) !== JSON.stringify(originalArray)) {
            let newArray = Array.from(yearArray);
            newArray = newArray.slice(0, 12);
            return {
                originalArray: yearArray,
                selectedArray: newArray,
                selectedIndexArray: 0,
                showPicker: false,
                selectedValue: value
            };
        }
        return null;
    }

    getYearsList() {
        const { selectedValue } = this.state;
        const { onSelect } = this.props;
        return this.state.selectedArray.map((obj, index) => {
            return (
                <span key={obj} style={
                    {
                        backgroundColor: selectedValue === obj ? '#db0040' : '',
                        color: selectedValue === obj ? '#fff !importt' : 'rgb(16, 23, 44)'
                    }}>
                    <span className="StyledYear" onClick={() => onSelect ? onSelect(obj) : alert(obj)}>{obj}</span>
                    {(index + 1) % 4 === 0 && <br />}
                </span>
            )
        })
    }
    incrementValue = () => {
        const { selectedIndexArray, originalArray } = this.state
        console.log('originalArrayoriginalArray', originalArray)
        if (selectedIndexArray + 12 <= originalArray.length - 1) {
            const newArray = this.getYearsArray(originalArray, selectedIndexArray + 12, selectedIndexArray + (12 * 2))
            this.setState({
                selectedArray: newArray,
                selectedIndexArray: selectedIndexArray + 12
            })
        }
    }
    decrementValue = () => {
        const { selectedIndexArray, originalArray } = this.state
        if (selectedIndexArray - 12 >= 0) {
            const newArray = this.getYearsArray(originalArray, selectedIndexArray - 12, selectedIndexArray)
            this.setState({
                selectedArray: newArray,
                selectedIndexArray: selectedIndexArray - 12
            })
        }
    }
    render() {
        const { showPicker, selectedArray } = this.state;
        const { leftIcon, rightIcon, icon, activeIcon } = this.props;

        return (
            <div>
                <img style={{ height: '30px', width: '30px' }} onClick={this.handlePicker} src={
                    showPicker ?
                        icon ? icon : CalendarIcon : activeIcon ? activeIcon : ActiveCalendarIcon} />
                {
                    // showPicker &&
                    <div id='picker-container' className={`Header ${showPicker ? 'isOpen' : ''}`}>
                        <div className="StyledHeader">
                            <div className="StyledContainer">
                                <span className={`clickable ${(this.state.selectedIndexArray - 12 >= 0) ? '' : 'disabled'}`} onClick={this.decrementValue}>
                                    {<img style={{ maxWidth: '15px' }} src={leftIcon || LeftArrow} alt={leftIcon} />}
                                </span>
                                <span>
                                    {selectedArray[0]}-{selectedArray[selectedArray.length - 1]}
                                </span>
                                <span className={`clickable ${(this.state.selectedIndexArray + 12 <= (this.state.originalArray.length > 0 ? this.state.originalArray.length - 1 : this.props.yearArray.length - 1)) ? '' : 'disabled'}`} onClick={this.incrementValue}>
                                    {<img style={{ maxWidth: '15px' }} src={rightIcon || RightArrow} alt={rightIcon} />}
                                </span>
                            </div>
                            <div className="StyledCalendarBody">
                                {this.getYearsList()}
                            </div>
                        </div>
                        <div className="BackDrop" onClick={() => this.handlePicker()} />
                    </div>}
            </div>
        );
    }
}

export default YearPicker;