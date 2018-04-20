import * as Auth from './auth';
import * as Projects from './projects';
import * as Modal from './modal';

export const ActionCreators = {
  ...Auth,
  ...Projects,
  ...Modal
};
