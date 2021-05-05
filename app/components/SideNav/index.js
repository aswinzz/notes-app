/**
 *
 * SideNav
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function SideNav(props, ref) {
  return <div ref={ref} className={`sidenav ${props.isOpen ? 'sidenav--open': ''}`}>
    <a onClick={props.closeNav} className="closebtn">&times;</a>
    <a onClick={() => props.open('notes')}>Notes</a>
    <a onClick={() => props.open('pinned')}>Pinned</a>
    <a onClick={() => props.open('archives')}>Archived</a>
  </div>;
}

SideNav.propTypes = {};

export default React.forwardRef(SideNav);
