import * as Auth from './auth';
import * as Projects from './projects';
import * as Sidebar from './sidebar';
import * as Transition from './transition';

export const ActionCreators = {
  ...Auth,
  ...Projects,
  ...Sidebar,
  ...Transition
};
