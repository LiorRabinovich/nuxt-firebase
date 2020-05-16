const ignorePaths = ["\u002F__webpack_hmr","\u002F_loading","\u002F_nuxt\u002F"]

importScripts(
  'https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/7.14.3/firebase-auth.js'
)
firebase.initializeApp({"apiKey":"AIzaSyAQjUIrfxJh0sESizjpcJ4kZ1cGI31ZQko","authDomain":"nuxt-firebase-226d5.firebaseapp.com","databaseURL":"https:\u002F\u002Fnuxt-firebase-226d5.firebaseio.com","projectId":"nuxt-firebase-226d5","storageBucket":"nuxt-firebase-226d5.appspot.com","messagingSenderId":"723156868689","appId":"1:723156868689:web:8ca3db111cb369e5bf6270","measurementId":"G-V13P5DWGFL"})

/**
 * Returns a promise that resolves with an ID token if available.
 * @return {!Promise<?string>} The promise that resolves with an ID token if
 *     available. Otherwise, the promise resolves with null.
 */
const getIdToken = () => {
  return new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        // force token refresh as it might be used to sign in server side
        user.getIdToken(true).then((idToken) => {
          resolve(idToken);
        }, () => {
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  });
};

const fetchWithAuthorization = async (original, idToken) => {
  // Clone headers as request headers are immutable.
  const headers = new Headers();
  for (let entry of original.headers.entries()) {
    headers.append(entry[0], entry[1]);
  }

  // Add ID token to header.
  headers.append('Authorization', 'Bearer ' + idToken);

  // Create authorized request
  const { url, ...props } = original.clone();
  const authorized = new Request(url, {
    ...props,
    mode: 'same-origin',
    redirect: 'manual',
    headers
  });

  return fetch(authorized)
};

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  const expectsHTML = event.request.headers.get('accept').includes('text/html')
  const isSameOrigin = self.location.origin === url.origin;
  const isHttps = (self.location.protocol === 'https:' || self.location.hostname === 'localhost');
  const isIgnored = ignorePaths.some(path => {
    if (typeof path === 'string') {
      return url.pathname.startsWith(path)
    }

    return path.test(url.pathname.slice(1))
  });

  if (!expectsHTML || !isSameOrigin || !isHttps || isIgnored) {
    event.respondWith(fetch(event.request));

    return;
  }

  // Fetch the resource after checking for the ID token.
  // This can also be integrated with existing logic to serve cached files
  // in offline mode.
  event.respondWith(
    getIdToken().then(
      idToken => idToken
        // if the token was retrieved we attempt an authorized fetch
        // if anything goes wrong we fall back to the original request
        ? fetchWithAuthorization(event.request, idToken).catch(() => fetch(event.request))
        // otherwise we return a fetch of the original request directly
        : fetch(event.request)
    )
  )
});

// In service worker script.
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
