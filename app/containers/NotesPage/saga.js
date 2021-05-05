import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { ADD_NOTE, DELETE_ITEM, ARCHIVE_ITEM, PIN_ITEM, UPDATE_NOTE } from './constants';
export function* saveNote({payload}) {
  const { content, title, id, isArchived, isPinned } = payload;
  const data = localStorage.getItem('notes_data');
  const parseData = data ? JSON.parse(data) : { notes: [], archivedNotes: [], pinnedNotes: []};
  if (isArchived) {
    parseData.archivedNotes  = [...parseData.archivedNotes, {title, content, id, isArchived, isPinned}];
  }
  else if (isPinned) {
    parseData.pinnedNotes  = [...parseData.pinnedNotes, {title, content, id, isArchived, isPinned}];
  }
  else {
    parseData.notes = [...parseData.notes, {title, content, id}];
  }
  localStorage.setItem('notes_data', JSON.stringify(parseData));
}

export function* updateNote({payload}) {
  const { content, title, id, isArchived, isPinned } = payload;
  const data = localStorage.getItem('notes_data');
  const parseData = data ? JSON.parse(data) : { notes: [], archivedNotes: [], pinnedNotes: []};
  let index = -1;
  let found = false;
  parseData.notes.map((item, idx) => {
    if (item.id === id) {
      index = idx;
      found = true;
    }
  });
  if (index !== -1) {
    const item = parseData.notes[index];
    parseData.notes.splice(index, 1);
    if (isArchived) {
      parseData.archivedNotes.push({...item, content, title, isPinned: false, isArchived: true});
    }
    else if(isPinned) {
      parseData.pinnedNotes.push({...item, content, title, isPinned: true, isArchived: false});
    }
    else {
      parseData.notes.push({...item, content, title, isPinned: false, isArchived: false});
    }
  }
  if (!found) {
    parseData.pinnedNotes.map((item, idx) => {
      if (item.id === id) {
        index = idx;
        found = true;
      }
    });
    if (index !== -1) {
      const item = parseData.pinnedNotes[index];
      parseData.pinnedNotes.splice(index, 1);
      if (isArchived) {
        parseData.archivedNotes.push({...item, content, title, isPinned: false, isArchived: true});
      }
      else if(isPinned) {
        parseData.pinnedNotes.push({...item, content, title, isPinned: true, isArchived: false});
      }
      else {
        parseData.notes.push({...item, content, title, isPinned: false, isArchived: false});
      }
    }
  }
  if (!found) {
    parseData.archivedNotes.map((item, idx) => {
      if (item.id === id) {
        index = idx;
        found = true;
      }
    });
    if (index !== -1) {
      const item = parseData.archivedNotes[index];
      parseData.archivedNotes.splice(index, 1);
      if (isArchived) {
        parseData.archivedNotes.push({...item, content, title, isPinned: false, isArchived: true});
      }
      else if(isPinned) {
        parseData.pinnedNotes.push({...item, content, title, isPinned: true, isArchived: false});
      }
      else {
        parseData.notes.push({...item, content, title, isPinned: false, isArchived: false});
      }
    }
  }
  localStorage.setItem('notes_data', JSON.stringify(parseData));
}

export function* deleteNote({payload}) {
  const data = localStorage.getItem('notes_data');
  const parseData = data ? JSON.parse(data) : { notes: [], archivedNotes: [], pinnedNotes: []};

  const { type, id } = payload;
  let found = false;
  if (type === 'notes' || type === 'all') {
    let index = -1;
    parseData.notes.map((item, idx) => {
      if (item.id === id) {
        index = idx;
        found = true;
      }
    });
    if (index !== -1) {
      parseData.notes.splice(index, 1);
    }
  }
  if (!found || (type === 'archivedNotes' || type === 'all')) {
    let index = -1;
    parseData.archivedNotes.map((item, idx) => {
      if (item.id === id) {
        index = idx;
        found = true;
      }
    });
    if (index !== -1) {
      parseData.archivedNotes.splice(index, 1);
    }
  }
  if (!found || (type === 'pinnedNotes' || type === 'all')) {
    let index = -1;
    parseData.pinnedNotes.map((item, idx) => {
      if (item.id === id) {
        index = idx;
      }
    });
    if (index !== -1) {
      parseData.pinnedNotes.splice(index, 1);
    }
  }
  localStorage.setItem('notes_data', JSON.stringify(parseData));
}

