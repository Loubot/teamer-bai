(function(t){function e(e){for(var r,a,c=e[0],l=e[1],u=e[2],s=0,d=[];s<c.length;s++)a=c[s],i[a]&&d.push(i[a][0]),i[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);p&&p(e);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,a=1;a<n.length;a++){var l=n[a];0!==i[l]&&(r=!1)}r&&(o.splice(e--,1),t=c(c.s=n[0]))}return t}var r={},i={app:0},o=[];function a(t){return c.p+"js/"+({about:"about"}[t]||t)+"."+{about:"c1d822e1"}[t]+".js"}function c(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n=i[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise(function(e,r){n=i[t]=[e,r]});e.push(n[2]=r);var o,l=document.getElementsByTagName("head")[0],u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=a(t),o=function(e){u.onerror=u.onload=null,clearTimeout(s);var n=i[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src,a=new Error("Loading chunk "+t+" failed.\n("+r+": "+o+")");a.type=r,a.request=o,n[1](a)}i[t]=void 0}};var s=setTimeout(function(){o({type:"timeout",target:u})},12e4);u.onerror=u.onload=o,l.appendChild(u)}return Promise.all(e)},c.m=t,c.c=r,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var s=0;s<l.length;s++)e(l[s]);var p=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"3b4c":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c");var r=n("2b0e"),i=n("d437"),o=n.n(i),a=n("d421"),c=n.n(a),l=n("535c"),u=n.n(l),s=n("d0ba"),p=n.n(s),d=n("e1f0"),f=n.n(d),v=n("5d92"),m=n.n(v),b=n("6a6f"),h=n.n(b),g=n("d553"),w=n.n(g),y=n("12d0"),_=n.n(y),x=n("2330"),P=n.n(x);n("da64");r["default"].use(o.a,{components:{VApp:c.a,VNavigationDrawer:u.a,VFooter:p.a,VList:f.a,VBtn:m.a,VIcon:h.a,VGrid:w.a,VToolbar:_.a,transitions:P.a}});var V=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-navigation-drawer",{attrs:{persistent:"","mini-variant":t.miniVariant,clipped:t.clipped,"enable-resize-watcher":"",fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",t._l(t.items,function(e,r){return n("v-list-tile",{key:r,attrs:{value:"true"}},[n("v-list-tile-action",[n("v-icon",{domProps:{innerHTML:t._s(e.icon)}})],1),n("v-list-tile-content",[n("v-list-tile-title",{domProps:{textContent:t._s(e.title)}})],1)],1)}))],1),n("v-toolbar",{attrs:{app:"","clipped-left":t.clipped}},[n("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.miniVariant=!t.miniVariant}}},[n("v-icon",{domProps:{innerHTML:t._s(t.miniVariant?"chevron_right":"chevron_left")}})],1),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.clipped=!t.clipped}}},[n("v-icon",[t._v("web")])],1),n("v-toolbar-title",{domProps:{textContent:t._s(t.title)}}),n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.rightDrawer=!t.rightDrawer}}},[n("v-icon",[t._v("menu")])],1)],1),n("v-content",[n("router-view")],1),n("v-navigation-drawer",{attrs:{temporary:"",right:t.right,fixed:"",app:""},model:{value:t.rightDrawer,callback:function(e){t.rightDrawer=e},expression:"rightDrawer"}},[n("v-list",[n("v-list-tile",{on:{click:function(e){t.right=!t.right}}},[n("v-list-tile-action",[n("v-icon",[t._v("compare_arrows")])],1),n("v-list-tile-title",[t._v("Switch drawer (click me)")])],1)],1)],1),n("v-footer",{attrs:{fixed:t.fixed,app:""}},[n("span",[t._v("© 2017")])])],1)},j=[],k={name:"App",data:function(){return{clipped:!1,drawer:!0,fixed:!1,items:[{icon:"bubble_chart",title:"Inspire"},{icon:"drag_handle",title:"Bla BlaBla"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Vuetify.js"}}},O=k,T=n("2877"),D=Object(T["a"])(O,V,j,!1,null,null,null),M=D.exports,S=n("8c4f"),B=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[n("v-slide-y-transition",{attrs:{mode:"out-in"}},[n("v-layout",{attrs:{column:"","align-center":""}})],1)],1)},E=[],L=(n("7b00"),{}),A=Object(T["a"])(L,B,E,!1,null,"364c2f6a",null),C=A.exports;r["default"].use(S["a"]);var $=new S["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:C},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}]});r["default"].config.productionTip=!1,new r["default"]({router:$,render:function(t){return t(M)}}).$mount("#app")},"7b00":function(t,e,n){"use strict";var r=n("3b4c"),i=n.n(r);i.a}});
//# sourceMappingURL=app.8e1ab73b.js.map