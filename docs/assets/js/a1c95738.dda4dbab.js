"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6257],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return f}});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),d=c(r),f=i,b=d["".concat(p,".").concat(f)]||d[f]||u[f]||a;return r?n.createElement(b,l(l({ref:t},s),{},{components:r})):n.createElement(b,l({ref:t},s))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,l=new Array(a);l[0]=d;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var c=2;c<a;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9625:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return s},default:function(){return d}});var n=r(3117),i=r(102),a=(r(7294),r(3905)),l=["components"],o={id:"Resource",title:"Interface: Resource<T>",sidebar_label:"Resource",sidebar_position:0,custom_edit_url:null},p=void 0,c={unversionedId:"libraries/ng-application-profile/api/interfaces/Resource",id:"libraries/ng-application-profile/api/interfaces/Resource",title:"Interface: Resource<T>",description:"Type parameters",source:"@site/docs/libraries/ng-application-profile/api/interfaces/Resource.md",sourceDirName:"libraries/ng-application-profile/api/interfaces",slug:"/libraries/ng-application-profile/api/interfaces/Resource",permalink:"/ng-cognizone/docs/libraries/ng-application-profile/api/interfaces/Resource",editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"Resource",title:"Interface: Resource<T>",sidebar_label:"Resource",sidebar_position:0,custom_edit_url:null},sidebar:"librariesSidebar",previous:{title:"Prefixes",permalink:"/ng-cognizone/docs/libraries/ng-application-profile/api/interfaces/Prefixes"},next:{title:"ResourceAttribute",permalink:"/ng-cognizone/docs/libraries/ng-application-profile/api/interfaces/ResourceAttribute"}},s=[{value:"Type parameters",id:"type-parameters",children:[],level:2},{value:"Properties",id:"properties",children:[{value:"attributes",id:"attributes",children:[{value:"Defined in",id:"defined-in",children:[],level:4}],level:3},{value:"references",id:"references",children:[{value:"Index signature",id:"index-signature",children:[],level:4},{value:"Defined in",id:"defined-in-1",children:[],level:4}],level:3},{value:"type",id:"type",children:[{value:"Defined in",id:"defined-in-2",children:[],level:4}],level:3},{value:"uri",id:"uri",children:[{value:"Defined in",id:"defined-in-3",children:[],level:4}],level:3}],level:2}],u={toc:s};function d(e){var t=e.components,r=(0,i.Z)(e,l);return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"type-parameters"},"Type parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"T")),(0,a.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,a.kt)("inlineCode",{parentName:"td"},"object")," = {}")))),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"attributes"},"attributes"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"attributes"),": { ","[P in string ","|"," number ","|"," symbol]",": ResourceAttribute<T","[P]",">"," }"),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/3b6106c/libs/application-profile/src/lib/models/resource.ts#L16"},"application-profile/src/lib/models/resource.ts:16")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"references"},"references"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"references"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"Object")),(0,a.kt)("h4",{id:"index-signature"},"Index signature"),(0,a.kt)("p",null,"\u25aa ","[referenceKey: ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),"]",": ",(0,a.kt)("inlineCode",{parentName:"p"},"Many"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"string"),">"),(0,a.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/3b6106c/libs/application-profile/src/lib/models/resource.ts#L15"},"application-profile/src/lib/models/resource.ts:15")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"type"},"type"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"type"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"Many"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"string"),">"),(0,a.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/3b6106c/libs/application-profile/src/lib/models/resource.ts#L14"},"application-profile/src/lib/models/resource.ts:14")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"uri"},"uri"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"uri"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/3b6106c/libs/application-profile/src/lib/models/resource.ts#L13"},"application-profile/src/lib/models/resource.ts:13")))}d.isMDXComponent=!0}}]);