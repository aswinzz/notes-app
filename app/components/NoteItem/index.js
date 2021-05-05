/**
 *
 * NoteItem
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tooltip from 'components/Tooltip';
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/dist/markdown-editor.css";

const CardContainer = styled.div`
  width: 240px;
  margin: 10px;
`;

const CardItem = styled.div`
    background-color: #202124;
    border-color: #5f6368;
    border: 1px solid transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    -webkit-transition-duration: .218s;
    transition-duration: .218s;
`;

const CardContentContainer = styled.div`
  min-height: 60px;
  overflow: hidden;
  position: relative;
  -webkit-transition: max-height .218s ease-in;
  transition: max-height .218s ease-in;
`;

const CardContent = styled.div`
  min-height: 30px;
  padding-top: 12px;
  cursor: default;
  letter-spacing: .01428571em;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.25rem;
  color: #e8eaed;
  padding: 4px 16px 12px 16px;
`;

const CardActions = styled.div`
    align-items: center;
    color: rgba(0,0,0, .54 );
    display: flex;
    -webkit-flex-direction: row-reverse;
    flex-direction: row-reverse;
    -webkit-flex-wrap: wrap-reverse;
    flex-wrap: wrap-reverse;
    font-size: 12px;
    line-height: 26px;
    margin: 4px 0;
    position: relative;
    -webkit-transition: background-color .218s ease-in-out,box-shadow .218s ease-in-out;
    transition: background-color .218s ease-in-out,box-shadow .218s ease-in-out;
`;

const CardActionsContainer = styled.div`
  flex: 1 0 auto;
  box-sizing: border-box;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  /* opacity: 0; */
  -webkit-transition-duration: .218s;
  transition-duration: .218s;
  -webkit-transition-property: opacity;
  transition-property: opacity;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
`;

const CardActionItem = styled.div`
  color: #fff;
  /* opacity: .71; */
  height: 32px;
  margin: 0 8px;
  width: 45px;
  text-align: center;
  cursor: pointer;
`;

function NoteItem(props) {
  const [showActions, setShowActions] = useState(false);

  const clickEvent = (e, type) => {
    e.stopPropagation();
    if (type === 'pin') {
      props.pinItem(props.note.id)
    }
    if (type === 'archive') {
      props.archiveItem(props.note.id)
    }
    if (type === 'delete') {
      props.deleteItem(props.note.id)
    }
  }

  return <CardContainer>
    <CardItem onClick={() => props.openModal(props.note)} onMouseEnter={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
    <CardContentContainer>
      <CardContent>
        <h3>{props.note.title}</h3>
        {/* {props.note.content} */}
        <MDEditor.Markdown source={props.note.content} />
      </CardContent>
      <CardActions style={showActions ? {opacity: 1} : {opacity: 0}} >
          <CardActionsContainer>
            <CardActionItem onClick={(e) => clickEvent(e, 'pin')}>
              {props.note.isPinned ?
                <Tooltip tooltipText={'UnPin'}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M8 17h2v5l-2 2v-7zm4.462-6.412c.246.625.437 1.39.506 2.412h-7.936c.297-4.36 2.757-4.163 2.757-7.65 0-1.605-.522-2.35-1.272-3.35h4.512c.518-.807 1.207-1.489 2.019-2h-9.048c0 3.656 1.789 2.979 1.789 5.351 0 1.073-.364 1.59-.915 2.373-1.782 2.532-1.874 4.148-1.874 7.276h12c0-1.27-.021-2.287-.159-3.222-.88-.232-1.688-.64-2.379-1.19zm8.538-5.088c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-3.086-2.122l-1.414 1.414-1.414-1.414-.707.708 1.414 1.414-1.414 1.414.707.708 1.414-1.415 1.414 1.414.708-.708-1.414-1.413 1.414-1.414-.708-.708z"/></svg></Tooltip>
                :
                <Tooltip tooltipText={'Pin'}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M8 17h2v5l-2 2v-7zm2-11.5c0-2.319 1.219-4.35 3.047-5.5h-9.047c.068 1.911 2.429 2.097 2.429 5 0 3.771-3.429 3.291-3.429 10h12c0-1.358-.145-2.412-.369-3.276-2.678-.803-4.631-3.284-4.631-6.224zm11 0c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"/></svg></Tooltip>
              }
            </CardActionItem>
            <CardActionItem onClick={(e) => clickEvent(e, 'archive')}>
            <Tooltip tooltipText={props.note.isArchived ? 'UnArchive' : 'Archive'}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M18.546 1h-13.069l-5.477 8.986v13.014h24v-13.014l-5.454-8.986zm-3.796 12h-5.5l-2.25-3h-4.666l4.266-7h10.82l4.249 7h-4.669l-2.25 3zm-9.75-4l.607-1h12.786l.607 1h-14zm12.18-3l.607 1h-11.573l.606-1h10.36zm-1.214-2l.606 1h-9.144l.607-1h7.931z"/></svg></Tooltip>
            </CardActionItem>
            <CardActionItem  onClick={(e) => clickEvent(e, 'delete')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
            </CardActionItem>
          </CardActionsContainer>
      </CardActions>
    </CardContentContainer>
  </CardItem>
  </CardContainer>;
}

NoteItem.propTypes = {};

export default NoteItem;
