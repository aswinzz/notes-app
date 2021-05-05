/*
 *
 * NotesPage actions
 *
 */

import { DEFAULT_ACTION, UPDATE_NOTE, ADD_NOTE, PIN_ITEM, ARCHIVE_ITEM, DELETE_ITEM } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addNote(payload) {
  return {
    type: ADD_NOTE,
    payload
  };
}


export function updateNote(payload) {
  return {
    type: UPDATE_NOTE,
    payload
  };
}


export function deleteItem(payload) {
  return {
    type: DELETE_ITEM,
    payload
  };
}

export function archiveItem(payload) {
  return {
    type: ARCHIVE_ITEM,
    payload
  };
}

export function pinItem(payload) {
  return {
    type: PIN_ITEM,
    payload
  };
}
