"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7207],{3905:function(e,t,i){i.d(t,{Zo:function(){return s},kt:function(){return d}});var r=i(7294);function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function a(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function l(e,t){if(null==e)return{};var i,r,n=function(e,t){if(null==e)return{};var i,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)i=o[r],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)i=o[r],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}var p=r.createContext({}),c=function(e){var t=r.useContext(p),i=t;return e&&(i="function"==typeof e?e(t):a(a({},t),e)),i},s=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var i=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=c(i),d=n,b=u["".concat(p,".").concat(d)]||u[d]||f[d]||o;return i?r.createElement(b,a(a({ref:t},s),{},{components:i})):r.createElement(b,a({ref:t},s))}));function d(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=i.length,a=new Array(o);a[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:n,a[1]=l;for(var c=2;c<o;c++)a[c]=i[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,i)}u.displayName="MDXCreateElement"},2798:function(e,t,i){i.r(t),i.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return s},default:function(){return u}});var r=i(7462),n=i(3366),o=(i(7294),i(3905)),a=["components"],l={id:"ApplicationProfileRaw",title:"Interface: ApplicationProfileRaw",sidebar_label:"ApplicationProfileRaw",sidebar_position:0,custom_edit_url:null},p=void 0,c={unversionedId:"libraries/application-profile/api/interfaces/ApplicationProfileRaw",id:"libraries/application-profile/api/interfaces/ApplicationProfileRaw",isDocsHomePage:!1,title:"Interface: ApplicationProfileRaw",description:"Application Profile as they are stored in src to be consumed by BE code. This",source:"@site/docs/libraries/application-profile/api/interfaces/ApplicationProfileRaw.md",sourceDirName:"libraries/application-profile/api/interfaces",slug:"/libraries/application-profile/api/interfaces/ApplicationProfileRaw",permalink:"/ng-cognizone/docs/libraries/application-profile/api/interfaces/ApplicationProfileRaw",editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"ApplicationProfileRaw",title:"Interface: ApplicationProfileRaw",sidebar_label:"ApplicationProfileRaw",sidebar_position:0,custom_edit_url:null},sidebar:"librariesSidebar",previous:{title:"ApplicationProfile",permalink:"/ng-cognizone/docs/libraries/application-profile/api/interfaces/ApplicationProfile"},next:{title:"AttributeProfile",permalink:"/ng-cognizone/docs/libraries/application-profile/api/interfaces/AttributeProfile"}},s=[{value:"Indexable",id:"indexable",children:[]},{value:"Properties",id:"properties",children:[{value:"uri",id:"uri",children:[]}]}],f={toc:s};function u(e){var t=e.components,i=(0,n.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},f,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Application Profile as they are stored in src to be consumed by BE code. This\nformat is never seen by FE code, so better to look at ",(0,o.kt)("a",{parentName:"p",href:"ApplicationProfile"},"ApplicationProfile"),"\ninstead."),(0,o.kt)("h2",{id:"indexable"},"Indexable"),(0,o.kt)("p",null,"\u25aa ","[classId: ",(0,o.kt)("inlineCode",{parentName:"p"},"string"),"]",": ",(0,o.kt)("a",{parentName:"p",href:"TypeProfileRaw"},(0,o.kt)("inlineCode",{parentName:"a"},"TypeProfileRaw"))," ","|"," ",(0,o.kt)("inlineCode",{parentName:"p"},"string")),(0,o.kt)("p",null,"For each class existing in the defined ontology, there is an associated\n",(0,o.kt)("a",{parentName:"p",href:"TypeProfileRaw"},"TypeProfileRaw")," that describes that class and its constraints."),(0,o.kt)("p",null,"It is to be noted that ",(0,o.kt)("inlineCode",{parentName:"p"},"| string")," is here only so that ",(0,o.kt)("inlineCode",{parentName:"p"},"uri: string")," can be put\non this interface."),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("h3",{id:"uri"},"uri"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"uri"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"string")),(0,o.kt)("p",null,"uri of that particular AP"),(0,o.kt)("h4",{id:"defined-in"},"Defined in"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/c5b3f22/libs/application-profile/src/lib/models/application-profile-raw.ts#L12"},"lib/models/application-profile-raw.ts:12")))}u.isMDXComponent=!0}}]);