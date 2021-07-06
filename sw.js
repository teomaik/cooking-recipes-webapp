self.addEventListener('install', function(event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open('cooking-recipes-webapp').then(function(cache) {
            return cache.addAll([
                './add_recipe.css',
                './add_recipe.html',
                './advanced_search.css',
                './advanced_search.html',
                './available_recipes.css',
                './available_recipes.html',
                './common.js',
                './favico.png',
                './index.css',
                './index.html',
                './manifest.webmanifest',
                './recipe.css',
                './recipe.html',

                './assets/logo.png',
                './assets/bernard-hermant-XFCei-F4mjg-unsplash.jpg',
                './assets/brooke-lark-kXQ3J7_2fpc-unsplash.jpg',
                './assets/food.jpg',
                './assets/search.png',
                './assets/96.png',
                './assets/192.png',
                './assets/512.png',

                './src/add_recipe.js',
                './src/advanced_search.js',
                './src/available_recipes.js',
                './src/index.js',
                './src/recipe.js',
                './src/firebase-database.js',
                './src/firebase-app.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || caches.match('/cooking-recipes-webapp/index.html');
        })
    );
});