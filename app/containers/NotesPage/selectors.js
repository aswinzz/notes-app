import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notesPage state domain
 */

const selectNotesPageDomain = state => state.notesPage || initialState;
const selectNotes = state => state.notesPage ? state.notesPage.notes : initialState.notes;
const selectPinnedNotes = state => state.notesPage ? state.notesPage.pinnedNotes : initialState.pinnedNotes;
const selectArchivedNotes = state => state.notesPage ? state.notesPage.archivedNotes : initialState.archivedNotes;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NotesPage
 */

const makeSelectNotesPage = () =>
  createSelector(
    selectNotesPageDomain,
    substate => substate,
  );

const makeSelectNotes = () =>
  createSelector(
    selectNotes,
    substate => substate,
  );

const makeSelectArchivedNotes = () =>
  createSelector(
    selectArchivedNotes,
    substate => substate,
  );

const makeSelectPinnedNotes = () =>
  createSelector(
    selectPinnedNotes,
    substate => substate,
  );

export default makeSelectNotesPage;
export { selectNotesPageDomain, makeSelectNotes, makeSelectArchivedNotes,  makeSelectPinnedNotes };
