import { useState } from 'react';
import classes from './app.module.scss';
import { Link, Outlet } from 'react-router-dom';
import HatPNG from '@/assets/hat-png.png';
import HatJPG from '@/assets/hat-jpeg.jpg';
import Calendar from '@/assets/calendar.svg';
import { BuildPlatform } from '../../config/enums/enums';

function todo1(title: string) {
  throw new Error('BOMS');
}

function todo2(title: string) {
 todo3(title);
}

function todo3(title: string) {
  todo1(title);
 }

export const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrementBtnClick = () => todo3('1212');
  // setCount((prev) => ++prev);

  // if (__PLATFORM__ === BuildPlatform.Desktop) {
  //   return <h1>IS DESKTOP PLATFORM</h1>;
  // }

  // if (__PLATFORM__ === BuildPlatform.Mobile) {
  //   return <h1>IS MOBILE PLATFORM</h1>;
  // }

  return (
    <div data-testId="App.DataTestId" className={classes.count}>
      <h1>PLATFORM={__PLATFORM__}</h1>
      <div>
        <img src={HatPNG} width="250px" alt="some-png" />
        <img src={HatJPG} height="200px" alt="some-jpg" />
      </div>
      <div>
      <Calendar color='green' width='200px' height='200px'/>
      </div>
      Current count: {count}
      <br />
      <button className={classes.button} onClick={handleIncrementBtnClick}>
        Increment
      </button>
      <Outlet />
      <br />
      <Link to='/about'>В подробности</Link>
      <br />
      <Link to='/shop'>За покупками</Link>
    </div>
  )
}