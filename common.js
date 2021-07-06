'use strict';

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/cooking-recipes-webapp/sw.js').catch(function(error) {
            // registration failed
            console.log('Registration failed with ' + error);
        })
        .catch(function(error) {
            console.log('Service worker registration failed, error:', error);
        });
}