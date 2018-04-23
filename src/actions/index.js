import * as Auth from './auth';
import * as Projects from './projects';
import * as Modal from './modal';
import * as Sidebar from './sidebar';

export const ActionCreators = {
  ...Auth,
  ...Projects,
  ...Modal,
  ...Sidebar
};
