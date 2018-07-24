import * as Admin from './admin';
import * as Auth from './auth';
import * as Projects from './projects';
import * as Transition from './transition';

export const ActionCreators = {
  ...Admin,
  ...Auth,
  ...Projects,
  ...Transition
};
