import * as Auth from './auth';
import * as Projects from './projects';
import * as Navbar from './navbar';
import * as Transition from './transition';

export const ActionCreators = {
  ...Auth,
  ...Projects,
  ...Navbar,
  ...Transition
};
