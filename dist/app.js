!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(2),o=document.getElementsByTagName("canvas")[0];o.height=400,o.width=800;var i=o.getContext("2d"),u=i.createImageData(800,400),l=document.getElementById("processline");function s(e){var t=new Worker("./task.worker.js");t.postMessage({method:"render",args:[e]}),t.onmessage=function(e){var n=e.data,r=n.method,a=n.args;d[r]?d[r].apply(d,[t].concat(a)):alert("app : can't find method ("+r+")")}}!function(e,t,n,o){for(var i=t*n,u=Math.ceil(i/o),l=new a.default([],t,n),c=0;c<n;c++)for(var d=0;d<t;d++)l.pixels.push(new r.default(d,c)),(l.pixels.length>=u||c*t+d===i-1)&&(s(l),l=new a.default([],t,n))}(0,800,400,4);var c=0,d={partComplete:function(e,t){t.pixels.forEach(function(e,n){var r=4*(e.x+e.y*t.width);u.data[r]=e.r,u.data[r+1]=e.g,u.data[r+2]=e.b,u.data[r+3]=e.a}),c+=t.pixels.length,l.style.width=c/32e4*100+"%",i.putImageData(u,0,0)},allComplete:function(e,t){t&&(t.pixels.forEach(function(e,n){var r=4*(e.x+e.y*t.width);u.data[r]=e.r,u.data[r+1]=e.g,u.data[r+2]=e.b,u.data[r+3]=e.a}),c+=t.pixels.length,l.style.width=c/32e4*100+"%",i.putImageData(u,0,0)),e.terminate()}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){return function(e,t){this.x=e,this.y=t,this.r=this.g=this.b=this.a=0}}();t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){return function(e,t,n){this.pixels=e,this.height=n,this.width=t}}();t.default=r}]);
//# sourceMappingURL=app.js.map