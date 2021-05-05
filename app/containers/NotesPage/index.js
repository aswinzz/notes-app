/**
 *
 * NotesPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import NoteItem from 'components/NoteItem/Loadable';
import NoteEditor from 'components/NoteEditor/Loadable';
import styled from 'styled-components';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNotesPage, {makeSelectPinnedNotes, makeSelectArchivedNotes, makeSelectNotes} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { DEFAULT_ACTION } from './constants';
import { addNote, pinItem, archiveItem, deleteItem, updateNote } from './actions';
import { uuid } from 'uuidv4';
import Modal from '../../components/Modal';

const Container = styled.div`
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 1080px) {
    justify-content: center;
  }
`;

const StyledHeading = styled.h4`
  margin: 30px;
`;

export function NotesPage(props) {
  useInjectReducer({ key: 'notesPage', reducer });
  useInjectSaga({ key: 'notesPage', saga });
  const [ notesData, setData ] = useState([]);
  const [ isModalOpen, setModalOpen ] = useState(false);
  const [ openNoteData, setOpenNoteData ] = useState(null);
  const [ pinnedData, setPinnedData ] = useState([]);
  const [ pageType, setPageType ] = useState('notes');
  const { notes, archivedNotes, pinnedNotes, notesPage } = props;

  const urlparams = new URLSearchParams(props.history.location.search);
  useEffect(() => {
    let data = notes;
    let pinnedData = pinnedNotes;
    if (urlparams.get('type') === 'archives') {
      data = archivedNotes;
      setPageType('archivedNotes');
      pinnedData = [];
    }
    if (urlparams.get('type') === 'pinned') {
      data = pinnedNotes;
      setPageType('pinnedNotes');
      pinnedData = [];
    }
    if (urlparams.get('search')) {
      const searchText = urlparams.get('search');
      const alldata = [...notes, ...archivedNotes, ...pinnedNotes];
      data = alldata.filter((item) => {
        if (item.content.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || item.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      });
      if (urlparams.get('type') === 'archives' || urlparams.get('type') === 'pinned') {
        props.history.push({
          pathname: props.history.location.pathname,
          search: `?search=${searchText}`
        })
      }
      setPageType('all');
      pinnedData = [];
    }
    setData(data);
    setPinnedData(pinnedData);
  }, []);

  useEffect(() => {
    let data = notes;
    let pinnedData = pinnedNotes;
    if (urlparams.get('type') === 'archives') {
      data = archivedNotes;
      setPageType('archivedNotes');
      pinnedData = [];
    }
    if (urlparams.get('type') === 'pinned') {
      data = pinnedNotes;
      setPageType('pinnedNotes');
      pinnedData = [];
    }
    if (urlparams.get('search')) {
      const searchText = urlparams.get('search');
      const alldata = [...notes, ...archivedNotes, ...pinnedNotes];
      data = alldata.filter((item) => {
        if (item.content.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || item.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      });
      if (urlparams.get('type') === 'archives' || urlparams.get('type') === 'pinned') {
        props.history.push({
          pathname: props.history.location.pathname,
          search: `?search=${searchText}`
        })
      }
      setPageType('all');
      pinnedData = [];
    }
    setPinnedData(pinnedData);
    setData(data);
  }, [notesPage, notes, archivedNotes, pinnedNotes, props.history.location])

  const onSave = (title, content, isArchived, isPinned) => {
    if (openNoteData && openNoteData.id) {
      props.updateContent(title, content, openNoteData.id, isArchived, isPinned);
      onModalClose();
    }
    else {
      props.addContent(title, content, uuid(), isArchived, isPinned);
    }
  }

  const archiveItem = (id) => {
    props.archiveItem(id, pageType);
  }

  const pinItem = (id) => {
    props.pinItem(id, pageType);
  }

  const deleteItem = (id) => {
    props.deleteItem(id, pageType);
  }

  const openModal = (note) => {
    setOpenNoteData(note);
    setModalOpen(true);
  }

  const onModalClose = () => {
    setOpenNoteData(null);
    setModalOpen(false);
  }

  return (
    <div>
      <Helmet>
        <title>NotesPage</title>
        <meta name="description" content="Description of NotesPage" />
      </Helmet>
      {isModalOpen ? <Modal onClose={onModalClose}>
        <NoteEditor closeEditor={onModalClose} data={openNoteData} onSave={onSave}/>
      </Modal> : null}
      <NoteEditor onSave={onSave}/>
      {pinnedData.length ? <StyledHeading>Pinned</StyledHeading> :null}

      <Container>
      {pinnedData.length ?
          pinnedData.map((note,idx) => {
            return <NoteItem openModal={openModal} deleteItem={deleteItem} archiveItem={archiveItem} pinItem={pinItem} key={idx} note={note}/>
          })
        : null}
      </Container>
      {pinnedData.length && notesData.length ? <StyledHeading>Others</StyledHeading> :null}
      <Container>
        {notesData.map((note,idx) => {
          return <NoteItem openModal={openModal} deleteItem={deleteItem} archiveItem={archiveItem} pinItem={pinItem} key={idx} note={note}/>
        })}
      </Container>
    </div>
  );
}

NotesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notesPage: makeSelectNotesPage(),
  pinnedNotes: makeSelectPinnedNotes(),
  archivedNotes: makeSelectArchivedNotes(),
  notes: makeSelectNotes()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addContent(title, content, id, isArchived, isPinned){
      dispatch(addNote({title, content, id, isArchived, isPinned}))
    },
    updateContent(title, content, id, isArchived, isPinned) {
      dispatch(updateNote({title, content, id, isArchived, isPinned}))
    },
    deleteItem(id, type){
      dispatch(deleteItem({type, id}))
    },
    archiveItem(id, type){
      dispatch(archiveItem({type, id}))
    },
    pinItem(id, type){
      dispatch(pinItem({type, id}))
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NotesPage);
