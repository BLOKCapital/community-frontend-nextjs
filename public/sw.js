if(!self.define){let e,a={};const n=(n,s)=>(n=new URL(n+".js",s).href,a[n]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=a,document.head.appendChild(e)}else e=n,importScripts(n),a()})).then((()=>{let e=a[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(a[i])return;let t={};const f=e=>n(e,i),u={module:{uri:i},exports:t,require:f};a[i]=Promise.all(s.map((e=>u[e]||f(e)))).then((e=>(c(...e),t)))}}define(["./workbox-fb87826f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"023888d525812cadd4c3e90eeb73a527"},{url:"/_next/static/chunks/081ca426-4ea7140dd8be0df4.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/0a508f9e-c5ff071402f67de9.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/0e762574-4c5f88580060295e.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/1272-3ed250252be2c4f1.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/1943-c94c3ed5bc948fcc.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/30a37ab2-723bf6e485e8603c.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/3790-7fb55d3272c3bb2a.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/3d47b92a-9dee3d6867c42a4a.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/4006.41331889aac536e8.js",revision:"41331889aac536e8"},{url:"/_next/static/chunks/479ba886-32b6655ea5681432.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/53c13509-771c9c042dda408c.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/5615.d06399de91513268.js",revision:"d06399de91513268"},{url:"/_next/static/chunks/59650de3-56a10af89be94fe3.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/5e22fd23-a3d5b6602f32c190.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/6091.f86f1c72be568e26.js",revision:"f86f1c72be568e26"},{url:"/_next/static/chunks/619edb50-6f8d6bfc12c1df50.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/6295.22bcdc8c3975611e.js",revision:"22bcdc8c3975611e"},{url:"/_next/static/chunks/66ec4792-04164554c500c5c1.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/703-0fbc3058d044f8ca.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/7876-53b7c3a6c35fdfbc.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/795d4814-f9b622849d9ee193.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/8012d7e2.51743eac354c97fb.js",revision:"51743eac354c97fb"},{url:"/_next/static/chunks/8069-88eb4a09a10c5bad.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/8792-1592c38e1c1c07f5.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/94730671-a09f7726ba3c868d.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/963-eb0f7842c08b78be.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/9c4e2130-eb17a117d0f493b0.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/a12756ec-eecd07c63cd0efa6.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/aaea2bcf-960b23fda40ce6d2.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/app/(pages)/%5Bslug%5D/page-bde25225b552fc6f.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/app/(pages)/my-posts/%5Bslug%5D/page-dcb25648d052183e.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/app/(pages)/my-posts/page-c9f9723a9bf8dd1b.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/app/(pages)/search/page-231d61bf5fb75aa1.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/app/(pages)/serviceworker/redirect/page-19d1e12e0e503a55.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/app/_not-found-e72728942fb5e098.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/app/page-54bf2367051d8184.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/b563f954-59a262fa1258b2b1.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/c916193b-5fb116b230f60a66.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/e34aaff9-da68fb0ccbb7aabb.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/ee560e2c-c4338e9238470f26.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/ef05af88-bfa0ab31f45189ca.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/f8025e75-4592db4c206f814c.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/f97e080b-d99deb105120f927.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/fca4dd8b-8d53ca2c678327dd.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/fd9d1056-5f7cce80390d563d.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/framework-08aa667e5202eed8.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/main-app-e9ecff5efe0a112a.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/main-e38b9b3784ffa8ae.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/pages/_app-57bdff7978360b1c.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/pages/_error-29037c284dd0eec6.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-db05e77f9b5d8245.js",revision:"x8W22nuF3JaaJ8aNEnpfc"},{url:"/_next/static/css/06eadc2d84d033ea.css",revision:"06eadc2d84d033ea"},{url:"/_next/static/css/4273f1ab6dcb131a.css",revision:"4273f1ab6dcb131a"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/MianBlokclogo.641645ab.png",revision:"ef5a31bc644b284edd81a89a71d42926"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/delete.f04e1f54.png",revision:"035976a67cac9f4f0507c9bc2b2b9273"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/media/logocoin.dab1aa50.png",revision:"493dad4e4082d3c1c826b802d83481a8"},{url:"/_next/static/x8W22nuF3JaaJ8aNEnpfc/_buildManifest.js",revision:"2b54d7db375d2b4c0e6af318090bebea"},{url:"/_next/static/x8W22nuF3JaaJ8aNEnpfc/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icon-192x192.png",revision:"facea64a5f16e2f0bbf25207a6f5d700"},{url:"/icon-256x256.png",revision:"1affbf5a5d197e1d1ebcea07007ff135"},{url:"/icon-384x384.png",revision:"6c30879b6a4102693337ea7cea12c194"},{url:"/icon-512x512.png",revision:"4ae489fde7524e495a6fed095cad7acd"},{url:"/manifest.webmanifest",revision:"bb8df835b3aa7c772e10b8e56c1a79b6"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:n,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));