"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[620],{3905:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return f}});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var o=n.createContext({}),c=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},d=function(e){var t=c(e.components);return n.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,l=e.originalType,o=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),h=c(a),f=i,p=h["".concat(o,".").concat(f)]||h[f]||u[f]||l;return a?n.createElement(p,r(r({ref:t},d),{},{components:a})):n.createElement(p,r({ref:t},d))}));function f(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=a.length,r=new Array(l);r[0]=h;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var c=2;c<l;c++)r[c]=a[c];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},6134:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return s},contentTitle:function(){return o},metadata:function(){return c},toc:function(){return d},default:function(){return h}});var n=a(3117),i=a(102),l=(a(7294),a(3905)),r=["components"],s={id:"How-to-use",title:"How to use",sidebar_label:"How to use",sidebar_position:2,custom_edit_url:null},o=void 0,c={unversionedId:"libraries/elastic-explorer/user-guide/How-to-use",id:"libraries/elastic-explorer/user-guide/How-to-use",title:"How to use",description:"Here is a basic tutorial on how to use the application.",source:"@site/docs/libraries/elastic-explorer/user-guide/how-to-use.md",sourceDirName:"libraries/elastic-explorer/user-guide",slug:"/libraries/elastic-explorer/user-guide/How-to-use",permalink:"/ng-cognizone/docs/libraries/elastic-explorer/user-guide/How-to-use",editUrl:null,tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"How-to-use",title:"How to use",sidebar_label:"How to use",sidebar_position:2,custom_edit_url:null},sidebar:"librariesSidebar",previous:{title:"Installation",permalink:"/ng-cognizone/docs/libraries/elastic-explorer/user-guide/Installation"},next:{title:"Readme",permalink:"/ng-cognizone/docs/libraries/i18n/"}},d=[{value:"Querying an Elasticsearch cluster",id:"querying-an-elasticsearch-cluster",children:[{value:"Elasticsearch Cluster Selection",id:"elasticsearch-cluster-selection",children:[],level:3},{value:"Filtering",id:"filtering",children:[{value:"Filter by uri",id:"filter-by-uri",children:[],level:4},{value:"Filter by type",id:"filter-by-type",children:[],level:4},{value:"Filter by included",id:"filter-by-included",children:[],level:4},{value:"Filter by facets",id:"filter-by-facets",children:[],level:4},{value:"Manual Mode",id:"manual-mode",children:[],level:4},{value:"Enable full text search",id:"enable-full-text-search",children:[],level:4}],level:3},{value:"Result",id:"result",children:[{value:"Tabular view",id:"tabular-view",children:[],level:4},{value:"Structured view",id:"structured-view",children:[],level:4},{value:"Raw view",id:"raw-view",children:[],level:4}],level:3},{value:"Documents detail view",id:"documents-detail-view",children:[{value:"Raw view",id:"raw-view-1",children:[],level:4},{value:"JsonModelFlatGraph view",id:"jsonmodelflatgraph-view",children:[],level:4},{value:"JsonModel view",id:"jsonmodel-view",children:[],level:4}],level:3},{value:"Searching through the document",id:"searching-through-the-document",children:[],level:3}],level:2},{value:"Data Validation",id:"data-validation",children:[],level:2},{value:"Sharing",id:"sharing",children:[],level:2}],u={toc:d};function h(e){var t=e.components,s=(0,i.Z)(e,r);return(0,l.kt)("wrapper",(0,n.Z)({},u,s,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Here is a basic tutorial on how to use the application."),(0,l.kt)("h2",{id:"querying-an-elasticsearch-cluster"},"Querying an Elasticsearch cluster"),(0,l.kt)("h3",{id:"elasticsearch-cluster-selection"},"Elasticsearch Cluster Selection"),(0,l.kt)("p",null,'Once the user has access to the application, there is an elastic cluster selection section in the top left part of the page. At first, there is no elastic cluster configured, but it can be easily configured by clicking on the "settings" button on the same part of the screen. In the opened dialog, the user can either:'),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},'Click on the "plus" button to add a new Elastic cluster configuration. The only required part is the url of that cluster, the user can also provide a label for ease of use.')),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},'Click on the "download" button to download the current list of instances as a json configuration file.')),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},'Click on the "upload" button to upload a json file representing the list of elastic instances to be used by the app.'),(0,l.kt)("p",{parentName:"li"},"List of elastic instances can be accessed ",(0,l.kt)("a",{parentName:"p",href:"https://www.notion.so/cognizone/Developers-corner-6fd5e2ad3a4b462aa03ecba1525fb7c1#1519a1fe4b7b4d4695842c30acd57126"},"here")),(0,l.kt)("p",{parentName:"li"},"Here is a sample JSON - "),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-json"},'[\n  {\n    "url":"http://localhost:9200",\n    "label":"dev"\n  }\n]\n'))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"Edit or delete any existing Elastic cluster definition."),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("a",{target:"_blank",href:a(983).Z},(0,l.kt)("img",{alt:"jsonfileupload",src:a(506).Z})))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"When the user selects an Elastic cluster url, the available indexes list gets updated automatically. It is to be noted that it is not mandatory to select an index to start searching on a cluster, but it's advised to nonetheless."),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("a",{target:"_blank",href:a(8907).Z},(0,l.kt)("img",{alt:"index",src:a(2401).Z}))))),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"filtering"},"Filtering"),(0,l.kt)("p",null,'Right below the "Elastic cluster selection" part, the Filter section allows the user to fill multiple inputs to construct a query that will run against the selected cluster. It has to be noted, that these fields are tightly linked to the "Hal-ed TypedResource" model that we use at Cognizone. If you are not looking for similar data, you should directly use the "manual mode" (more information below).'),(0,l.kt)("h4",{id:"filter-by-uri"},"Filter by uri"),(0,l.kt)("p",null,"Users can filter data based on the uri of the elastic document. Depending on the mapping configuration of the Elastic cluster, this field might also do partial matches. So the equivalent of what is typed in the image below could just be ",(0,l.kt)("inlineCode",{parentName:"p"},"curia/20195271"),". (this field is targeting ",(0,l.kt)("inlineCode",{parentName:"p"},"data.uri"),")"),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(9048).Z},(0,l.kt)("img",{alt:"uri",src:a(1303).Z}))),(0,l.kt)("h4",{id:"filter-by-type"},"Filter by type"),(0,l.kt)("p",null,"Users can filter data based on the available types (this is targeting the ",(0,l.kt)("inlineCode",{parentName:"p"},"data.type")," attribute)."),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(1853).Z},(0,l.kt)("img",{alt:"types",src:a(4738).Z}))),(0,l.kt)("h4",{id:"filter-by-included"},"Filter by included"),(0,l.kt)("p",null,"Users can filter data based on the included uris or types within the elastic document. (this field is targeting ",(0,l.kt)("inlineCode",{parentName:"p"},"included.uri"),")"),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(9233).Z},(0,l.kt)("img",{alt:"included",src:a(7226).Z}))),(0,l.kt)("h4",{id:"filter-by-facets"},"Filter by facets"),(0,l.kt)("p",null,"Users can filter data based on the value in the facet. It targets all the fields in ",(0,l.kt)("inlineCode",{parentName:"p"},"facets"),", and should return a document where at least one facet attribute matches the query."),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(9602).Z},(0,l.kt)("img",{alt:"facets",src:a(3270).Z}))),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"There are 2 additional options that have been adapted in the filters section,")),(0,l.kt)("h4",{id:"manual-mode"},"Manual Mode"),(0,l.kt)("p",null,"The user can modify the existing query that is generated on the selection of the filters and the query can be updated to create more complex conditions as per the need of the user."),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(4177).Z},(0,l.kt)("img",{alt:"manualMode",src:a(2767).Z}))),(0,l.kt)("h4",{id:"enable-full-text-search"},"Enable full text search"),(0,l.kt)("p",null,"Provides the ability to toggle a soft full-text search for the other fields in the filters."),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"result"},"Result"),(0,l.kt)("p",null,'On selection of the elastic url and index, all the elastic documents are loaded that comprises of properties like index, uri, type, and label which can be viewed in a tabular format(by default), along with 2 more view types like structured and raw(similar to elastichead), discussed in the below sections. It must be noted that "label" is not really a set property, but the app tries to find the first attribute that could pass as a label for the fetched document (one of the rules to find such label is to find a property name that contains "title" for example).'),(0,l.kt)("p",null,"The data can be viewed in the 3 different modes -"),(0,l.kt)("h4",{id:"tabular-view"},"Tabular view"),(0,l.kt)("p",null,"On selection of the elastic document, a popup window appears on which a keyword search is possible, it makes it easier for the user to look for a property within the document.\nThe tabular view also has pagination parameters that can be modified to view multiple elastic documents."),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(1968).Z},(0,l.kt)("img",{alt:"table",src:a(4713).Z}))),(0,l.kt)("h4",{id:"structured-view"},"Structured view"),(0,l.kt)("p",null,"Elastic documents can be viewed in a structured format."),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(5647).Z},(0,l.kt)("img",{alt:"structured",src:a(1981).Z}))),(0,l.kt)("h4",{id:"raw-view"},"Raw view"),(0,l.kt)("p",null,"Elastic documents can be viewed in a raw format similar to elastic head"),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(8860).Z},(0,l.kt)("img",{alt:"raw",src:a(6586).Z}))),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"documents-detail-view"},"Documents detail view"),(0,l.kt)("p",null,"On the table view, the user can now access these elastic documents and see the data in 3 different data formats. When the user clicks on an elastic document, this will open a popup that allows the user to search by Uri or a keyword."),(0,l.kt)("h4",{id:"raw-view-1"},"Raw view"),(0,l.kt)("p",null,"The user can view the raw data of the selected elastic document, whatever its ","_","source looks like."),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(6050).Z},(0,l.kt)("img",{alt:"rawData",src:a(6426).Z}))),(0,l.kt)("h4",{id:"jsonmodelflatgraph-view"},"JsonModelFlatGraph view"),(0,l.kt)("p",null,'This view is available only if the document contains a "Hal-ed TypedResource". The user can view all the models available in an elastic document, so viewing complex data within the document is simplified and is a handy feature for developers and project managers.'),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(1172).Z},(0,l.kt)("img",{alt:"jsonModelFlatGraph",src:a(6955).Z}))),(0,l.kt)("h4",{id:"jsonmodel-view"},"JsonModel view"),(0,l.kt)("p",null,'This view is available only if the document contains a "Hal-ed TypedResource". The user can view the elastic document where the graphs are transformed to JsonModel, inspired by json-ld, where the graph is unflattened so the reference to other nodes is directly the node that you are looking for.'),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(2818).Z},(0,l.kt)("img",{alt:"jsonModel",src:a(5789).Z}))),(0,l.kt)("hr",null),(0,l.kt)("h3",{id:"searching-through-the-document"},"Searching through the document"),(0,l.kt)("p",null,"Search by URI and search by keyword is possible within the elastic document, so if a user is looking for a term within a node or a term in facets, the result can be obtained. The search takes place on every keystroke."),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(7662).Z},(0,l.kt)("img",{alt:"searchByUri",src:a(5919).Z}))),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(7521).Z},(0,l.kt)("img",{alt:"searchByKeyword",src:a(1266).Z}))),(0,l.kt)("hr",null),(0,l.kt)("h2",{id:"data-validation"},"Data Validation"),(0,l.kt)("p",null,"Accessible through the associated button on the toolbar of the app, this section can be used to look for errors that are present in the elastic document that can be downloaded in a .csv format.\nTo generate the report, click on the generate report button at the top right corner of the table."),(0,l.kt)("p",null,(0,l.kt)("a",{target:"_blank",href:a(9980).Z},(0,l.kt)("img",{alt:"dataValidation",src:a(5246).Z}))),(0,l.kt)("hr",null),(0,l.kt)("h2",{id:"sharing"},"Sharing"),(0,l.kt)("p",null,'Most pages can be shared using the share button at the bottom right of the screen. This is done to put in the clipboard a "share-friendly" url that can be clicked by other people who currently have the app installed and have enabled protocol handling (as seen in the installation part of this guide).\nThis is done because the host part of the url for this extension changes from user to user, so urls copied directly from the browser\'s bar cannot be used by other users (or not without some tweaking).'))}h.isMDXComponent=!0},9980:function(e,t,a){t.Z=a.p+"assets/files/dataValidation-d997156b6cef1f96448705cf6ef69f0e.png"},9602:function(e,t,a){t.Z=a.p+"assets/files/facets-fc041ac6ac7e267e7e2c3588897f8cfc.png"},9233:function(e,t,a){t.Z=a.p+"assets/files/included-0bff751bbc5029dae3cb54bea2902b8d.png"},8907:function(e,t,a){t.Z=a.p+"assets/files/index-82959fa87908d35bc9f84e0d25432bdd.png"},2818:function(e,t,a){t.Z=a.p+"assets/files/jsonModel-028c5ff7c1cd695ee84a6b58619dee39.png"},1172:function(e,t,a){t.Z=a.p+"assets/files/jsonModelFlatGraph-222baded664af5a5493550805f26488b.png"},983:function(e,t,a){t.Z=a.p+"assets/files/jsonUpload-bd4f4c5e2ef99b29b5ee4a627ab2914d.png"},4177:function(e,t,a){t.Z=a.p+"assets/files/manualMode-9aae83739ce3870488d7e1ad6a9870ae.png"},1853:function(e,t,a){t.Z=a.p+"assets/files/multipleTypes-abb0de43153ff19cbe708f266bc3d98a.png"},6050:function(e,t,a){t.Z=a.p+"assets/files/rawData-b5c47bd2cdf1e4f033bfd973b7999682.png"},8860:function(e,t,a){t.Z=a.p+"assets/files/rawFormat-df8e5b1d255e4519f798a85fbf9237b7.png"},7521:function(e,t,a){t.Z=a.p+"assets/files/searchByKeyword-987d7546b68866abfe386dc0eb58f848.png"},7662:function(e,t,a){t.Z=a.p+"assets/files/searchByUri-0ca41d3750b8d7ddbb9fe0800e5fe00f.png"},5647:function(e,t,a){t.Z=a.p+"assets/files/structured-71665ac7e38dfb17dbaa71dfdb015384.png"},1968:function(e,t,a){t.Z=a.p+"assets/files/table-db67611f6c50f379aa4ad78fa87f74fe.png"},9048:function(e,t,a){t.Z=a.p+"assets/files/uriFilter-5fbb8de85c0f3de22d1f956a685d8bc9.png"},5246:function(e,t,a){t.Z=a.p+"assets/images/dataValidation-d997156b6cef1f96448705cf6ef69f0e.png"},3270:function(e,t,a){t.Z=a.p+"assets/images/facets-fc041ac6ac7e267e7e2c3588897f8cfc.png"},7226:function(e,t,a){t.Z=a.p+"assets/images/included-0bff751bbc5029dae3cb54bea2902b8d.png"},2401:function(e,t,a){t.Z=a.p+"assets/images/index-82959fa87908d35bc9f84e0d25432bdd.png"},5789:function(e,t,a){t.Z=a.p+"assets/images/jsonModel-028c5ff7c1cd695ee84a6b58619dee39.png"},6955:function(e,t,a){t.Z=a.p+"assets/images/jsonModelFlatGraph-222baded664af5a5493550805f26488b.png"},506:function(e,t,a){t.Z=a.p+"assets/images/jsonUpload-bd4f4c5e2ef99b29b5ee4a627ab2914d.png"},2767:function(e,t,a){t.Z=a.p+"assets/images/manualMode-9aae83739ce3870488d7e1ad6a9870ae.png"},4738:function(e,t,a){t.Z=a.p+"assets/images/multipleTypes-abb0de43153ff19cbe708f266bc3d98a.png"},6426:function(e,t,a){t.Z=a.p+"assets/images/rawData-b5c47bd2cdf1e4f033bfd973b7999682.png"},6586:function(e,t,a){t.Z=a.p+"assets/images/rawFormat-df8e5b1d255e4519f798a85fbf9237b7.png"},1266:function(e,t,a){t.Z=a.p+"assets/images/searchByKeyword-987d7546b68866abfe386dc0eb58f848.png"},5919:function(e,t,a){t.Z=a.p+"assets/images/searchByUri-0ca41d3750b8d7ddbb9fe0800e5fe00f.png"},1981:function(e,t,a){t.Z=a.p+"assets/images/structured-71665ac7e38dfb17dbaa71dfdb015384.png"},4713:function(e,t,a){t.Z=a.p+"assets/images/table-db67611f6c50f379aa4ad78fa87f74fe.png"},1303:function(e,t,a){t.Z=a.p+"assets/images/uriFilter-5fbb8de85c0f3de22d1f956a685d8bc9.png"}}]);