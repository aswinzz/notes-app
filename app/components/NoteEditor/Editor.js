import React, { useState, useEffect } from 'react';

// import PropTypes from 'prop-types';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import "@uiw/react-md-editor/dist/markdown-editor.css";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitleInput = styled.input`
  width: 500px;
  @media (max-width: 500px) {
    width: 400px;
  }
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

const StyledContentInput = styled.textarea`
  width: 500px;
  @media (max-width: 500px) {
    width: 400px;
  }
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

const ButtonItems = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
    overflow: visible;
    text-transform: none;
    background: ${props => props.background ? props.background : '#1890ff'};
    border-color: ${props => props.background ? props.background : '#1890ff'};
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
    color: #fff;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    margin: 12px 8px;
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

const StyledActionItem = styled.div`
  margin: 0px 5px;
  cursor: pointer;
`;

function Editor(props, ref) {
  const [title, setTitle] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [content, setContent] = useState('');
  const [actionsVisible, setActionsVisible] = useState(true);

  useEffect(() => {
    if (props.data) {
      const { title, content, isPinned: isPinnedData, isArchived: isArchivedData} = props.data;
      setTitle(title || '');
      setContent(content || '');
      setIsPinned(isPinnedData || false);
      setIsArchived(isArchivedData || false);
    }
  }, [props.data]);

  const toggleIsPinned = () => {
    if (!isPinned) {
      setIsArchived(false);
    }
    setIsPinned(current => !current);
  }

  const toggleIsArchived = () => {
    if (!isArchived) {
      setIsPinned(false);
    }
    setIsArchived(current => !current);
  }
  return <StyledContainer onMouseEnter={() => setActionsVisible(true)} onMouseLeave={() => setActionsVisible(false)} ref={ref}>
    <StyledActions style={actionsVisible ? {opacity: 1} : {opacity: 0}}>
      <StyledActionItem>
              {isPinned ?
                <svg onClick={toggleIsPinned} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M8 17h2v5l-2 2v-7zm2-11.5c0-2.319 1.219-4.35 3.047-5.5h-9.047c.068 1.911 2.429 2.097 2.429 5 0 3.771-3.429 3.291-3.429 10h12c0-1.358-.145-2.412-.369-3.276-2.678-.803-4.631-3.284-4.631-6.224zm11 0c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"/></svg>:
                <svg onClick={toggleIsPinned} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M8 17h2v5l-2 2v-7zm4.462-6.412c.246.625.437 1.39.506 2.412h-7.936c.297-4.36 2.757-4.163 2.757-7.65 0-1.605-.522-2.35-1.272-3.35h4.512c.518-.807 1.207-1.489 2.019-2h-9.048c0 3.656 1.789 2.979 1.789 5.351 0 1.073-.364 1.59-.915 2.373-1.782 2.532-1.874 4.148-1.874 7.276h12c0-1.27-.021-2.287-.159-3.222-.88-.232-1.688-.64-2.379-1.19zm8.538-5.088c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-3.086-2.122l-1.414 1.414-1.414-1.414-.707.708 1.414 1.414-1.414 1.414.707.708 1.414-1.415 1.414 1.414.708-.708-1.414-1.413 1.414-1.414-.708-.708z"/></svg>
              }
      </StyledActionItem>
      <StyledActionItem>
              {isArchived ?
                <svg onClick={toggleIsArchived} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M18.546 1h-13.069l-5.477 8.986v13.014h24v-13.014l-5.454-8.986zm-3.796 12h-5.5l-2.25-3h-4.666l4.266-7h10.82l4.249 7h-4.669l-2.25 3zm-9.75-4l.607-1h12.786l.607 1h-14zm12.18-3l.607 1h-11.573l.606-1h10.36zm-1.214-2l.606 1h-9.144l.607-1h7.931z"/></svg> :
                <svg onClick={toggleIsArchived} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M2.688 6l-.688-2h20l-.604 2h-18.708zm17.541-4l.739-2h-17.968l.792 2h16.437zm2.162 8l.609-2h-22l.609 2h20.782zm-.752 4l-1.333 8h-16.612l-1.333-8h3.639l2.25 3h7.5l2.25-3h3.639zm2.361-2h-7l-2.25 3h-5.5l-2.25-3h-7l2 12h20l2-12z"/></svg>
              }
      </StyledActionItem>
    </StyledActions>
    <StyledTitleInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
    {/* <StyledContentInput rows={10} value={content} onChange={(e) => setContent(e.target.value)} placeholder='Take a note..'/> */}
    <MDEditor
        value={content}
        onChange={setContent}
      />
    <ButtonItems>
    <Button background={'gray'} onClick={() => (props.data|| (!title && !content)) ? props.onClose() : props.onSave(title, content, isArchived, isPinned)}>Close</Button>
    <Button disabled={!title && !content} onClick={() => props.onSave(title, content, isArchived, isPinned)}>Save</Button>
    </ButtonItems>
  </StyledContainer>;
}

Editor.propTypes = {};

export default React.forwardRef(Editor);
