"use strict";(self.webpackChunkmarquez_website_docs=self.webpackChunkmarquez_website_docs||[]).push([[8154],{78908:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>y,contentTitle:()=>u,default:()=>f,frontMatter:()=>l,metadata:()=>h,toc:()=>g});var s=t(87462),n=(t(67294),t(3905)),i=t(26389),p=t(94891),o=t(75190),r=t(47507),m=t(24310),c=t(63303),d=(t(75035),t(85162));const l={id:"put-namespace",title:"Create a namespace",description:"Creates a new namespace object. A namespace enables the contextual grouping of related jobs and datasets. Namespaces must contain only letters (`a-z`, `A-Z`), numbers (`0-9`), underscores (`_`), dashes (`-`), colons (`:`), slashes (`/`), or dots (`.`). A namespace is case-insensitive with a maximum length of `1024` characters. Note jobs and datasets will be unique within a namespace, but not across namespaces.",sidebar_label:"Create a namespace",hide_title:!0,hide_table_of_contents:!0,api:{operationId:"putNamespace",description:"Creates a new namespace object. A namespace enables the contextual grouping of related jobs and datasets. Namespaces must contain only letters (`a-z`, `A-Z`), numbers (`0-9`), underscores (`_`), dashes (`-`), colons (`:`), slashes (`/`), or dots (`.`). A namespace is case-insensitive with a maximum length of `1024` characters. Note jobs and datasets will be unique within a namespace, but not across namespaces.",tags:["Namespaces"],requestBody:{content:{"application/json":{schema:{type:"object",properties:{ownerName:{description:"The owner of the namespace.",type:"string"},description:{description:"The description of the namespace.",type:"string"}},required:["ownerName"],example:{ownerName:"me",description:"My first namespace!"},title:"CreatedNamespace"}}}},responses:{200:{description:"OK",content:{"application/json":{schema:{type:"object",properties:{name:{description:"The name of the namespace.",type:"string"},createdAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was created.",type:"string",format:"date-time"},updatedAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was updated.",type:"string",format:"date-time"},ownerName:{description:"The owner of the namespace.",type:"string"},description:{description:"The description of the namespace.",type:"string"}},example:{name:"my-namespace",createdAt:"2019-05-09T19:49:24.201361Z",updatedAt:"2019-05-09T19:49:24.201361Z",ownerName:"me",description:"My first namespace!"},title:"Namespace"}}}}},parameters:[{name:"namespace",in:"path",description:"The name of the namespace.",required:!0,schema:{type:"string",maxLength:1024,example:"my-namespace"}}],method:"put",path:"/namespaces/{namespace}",servers:[{url:"http://localhost:5000/api/v1",description:"Local API server"}],jsonRequestBodyExample:{ownerName:"me",description:"My first namespace!"},info:{title:"Marquez",version:"0.41.0-SNAPSHOT",description:"Marquez is an open source **metadata service** for the **collection**, **aggregation**, and **visualization** of a data ecosystem's metadata.",license:{name:"Apache 2.0",url:"http://www.apache.org/licenses/LICENSE-2.0.html"}},postman:{name:"Create a namespace",description:{content:"Creates a new namespace object. A namespace enables the contextual grouping of related jobs and datasets. Namespaces must contain only letters (`a-z`, `A-Z`), numbers (`0-9`), underscores (`_`), dashes (`-`), colons (`:`), slashes (`/`), or dots (`.`). A namespace is case-insensitive with a maximum length of `1024` characters. Note jobs and datasets will be unique within a namespace, but not across namespaces.",type:"text/plain"},url:{path:["namespaces",":namespace"],host:["{{baseUrl}}"],query:[],variable:[{disabled:!1,description:{content:"(Required) The name of the namespace.",type:"text/plain"},type:"any",value:"",key:"namespace"}]},header:[{key:"Content-Type",value:"application/json"},{key:"Accept",value:"application/json"}],method:"PUT",body:{mode:"raw",raw:'""',options:{raw:{language:"json"}}}}},sidebar_class_name:"put api-method",info_path:"docs/api/marquez",custom_edit_url:null},u=void 0,h={unversionedId:"api/put-namespace",id:"api/put-namespace",title:"Create a namespace",description:"Creates a new namespace object. A namespace enables the contextual grouping of related jobs and datasets. Namespaces must contain only letters (`a-z`, `A-Z`), numbers (`0-9`), underscores (`_`), dashes (`-`), colons (`:`), slashes (`/`), or dots (`.`). A namespace is case-insensitive with a maximum length of `1024` characters. Note jobs and datasets will be unique within a namespace, but not across namespaces.",source:"@site/docs/api/put-namespace.api.mdx",sourceDirName:"api",slug:"/api/put-namespace",permalink:"/docs/api/put-namespace",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"put-namespace",title:"Create a namespace",description:"Creates a new namespace object. A namespace enables the contextual grouping of related jobs and datasets. Namespaces must contain only letters (`a-z`, `A-Z`), numbers (`0-9`), underscores (`_`), dashes (`-`), colons (`:`), slashes (`/`), or dots (`.`). A namespace is case-insensitive with a maximum length of `1024` characters. Note jobs and datasets will be unique within a namespace, but not across namespaces.",sidebar_label:"Create a namespace",hide_title:!0,hide_table_of_contents:!0,api:{operationId:"putNamespace",description:"Creates a new namespace object. A namespace enables the contextual grouping of related jobs and datasets. Namespaces must contain only letters (`a-z`, `A-Z`), numbers (`0-9`), underscores (`_`), dashes (`-`), colons (`:`), slashes (`/`), or dots (`.`). A namespace is case-insensitive with a maximum length of `1024` characters. Note jobs and datasets will be unique within a namespace, but not across namespaces.",tags:["Namespaces"],requestBody:{content:{"application/json":{schema:{type:"object",properties:{ownerName:{description:"The owner of the namespace.",type:"string"},description:{description:"The description of the namespace.",type:"string"}},required:["ownerName"],example:{ownerName:"me",description:"My first namespace!"},title:"CreatedNamespace"}}}},responses:{200:{description:"OK",content:{"application/json":{schema:{type:"object",properties:{name:{description:"The name of the namespace.",type:"string"},createdAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was created.",type:"string",format:"date-time"},updatedAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was updated.",type:"string",format:"date-time"},ownerName:{description:"The owner of the namespace.",type:"string"},description:{description:"The description of the namespace.",type:"string"}},example:{name:"my-namespace",createdAt:"2019-05-09T19:49:24.201361Z",updatedAt:"2019-05-09T19:49:24.201361Z",ownerName:"me",description:"My first namespace!"},title:"Namespace"}}}}},parameters:[{name:"namespace",in:"path",description:"The name of the namespace.",required:!0,schema:{type:"string",maxLength:1024,example:"my-namespace"}}],method:"put",path:"/namespaces/{namespace}",servers:[{url:"http://localhost:5000/api/v1",description:"Local API server"}],jsonRequestBodyExample:{ownerName:"me",description:"My first namespace!"},info:{title:"Marquez",version:"0.41.0-SNAPSHOT",description:"Marquez is an open source **metadata service** for the **collection**, **aggregation**, and **visualization** of a data ecosystem's metadata.",license:{name:"Apache 2.0",url:"http://www.apache.org/licenses/LICENSE-2.0.html"}},postman:{name:"Create a namespace",description:{content:"Creates a new namespace object. A namespace enables the contextual grouping of related jobs and datasets. Namespaces must contain only letters (`a-z`, `A-Z`), numbers (`0-9`), underscores (`_`), dashes (`-`), colons (`:`), slashes (`/`), or dots (`.`). A namespace is case-insensitive with a maximum length of `1024` characters. Note jobs and datasets will be unique within a namespace, but not across namespaces.",type:"text/plain"},url:{path:["namespaces",":namespace"],host:["{{baseUrl}}"],query:[],variable:[{disabled:!1,description:{content:"(Required) The name of the namespace.",type:"text/plain"},type:"any",value:"",key:"namespace"}]},header:[{key:"Content-Type",value:"application/json"},{key:"Accept",value:"application/json"}],method:"PUT",body:{mode:"raw",raw:'""',options:{raw:{language:"json"}}}}},sidebar_class_name:"put api-method",info_path:"docs/api/marquez",custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"Create a dataset",permalink:"/docs/api/put-dataset"},next:{title:"Create a source",permalink:"/docs/api/put-source"}},y={},g=[{value:"Create a namespace",id:"create-a-namespace",level:2}],b={toc:g},w="wrapper";function f(e){let{components:a,...t}=e;return(0,n.kt)(w,(0,s.Z)({},b,t,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"create-a-namespace"},"Create a namespace"),(0,n.kt)("p",null,"Creates a new namespace object. A namespace enables the contextual grouping of related jobs and datasets. Namespaces must contain only letters (",(0,n.kt)("inlineCode",{parentName:"p"},"a-z"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"A-Z"),"), numbers (",(0,n.kt)("inlineCode",{parentName:"p"},"0-9"),"), underscores (",(0,n.kt)("inlineCode",{parentName:"p"},"_"),"), dashes (",(0,n.kt)("inlineCode",{parentName:"p"},"-"),"), colons (",(0,n.kt)("inlineCode",{parentName:"p"},":"),"), slashes (",(0,n.kt)("inlineCode",{parentName:"p"},"/"),"), or dots (",(0,n.kt)("inlineCode",{parentName:"p"},"."),"). A namespace is case-insensitive with a maximum length of ",(0,n.kt)("inlineCode",{parentName:"p"},"1024")," characters. Note jobs and datasets will be unique within a namespace, but not across namespaces."),(0,n.kt)("details",{style:{marginBottom:"1rem"},"data-collapsed":!1,open:!0},(0,n.kt)("summary",{style:{}},(0,n.kt)("strong",null,"Path Parameters")),(0,n.kt)("div",null,(0,n.kt)("ul",null,(0,n.kt)(o.Z,{className:"paramsItem",param:{name:"namespace",in:"path",description:"The name of the namespace.",required:!0,schema:{type:"string",maxLength:1024,example:"my-namespace"}},mdxType:"ParamsItem"})))),(0,n.kt)(p.Z,{mdxType:"MimeTabs"},(0,n.kt)(d.Z,{label:"application/json",value:"application/json-schema",mdxType:"TabItem"},(0,n.kt)("details",{style:{},"data-collapsed":!1,open:!0},(0,n.kt)("summary",{style:{textAlign:"left"}},(0,n.kt)("strong",null,"Request Body")),(0,n.kt)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,n.kt)("ul",{style:{marginLeft:"1rem"}},(0,n.kt)(m.Z,{collapsible:!1,name:"ownerName",required:!0,schemaName:"string",qualifierMessage:void 0,schema:{description:"The owner of the namespace.",type:"string"},mdxType:"SchemaItem"}),(0,n.kt)(m.Z,{collapsible:!1,name:"description",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The description of the namespace.",type:"string"},mdxType:"SchemaItem"}))))),(0,n.kt)("div",null,(0,n.kt)(i.Z,{mdxType:"ApiTabs"},(0,n.kt)(d.Z,{label:"200",value:"200",mdxType:"TabItem"},(0,n.kt)("div",null,(0,n.kt)("p",null,"OK")),(0,n.kt)("div",null,(0,n.kt)(p.Z,{schemaType:"response",mdxType:"MimeTabs"},(0,n.kt)(d.Z,{label:"application/json",value:"application/json",mdxType:"TabItem"},(0,n.kt)(c.Z,{mdxType:"SchemaTabs"},(0,n.kt)(d.Z,{label:"Schema",value:"Schema",mdxType:"TabItem"},(0,n.kt)("details",{style:{},"data-collapsed":!1,open:!0},(0,n.kt)("summary",{style:{textAlign:"left"}},(0,n.kt)("strong",null,"Schema")),(0,n.kt)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,n.kt)("ul",{style:{marginLeft:"1rem"}},(0,n.kt)(m.Z,{collapsible:!1,name:"name",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The name of the namespace.",type:"string"},mdxType:"SchemaItem"}),(0,n.kt)(m.Z,{collapsible:!1,name:"createdAt",required:!1,schemaName:"date-time",qualifierMessage:void 0,schema:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was created.",type:"string",format:"date-time"},mdxType:"SchemaItem"}),(0,n.kt)(m.Z,{collapsible:!1,name:"updatedAt",required:!1,schemaName:"date-time",qualifierMessage:void 0,schema:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was updated.",type:"string",format:"date-time"},mdxType:"SchemaItem"}),(0,n.kt)(m.Z,{collapsible:!1,name:"ownerName",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The owner of the namespace.",type:"string"},mdxType:"SchemaItem"}),(0,n.kt)(m.Z,{collapsible:!1,name:"description",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The description of the namespace.",type:"string"},mdxType:"SchemaItem"})))),(0,n.kt)(d.Z,{label:"Example (from schema)",value:"Example (from schema)",mdxType:"TabItem"},(0,n.kt)(r.Z,{responseExample:'{\n  "name": "my-namespace",\n  "createdAt": "2019-05-09T19:49:24.201361Z",\n  "updatedAt": "2019-05-09T19:49:24.201361Z",\n  "ownerName": "me",\n  "description": "My first namespace!"\n}',language:"json",mdxType:"ResponseSamples"}))))))))))}f.isMDXComponent=!0}}]);