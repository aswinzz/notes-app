/**
 *
 * Tooltip
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSpan = styled.span`
    position: relative;
    cursor: pointer;
    &:hover:before {
        opacity: 1;
    }

    &:before {
        content: attr(aria-label);
        opacity: 0;
        position: absolute;
        top: -56px;
        right: -45px;
        font-size: 14px;
        width: 100px;
        padding: 10px;
        color: #ffffff;
        background-color: #555555;
        border-radius: 3px;
        pointer-events: none;
    }
`;

function Tooltip(props) {
  return <StyledSpan aria-label={props.tooltipText}>{props.children}</StyledSpan>  ;
}

Tooltip.propTypes = {};

export default memo(Tooltip);
