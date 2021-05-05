import React from 'react';
import styled from 'styled-components';

const StyledMenuIcon = styled.div`
  margin: 10px;
  cursor: pointer;
`;

const MenuIcon = (props) => (
  <StyledMenuIcon onClick={props.openNav}>
    <svg fill="white" viewBox="0 0 100 80" width="25" height="25">
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
    </svg>
  </StyledMenuIcon>
);

export default MenuIcon;
