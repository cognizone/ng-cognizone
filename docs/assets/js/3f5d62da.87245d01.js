"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1498],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=r.createContext({}),s=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(n),m=i,f=u["".concat(o,".").concat(m)]||u[m]||d[m]||a;return n?r.createElement(f,l(l({ref:t},p),{},{components:n})):r.createElement(f,l({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=u;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c.mdxType="string"==typeof e?e:i,l[1]=c;for(var s=2;s<a;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8862:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return o},metadata:function(){return s},toc:function(){return p},default:function(){return u}});var r=n(3117),i=n(102),a=(n(7294),n(3905)),l=["components"],c={id:"IElasticClient",title:"Interface: IElasticClient",sidebar_label:"IElasticClient",sidebar_position:0,custom_edit_url:null},o=void 0,s={unversionedId:"libraries/elastic/api/interfaces/IElasticClient",id:"libraries/elastic/api/interfaces/IElasticClient",title:"Interface: IElasticClient",description:"Implemented by",source:"@site/docs/libraries/elastic/api/interfaces/IElasticClient.md",sourceDirName:"libraries/elastic/api/interfaces",slug:"/libraries/elastic/api/interfaces/IElasticClient",permalink:"/ng-cognizone/docs/libraries/elastic/api/interfaces/IElasticClient",editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"IElasticClient",title:"Interface: IElasticClient",sidebar_label:"IElasticClient",sidebar_position:0,custom_edit_url:null},sidebar:"librariesSidebar",previous:{title:"ElasticApClientFetchOptions",permalink:"/ng-cognizone/docs/libraries/elastic/api/interfaces/ElasticApClientFetchOptions"},next:{title:"Readme",permalink:"/ng-cognizone/docs/libraries/elastic-explorer/"}},p=[{value:"Implemented by",id:"implemented-by",children:[],level:2},{value:"Methods",id:"methods",children:[{value:"search",id:"search",children:[{value:"Parameters",id:"parameters",children:[],level:4},{value:"Returns",id:"returns",children:[],level:4},{value:"Defined in",id:"defined-in",children:[],level:4}],level:3},{value:"searchOne",id:"searchone",children:[{value:"Parameters",id:"parameters-1",children:[],level:4},{value:"Returns",id:"returns-1",children:[],level:4},{value:"Defined in",id:"defined-in-1",children:[],level:4}],level:3}],level:2}],d={toc:p};function u(e){var t=e.components,n=(0,i.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"implemented-by"},"Implemented by"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"../classes/ElasticClient"},(0,a.kt)("inlineCode",{parentName:"a"},"ElasticClient")))),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)("h3",{id:"search"},"search"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("strong",{parentName:"p"},"search"),"(",(0,a.kt)("inlineCode",{parentName:"p"},"query"),"): ",(0,a.kt)("inlineCode",{parentName:"p"},"Observable"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"ElasticSearchResponse"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"unknown"),">",">"),(0,a.kt)("h4",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"query")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"any"))))),(0,a.kt)("h4",{id:"returns"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Observable"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"ElasticSearchResponse"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"unknown"),">",">"),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/d22d5e5/libs/elastic/src/lib/models/elastic-client.ts#L7"},"libs/elastic/src/lib/models/elastic-client.ts:7")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"searchone"},"searchOne"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("strong",{parentName:"p"},"searchOne"),"(",(0,a.kt)("inlineCode",{parentName:"p"},"query"),"): ",(0,a.kt)("inlineCode",{parentName:"p"},"Observable"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,a.kt)("h4",{id:"parameters-1"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"query")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"any"))))),(0,a.kt)("h4",{id:"returns-1"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Observable"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,a.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/cognizone/ng-cognizone/blob/d22d5e5/libs/elastic/src/lib/models/elastic-client.ts#L8"},"libs/elastic/src/lib/models/elastic-client.ts:8")))}u.isMDXComponent=!0}}]);