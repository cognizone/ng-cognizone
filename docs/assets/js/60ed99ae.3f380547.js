"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6331],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return g}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=s(n),g=i,b=d["".concat(c,".").concat(g)]||d[g]||p[g]||o;return n?r.createElement(b,a(a({ref:t},u),{},{components:n})):r.createElement(b,a({ref:t},u))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1802:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return u},default:function(){return d}});var r=n(7462),i=n(3366),o=(n(7294),n(3905)),a=["components"],l={id:"ElasticAggregation",title:"Interface: ElasticAggregation",sidebar_label:"ElasticAggregation",sidebar_position:0,custom_edit_url:null},c=void 0,s={unversionedId:"libraries/model-utils/api/interfaces/ElasticAggregation",id:"libraries/model-utils/api/interfaces/ElasticAggregation",isDocsHomePage:!1,title:"Interface: ElasticAggregation",description:"The content of an elastic aggregation done trough a _search call",source:"@site/docs/libraries/model-utils/api/interfaces/ElasticAggregation.md",sourceDirName:"libraries/model-utils/api/interfaces",slug:"/libraries/model-utils/api/interfaces/ElasticAggregation",permalink:"/ng-cognizone/docs/libraries/model-utils/api/interfaces/ElasticAggregation",editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"ElasticAggregation",title:"Interface: ElasticAggregation",sidebar_label:"ElasticAggregation",sidebar_position:0,custom_edit_url:null},sidebar:"librariesSidebar",previous:{title:"SubSink",permalink:"/ng-cognizone/docs/libraries/model-utils/api/classes/SubSink"},next:{title:"ElasticBucket",permalink:"/ng-cognizone/docs/libraries/model-utils/api/interfaces/ElasticBucket"}},u=[{value:"Properties",id:"properties",children:[{value:"buckets",id:"buckets",children:[]},{value:"doc_count_error_upper_bound",id:"doc_count_error_upper_bound",children:[]},{value:"sum_other_doc_count",id:"sum_other_doc_count",children:[]}]}],p={toc:u};function d(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The content of an elastic aggregation done trough a _search call"),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("h3",{id:"buckets"},"buckets"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,o.kt)("strong",{parentName:"p"},"buckets"),": ",(0,o.kt)("a",{parentName:"p",href:"ElasticBucket"},(0,o.kt)("inlineCode",{parentName:"a"},"ElasticBucket")),"[]"),(0,o.kt)("h4",{id:"defined-in"},"Defined in"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/c5b3f22/libs/model-utils/src/lib/models/elastic-response.ts#L44"},"lib/models/elastic-response.ts:44")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"doc_count_error_upper_bound"},"doc","_","count","_","error","_","upper","_","bound"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"doc","_","count","_","error","_","upper","_","bound"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/c5b3f22/libs/model-utils/src/lib/models/elastic-response.ts#L42"},"lib/models/elastic-response.ts:42")),(0,o.kt)("hr",null),(0,o.kt)("h3",{id:"sum_other_doc_count"},"sum","_","other","_","doc","_","count"),(0,o.kt)("p",null,"\u2022 ",(0,o.kt)("strong",{parentName:"p"},"sum","_","other","_","doc","_","count"),": ",(0,o.kt)("inlineCode",{parentName:"p"},"number")),(0,o.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/c5b3f22/libs/model-utils/src/lib/models/elastic-response.ts#L43"},"lib/models/elastic-response.ts:43")))}d.isMDXComponent=!0}}]);