/**
 *
 * Asynchronously loads the component for Tooltip
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
