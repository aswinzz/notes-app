/**
 *
 * Asynchronously loads the component for Modal
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
