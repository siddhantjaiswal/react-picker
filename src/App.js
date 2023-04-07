import React, { useState } from 'react';
import './App.css';
import YearPicker from './yearPicker/yearPicker';
// import CalendarIcon from './yearPicker/assets/calendar-icon.svg';
// import LeftArrow from './yearPicker/assets/left-arrow.svg';
// import RightArrow from './yearPicker/assets/right-arrow.svg';
function App() {
  const [yearSelected, setYear] = useState(1990);
  const yearArr = ['Asdas s s','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  // const yearArr = [ 1990,  1991, 1992, 1993, 1994, 1996,  1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007]
  // const yearArr = [CalendarIcon, LeftArrow, RightArrow].map((icon) => <img src={icon}/>)
  return (
    <div className="App">
      <header className="App-header">
        <YearPicker
          yearArray={yearArr}
          value={yearSelected}
          onSelect={(e) => setYear(e)}
          // activeIcon={img src}
          // icon={img src}
          // leftIcon={img src}
          // rightIcon={img src}
          minRange={1900}
          maxRange={2018}
        />
      </header>
    </div>
  );
}

export default App;
