import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export const NavbarLayout = () => {
  return (
    <>
      <NavBar/>
      <div>
        <Outlet/>
      </div>
    </>
  )
}