export function* archiveNote({payload}) {
  const data = localStorage.getItem('notes_data');
  const parseData = data ? JSON.parse(data) : { notes: [], archivedNotes: [], pinnedNotes: []};

  const { type, id } = payload;
  if (type === 'notes' || type === 'all') {
    let index = -1;
    parseData.notes.map((item, idx) => {
      if (item.id === id) {
        index = idx;
      }
    });
    if (index !== -1) {
      const item = parseData.notes[index];
      parseData.notes.splice(index, 1);
      parseData.archivedNotes.push({...item, isArchived: true, isPinned: false});
    }
  }
  if (type === 'pinnedNotes' || type === 'all') {
    let index = -1;
    parseData.pinnedNotes.map((item, idx) => {
      if (item.id === id) {
        index = idx;
      }
    });
    if (index !== -1) {
      const item = parseData.pinnedNotes[index];
      parseData.pinnedNotes.splice(index, 1);
      parseData.archivedNotes.push({...item, isArchived: true, isPinned: false});
    }
  }
  if (type === 'archivedNotes' || type === 'all') {
    let index = -1;
    parseData.archivedNotes.map((item, idx) => {
      if (item.id === id) {
        index = idx;
      }
    });
    if (index !== -1) {
      const item = parseData.archivedNotes[index];
      parseData.archivedNotes.splice(index, 1);
      parseData.notes.push({...item, isPinned: false, isArchived: false});
    }
  }
  localStorage.setItem('notes_data', JSON.stringify(parseData));
}

export function* pinNote({payload}) {
  const data = localStorage.getItem('notes_data');
  const parseData = data ? JSON.parse(data) : { notes: [], archivedNotes: [], pinnedNotes: []};

  const { type, id } = payload;
  let index = -1;
  parseData.pinnedNotes.map((item, idx) => {
    if (item.id === id) {
      index = idx;
    }
  });
  if (index !== -1) {
    const item = parseData.pinnedNotes[index];
    parseData.pinnedNotes.splice(index, 1);
    parseData.notes.push({...item, isPinned: false, isArchived: false});
  }
  else {
    if (type === 'notes' || type === 'all') {
      let index = -1;
      parseData.notes.map((item, idx) => {
        if (item.id === id) {
          index = idx;
        }
      });
      if (index !== -1) {
        const item = parseData.notes[index];
        parseData.notes.splice(index, 1);
        parseData.pinnedNotes.push({...item, isArchived: false, isPinned: true});
      }
    }
    if (type === 'archivedNotes' || type === 'all') {
      let index = -1;
      parseData.archivedNotes.map((item, idx) => {
        if (item.id === id) {
          index = idx;
        }
      });
      if (index !== -1) {
        const item = parseData.archivedNotes[index];
        parseData.archivedNotes.splice(index, 1);
        parseData.pinnedNotes.push({...item, isArchived: false, isPinned: true});
      }
    }
  }
  localStorage.setItem('notes_data', JSON.stringify(parseData));
}

// Individual exports for testing
export default function* notesPageSaga() {
  yield takeLatest(ADD_NOTE, saveNote);
  yield takeLatest(UPDATE_NOTE, updateNote);
  yield takeLatest(DELETE_ITEM, deleteNote);
  yield takeLatest(ARCHIVE_ITEM, archiveNote);
  yield takeLatest(PIN_ITEM, pinNote);
}
