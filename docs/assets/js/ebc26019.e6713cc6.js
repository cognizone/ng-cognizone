"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4198],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=i.createContext({}),s=function(e){var t=i.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=s(e.components);return i.createElement(d.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,d=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=s(n),m=r,k=u["".concat(d,".").concat(m)]||u[m]||c[m]||a;return n?i.createElement(k,l(l({ref:t},p),{},{components:n})):i.createElement(k,l({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,l=new Array(a);l[0]=u;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<a;s++)l[s]=n[s];return i.createElement.apply(null,l)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8773:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return d},metadata:function(){return s},toc:function(){return p},default:function(){return u}});var i=n(3117),r=n(102),a=(n(7294),n(3905)),l=["components"],o={id:"ElasticQuery",title:"Interface: ElasticQuery",sidebar_label:"ElasticQuery",sidebar_position:0,custom_edit_url:null},d=void 0,s={unversionedId:"libraries/model-utils/api/interfaces/ElasticQuery",id:"libraries/model-utils/api/interfaces/ElasticQuery",title:"Interface: ElasticQuery",description:"This aims to describe an elastic search query, but it can be quite limitative",source:"@site/docs/libraries/model-utils/api/interfaces/ElasticQuery.md",sourceDirName:"libraries/model-utils/api/interfaces",slug:"/libraries/model-utils/api/interfaces/ElasticQuery",permalink:"/ng-cognizone/docs/libraries/model-utils/api/interfaces/ElasticQuery",editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"ElasticQuery",title:"Interface: ElasticQuery",sidebar_label:"ElasticQuery",sidebar_position:0,custom_edit_url:null},sidebar:"librariesSidebar",previous:{title:"ElasticHit",permalink:"/ng-cognizone/docs/libraries/model-utils/api/interfaces/ElasticHit"},next:{title:"ElasticSearchResponse",permalink:"/ng-cognizone/docs/libraries/model-utils/api/interfaces/ElasticSearchResponse"}},p=[{value:"Properties",id:"properties",children:[{value:"aggs",id:"aggs",children:[{value:"Index signature",id:"index-signature",children:[],level:4},{value:"Defined in",id:"defined-in",children:[],level:4}],level:3},{value:"from",id:"from",children:[{value:"Defined in",id:"defined-in-1",children:[],level:4}],level:3},{value:"query",id:"query",children:[{value:"Type declaration",id:"type-declaration",children:[],level:4},{value:"Defined in",id:"defined-in-2",children:[],level:4}],level:3},{value:"size",id:"size",children:[{value:"Defined in",id:"defined-in-3",children:[],level:4}],level:3},{value:"sort",id:"sort",children:[{value:"Index signature",id:"index-signature-1",children:[],level:4},{value:"Defined in",id:"defined-in-4",children:[],level:4}],level:3},{value:"track_total_hits",id:"track_total_hits",children:[{value:"Defined in",id:"defined-in-5",children:[],level:4}],level:3}],level:2}],c={toc:p};function u(e){var t=e.components,n=(0,r.Z)(e,l);return(0,a.kt)("wrapper",(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This aims to describe an elastic search query, but it can be quite limitative\nfor now"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"deprecated"))," use the one from ",(0,a.kt)("inlineCode",{parentName:"p"},"@cognizone/elastic")," instead"),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"aggs"},"aggs"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"aggs"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"Object")),(0,a.kt)("h4",{id:"index-signature"},"Index signature"),(0,a.kt)("p",null,"\u25aa ","[key: ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),"]",": ",(0,a.kt)("inlineCode",{parentName:"p"},"AggregationQuery")),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/d22d5e5/libs/model-utils/src/lib/models/elastic-query.ts#L22"},"lib/models/elastic-query.ts:22")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"from"},"from"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"from"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/d22d5e5/libs/model-utils/src/lib/models/elastic-query.ts#L9"},"lib/models/elastic-query.ts:9")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"query"},"query"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"query"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"Object")),(0,a.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"bool?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"Object"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"bool.filter")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"unknown"),"[]")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"bool.minimum_should_match?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"number"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"bool.must")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"unknown"),"[]")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"bool.must_not")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"unknown"),"[]")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"bool.should")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"unknown"),"[]")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"match?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"object"))))),(0,a.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/d22d5e5/libs/model-utils/src/lib/models/elastic-query.ts#L12"},"lib/models/elastic-query.ts:12")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"size"},"size"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"size"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/d22d5e5/libs/model-utils/src/lib/models/elastic-query.ts#L10"},"lib/models/elastic-query.ts:10")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"sort"},"sort"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"sort"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"Object")),(0,a.kt)("h4",{id:"index-signature-1"},"Index signature"),(0,a.kt)("p",null,"\u25aa ","[field: ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),"]",": ",(0,a.kt)("inlineCode",{parentName:"p"},"ElasticSort")),(0,a.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/d22d5e5/libs/model-utils/src/lib/models/elastic-query.ts#L23"},"lib/models/elastic-query.ts:23")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"track_total_hits"},"track","_","total","_","hits"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"track","_","total","_","hits"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"boolean")),(0,a.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/d22d5e5/libs/model-utils/src/lib/models/elastic-query.ts#L11"},"lib/models/elastic-query.ts:11")))}u.isMDXComponent=!0}}]);