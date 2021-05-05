/**
 *
 * Asynchronously loads the component for NoteEditor
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
