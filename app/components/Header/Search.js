import React from 'react';
import styled from 'styled-components';

const StyledSearch = styled.div`
  margin-left: auto;
  margin-top: 8px;
  position: relative;
`;

const StyledInput = styled.input`
  /* border-radius: 10px; */
  height: 30px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  font-size: 1rem;
  line-height: 1.5;
  font-weight: 400;
  color: #333;
  background-color: white;

  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0.25rem;
  padding: 0.5em 0.75em;

  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &::placeholder {
    opacity: 0.56;
    color: #000;
  }

  /* HOVER & FOCUS
  --------------------------------------- */
  &:hover {
    border-color: #4a4a4a;
  }

  &:focus {
    outline: none;
    border: 1px solid rgba(0, 149, 255, 1);
    box-shadow: 0px 0px 1px 1px rgba(0, 149, 255, 1);
  }
`;

const StyledCross = styled.span`
  position: absolute;
  color: black;
  right: 11px;
  top: -4px;
  font-size: 24px;
  cursor: pointer;
`;
const Search = (props) => (
  <StyledSearch>
    <StyledInput value={props.searchText} onChange={(e) => props.onSearchTextChange(e.target.value)} placeholder='Search..'/>
    <StyledCross onClick={() => props.onSearchTextChange('')}>&times;</StyledCross>
  </StyledSearch>
);

export default Search;
