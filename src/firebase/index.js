import * as fb from 'firebase';
import env from 'env';

const firebase = fb.initializeApp(env.firebase);
const db = firebase.database();

export { firebase as default, db };
