import * as fb from 'firebase';
import env from 'env';

const firebase = fb.initializeApp(env.firebase);

export { firebase as default };
