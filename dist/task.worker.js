!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=3)}([,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4),o={render:function(e){var t=e.pixels,n=e.width,o=e.height;e.position;t.forEach(function(e,t){r.default(e,n,o)}),postMessage({method:"allComplete",args:[e]})}};onmessage=function(e){var t=e.data,n=t.method,r=t.args,u=void 0===r?[]:r;o[n]?o[n].apply(o,u):console.log("taskWorker: can't find method ("+n+")")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){e.r=e.g=e.b=e.a=255}}]);
//# sourceMappingURL=task.worker.js.map