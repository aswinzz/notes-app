/*
 *
 * NotesPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, ADD_NOTE, UPDATE_NOTE, ARCHIVE_ITEM, PIN_ITEM, DELETE_ITEM } from './constants';

export const initialState = {
  notes: localStorage.getItem('notes_data') && JSON.parse(localStorage.getItem('notes_data')) ? JSON.parse(localStorage.getItem('notes_data')).notes : [],
  archivedNotes: localStorage.getItem('notes_data') && JSON.parse(localStorage.getItem('notes_data')) ? JSON.parse(localStorage.getItem('notes_data')).archivedNotes : [],
  pinnedNotes: localStorage.getItem('notes_data') && JSON.parse(localStorage.getItem('notes_data')) ? JSON.parse(localStorage.getItem('notes_data')).pinnedNotes : [],
};

/* eslint-disable default-case, no-param-reassign */
const notesPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case ADD_NOTE: {
        console.log('action', action);
        const { title, content, id, isArchived, isPinned } = action.payload;
        if (isArchived) {
          draft.archivedNotes  = [...state.archivedNotes, {title, content, id, isArchived, isPinned}];
        }
        else if (isPinned) {
          draft.pinnedNotes  = [...state.pinnedNotes, {title, content, id, isArchived, isPinned}];
        }
        else {
          draft.notes = [...state.notes, {title, content, id}];
        }
        break;
      }
      case UPDATE_NOTE: {
        console.log('action', action);
        const { title, content, id, isArchived, isPinned } = action.payload;
        let index = -1;
        let found = false;
        draft.notes.map((item, idx) => {
          if (item.id === id) {
            index = idx;
            found = true;
          }
        });
        if (index !== -1) {
          const item = draft.notes[index];
          draft.notes.splice(index, 1);
          if (isArchived) {
            draft.archivedNotes.push({...item, content, title, isArchived: true, isPinned: false});
          }
          else if (isPinned) {
            draft.pinnedNotes.push({...item, content, title, isArchived: false, isPinned: true});
          }
          else {
            draft.notes.push({...item, content, title, isArchived: false, isPinned: false});
          }
        }
        if (!found) {
          draft.pinnedNotes.map((item, idx) => {
            if (item.id === id) {
              index = idx;
              found = true;
            }
          });
          if (index !== -1) {
            const item = draft.pinnedNotes[index];
            draft.pinnedNotes.splice(index, 1);
            if (isArchived) {
              draft.archivedNotes.push({...item, content, title, isArchived: true, isPinned: false});
            }
            else if (isPinned) {
              draft.pinnedNotes.push({...item, content, title, isArchived: false, isPinned: true});
            }
            else {
              draft.notes.push({...item, content, title, isArchived: false, isPinned: false});
            }
          }
        }
        if (!found) {
          draft.archivedNotes.map((item, idx) => {
            if (item.id === id) {
              index = idx;
              found = true;
            }
          });
          if (index !== -1) {
            const item = draft.archivedNotes[index];
            draft.archivedNotes.splice(index, 1);
            if (isArchived) {
              draft.archivedNotes.push({...item, content, title, isArchived: true, isPinned: false});
            }
            else if (isPinned) {
              draft.pinnedNotes.push({...item, content, title, isArchived: false, isPinned: true});
            }
            else {
              draft.notes.push({...item, content, title, isArchived: false, isPinned: false});
            }
          }
        }
        break;
      }
      case DELETE_ITEM: {
        console.log('action', action);
        const { type, id } = action.payload;
        let found = false;
        if (type === 'notes' || type === 'all') {
          let index = -1;
          draft.notes.map((item, idx) => {
            if (item.id === id) {
              index = idx;
              found = true;
            }
          });
          if (index !== -1) {
            draft.notes.splice(index, 1);
          }
        }
        if (!found || (type === 'archivedNotes' || type === 'all')) {
          let index = -1;
          draft.archivedNotes.map((item, idx) => {
            if (item.id === id) {
              index = idx;
              found = true;
            }
          });
          if (index !== -1) {
            draft.archivedNotes.splice(index, 1);
          }
        }
        if (!found || (type === 'pinnedNotes' || type === 'all')) {
          let index = -1;
          draft.pinnedNotes.map((item, idx) => {
            if (item.id === id) {
              index = idx;
            }
          });
          if (index !== -1) {
            draft.pinnedNotes.splice(index, 1);
          }
        }
        break;
      }
      case PIN_ITEM: {
        console.log('action', action);
        const { type, id } = action.payload;
        let index = -1;
        draft.pinnedNotes.map((item, idx) => {
          if (item.id === id) {
            index = idx;
          }
        });
        if (index !== -1) {
          const item = draft.pinnedNotes[index];
          draft.pinnedNotes.splice(index, 1);
          draft.notes.push({...item, isPinned: false, isArchived: false});
        }
        else {
          if (type === 'notes' || type === 'all') {
            let index = -1;
            draft.notes.map((item, idx) => {
              if (item.id === id) {
                index = idx;
              }
            });
            if (index !== -1) {
              const item = draft.notes[index];
              draft.notes.splice(index, 1);
              draft.pinnedNotes.push({...item, isPinned: true, isArchived: false});
            }
          }
          if (type === 'archivedNotes' || type === 'all') {
            let index = -1;
            draft.archivedNotes.map((item, idx) => {
              if (item.id === id) {
                index = idx;
              }
            });
            if (index !== -1) {
              const item = draft.archivedNotes[index];
              draft.archivedNotes.splice(index, 1);
              draft.pinnedNotes.push({...item, isPinned: true, isArchived: false});
            }
          }
        }
        break;
      }
      case ARCHIVE_ITEM: {
        const { type, id } = action.payload;
        if (type === 'notes' || type === 'all') {
          let index = -1;
          draft.notes.map((item, idx) => {
            if (item.id === id) {
              index = idx;
            }
          });
          if (index !== -1) {
            const item = draft.notes[index];
            draft.notes.splice(index, 1);
            draft.archivedNotes.push({...item, isPinned: false, isArchived: true});
          }
        }
        if (type === 'archivedNotes' || type === 'all') {
          let index = -1;
          draft.archivedNotes.map((item, idx) => {
            if (item.id === id) {
              index = idx;
            }
          });
          if (index !== -1) {
            const item = draft.archivedNotes[index];
            draft.archivedNotes.splice(index, 1);
            draft.notes.push({...item, isPinned: false, isArchived: false});
          }
        }
        if (type === 'pinnedNotes' || type === 'all') {
          let index = -1;
          draft.pinnedNotes.map((item, idx) => {
            if (item.id === id) {
              index = idx;
            }
          });
          if (index !== -1) {
            const item = draft.pinnedNotes[index];
            draft.pinnedNotes.splice(index, 1);
            draft.archivedNotes.push({...item, isPinned: false, isArchived: true});
          }
        }
        break;
      }
    }
  });

export default notesPageReducer;
