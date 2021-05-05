/**
 *
 * NoteEditor
 *
 */

import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Editor from './Editor';
import useOutsideClick from 'utils/useOutsideClick';

const StyledInput = styled.input`
  width: 500px;

  @media (max-width: 500px) {
    width: 400px;
  }
  height: 45px;

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

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

function NoteEditor(props) {
  const wrapperRef = useRef(null);
  const hideEditor = () => {
    setShowEditor(false);
  }

  useOutsideClick(wrapperRef, hideEditor);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (props.data) {
      setShowEditor(true);
    }
  },[props.data]);

  return <StyledContainer>
    {!props.data && !showEditor ? <StyledInput onFocus={() => setShowEditor(true)} placeholder='Take a note'/> :
    <Editor data={props.data} onClose={props.data ? props.closeEditor: hideEditor} onSave={(title, content, isArchived, isPinned) => {props.onSave(title, content, isArchived, isPinned); setShowEditor(false)}} ref={wrapperRef}/>}
  </StyledContainer>;
}

NoteEditor.propTypes = {};

export default NoteEditor;
