const CACHE_NAME = 'keypad-emulator-v3';
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/192.png',
    '/icons/512.png',
    '/icons/favicon.ico',
    '/keypads/en.txt',
    '/keypads/letterwise.js',
    '/keypads/multitap.js',
    '/keypads/letterwise.html',
    '/keypads/multitap.html',
    '/keypads/style.css'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response =>
            response || fetch(event.request).catch(()=> caches.match("/index.html"))
        )
    );
});
