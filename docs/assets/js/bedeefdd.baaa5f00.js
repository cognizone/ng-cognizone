"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4923],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return b}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),b=o,f=d["".concat(s,".").concat(b)]||d[b]||p[b]||i;return n?r.createElement(f,a(a({ref:t},u),{},{components:n})):r.createElement(f,a({ref:t},u))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6501:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return u},default:function(){return d}});var r=n(3117),o=n(102),i=(n(7294),n(3905)),a=["components"],l={id:"Installation",title:"Installation",sidebar_label:"Installation",sidebar_position:1,custom_edit_url:null},s=void 0,c={unversionedId:"libraries/elastic-explorer/user-guide/Installation",id:"libraries/elastic-explorer/user-guide/Installation",title:"Installation",description:"Here are the instructions to install this application as a chrome extension -",source:"@site/docs/libraries/elastic-explorer/user-guide/installation.md",sourceDirName:"libraries/elastic-explorer/user-guide",slug:"/libraries/elastic-explorer/user-guide/Installation",permalink:"/ng-cognizone/docs/libraries/elastic-explorer/user-guide/Installation",editUrl:null,tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"Installation",title:"Installation",sidebar_label:"Installation",sidebar_position:1,custom_edit_url:null},sidebar:"librariesSidebar",previous:{title:"About",permalink:"/ng-cognizone/docs/libraries/elastic-explorer/user-guide/About"},next:{title:"How to use",permalink:"/ng-cognizone/docs/libraries/elastic-explorer/user-guide/How-to-use"}},u=[{value:"Enabling protocol-handling",id:"enabling-protocol-handling",children:[],level:2}],p={toc:u};function d(e){var t=e.components,l=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Here are the instructions to install this application as a chrome extension -"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Unzip the latest released zip the can be found (for now) in the dedicated Slack channel."),(0,i.kt)("li",{parentName:"ul"},"Go to ",(0,i.kt)("inlineCode",{parentName:"li"},"chrome://extensions/")," on your browser (or equivalent in other chrome-based browsers)"),(0,i.kt)("li",{parentName:"ul"},"Enable the developer mode at the top right"),(0,i.kt)("li",{parentName:"ul"},'Click on "Load unpacked" button or directly drag&drop the unzipped folder on the page.'),(0,i.kt)("li",{parentName:"ul"},"There should be a new extension in your toolbar with the Cognizone logo. This can also be viewed in the extension list. "),(0,i.kt)("li",{parentName:"ul"},"Clicking on it should open a new tab with the Cognizone elastic explorer.")),(0,i.kt)("h2",{id:"enabling-protocol-handling"},"Enabling protocol-handling"),(0,i.kt)("p",null,'This needs to be done at least on first install, and usually on extension update, since the domain of the extension might change. In this case, there will be a need to reset the "protocol handling" of the extension to be able to click on web+czee links that are used for sharing. Here are the steps:'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The current entry of the ",(0,i.kt)("inlineCode",{parentName:"p"},"web+czee")," handler must be removed from ",(0,i.kt)("inlineCode",{parentName:"p"},"chrome://settings/handlers?search=protocol")," (this can be ignored for brand new installations)."),(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{target:"_blank",href:n(1498).Z},(0,i.kt)("img",{alt:"chromeRemoval",src:n(8363).Z})))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Open a new tab of the extension, and you will be prompted to let the extension handle ",(0,i.kt)("inlineCode",{parentName:"p"},"web+czee")," by clicking on the icon as shown below."),(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{target:"_blank",href:n(1477).Z},(0,i.kt)("img",{alt:"allow",src:n(7327).Z}))))))}d.isMDXComponent=!0},1477:function(e,t,n){t.Z=n.p+"assets/files/allow-572e5be6f8bd3d9d897ab39e62341b98.png"},1498:function(e,t,n){t.Z=n.p+"assets/files/webRemoval-bb10c8b452003d17efac53da65405569.png"},7327:function(e,t,n){t.Z=n.p+"assets/images/allow-572e5be6f8bd3d9d897ab39e62341b98.png"},8363:function(e,t,n){t.Z=n.p+"assets/images/webRemoval-bb10c8b452003d17efac53da65405569.png"}}]);