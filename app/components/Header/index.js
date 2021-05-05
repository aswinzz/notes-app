import React from 'react';
import NavBar from './NavBar';
import MenuIcon from './MenuIcon';
import Search from './Search';
import styled from 'styled-components';

const StyledHeading = styled.div`
    align-self: center;
    color: white;
    font-size: 21px;
    margin-left: 10px;
`;

function Header(props) {
  return (
    <div>
      <NavBar>
        <MenuIcon openNav={props.openNav}/>
        <StyledHeading>{props.activePage}</StyledHeading>
        <Search onSearchTextChange={props.onSearchTextChange} searchText={props.searchText}/>
      </NavBar>
    </div>
  );
}

export default Header;
