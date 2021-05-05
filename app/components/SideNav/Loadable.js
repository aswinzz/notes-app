/**
 *
 * Asynchronously loads the component for SideNav
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
