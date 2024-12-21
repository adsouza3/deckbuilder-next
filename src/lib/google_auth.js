import { loadGapiInsideDOM } from 'gapi-script';

let auth;
export const initialize = async (clientId) => {
  await loadGapiInsideDOM();

  await new Promise((resolve, reject) => {
    window.gapi.load('client:auth2', {
      callback: () => {
        window.gapi.client.init({
          clientId,
          scope: 'email'
        }).then(() => {
          auth = window.gapi.auth2.getAuthInstance();
          resolve();
        }).catch(reject);
      },
      onerror: reject
    });
  });
};

export const isSignedIn = () => auth && auth.isSignedIn.get();
export const signIn = async () => auth && await auth.signIn();
export const signOut = async () => auth && await auth.signOut();
export const getId = () => {
  return isSignedIn() && auth.currentUser.get().getId();
};
export const listen = callback => auth &&  auth.isSignedIn.listen(callback);

// Stub version
// export const initialize = async () => null;

// let signedIn = true;
// export const isSignedIn = () => signedIn;
// export const signIn = () => signedIn = true;
// export const signOut = () => signedIn = false;
// export const getId = () => 'dummy';
