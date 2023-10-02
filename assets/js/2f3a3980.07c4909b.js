"use strict";(self.webpackChunkmarquez_website_docs=self.webpackChunkmarquez_website_docs||[]).push([[4551],{64101:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>f,contentTitle:()=>u,default:()=>T,frontMatter:()=>d,metadata:()=>h,toc:()=>y});var s=a(87462),i=(a(67294),a(3905)),n=a(26389),r=a(94891),p=a(75190),m=a(47507),o=a(24310),l=a(63303),c=(a(75035),a(85162));const d={id:"get-namespaces",title:"List all namespaces",description:"Returns a list of namespaces.",sidebar_label:"List all namespaces",hide_title:!0,hide_table_of_contents:!0,api:{operationId:"getNamespaces",parameters:[{name:"limit",in:"query",description:"The number of results to return from offset.",required:!1,schema:{type:"integer",example:25,default:100}},{name:"offset",in:"query",description:"The initial position from which to return results.",required:!1,schema:{type:"integer",default:0}}],description:"Returns a list of namespaces.",tags:["Namespaces"],responses:{200:{description:"OK",content:{"application/json":{schema:{type:"object",properties:{namespaces:{type:"array",items:{type:"object",properties:{name:{description:"The name of the namespace.",type:"string"},createdAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was created.",type:"string",format:"date-time"},updatedAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was updated.",type:"string",format:"date-time"},ownerName:{description:"The owner of the namespace.",type:"string"},description:{description:"The description of the namespace.",type:"string"}},example:{name:"my-namespace",createdAt:"2019-05-09T19:49:24.201361Z",updatedAt:"2019-05-09T19:49:24.201361Z",ownerName:"me",description:"My first namespace!"},title:"Namespace"}}},title:"NamespaceList"}}}}},method:"get",path:"/namespaces",servers:[{url:"http://localhost:5000/api/v1",description:"Local API server"}],info:{title:"Marquez",version:"0.41.0-SNAPSHOT",description:"Marquez is an open source **metadata service** for the **collection**, **aggregation**, and **visualization** of a data ecosystem's metadata.",license:{name:"Apache 2.0",url:"http://www.apache.org/licenses/LICENSE-2.0.html"}},postman:{name:"List all namespaces",description:{content:"Returns a list of namespaces.",type:"text/plain"},url:{path:["namespaces"],host:["{{baseUrl}}"],query:[{disabled:!1,description:{content:"The number of results to return from offset.",type:"text/plain"},key:"limit",value:""},{disabled:!1,description:{content:"The initial position from which to return results.",type:"text/plain"},key:"offset",value:""}],variable:[]},header:[{key:"Accept",value:"application/json"}],method:"GET"}},sidebar_class_name:"get api-method",info_path:"docs/api/marquez",custom_edit_url:null},u=void 0,h={unversionedId:"api/get-namespaces",id:"api/get-namespaces",title:"List all namespaces",description:"Returns a list of namespaces.",source:"@site/docs/api/get-namespaces.api.mdx",sourceDirName:"api",slug:"/api/get-namespaces",permalink:"/docs/api/get-namespaces",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"get-namespaces",title:"List all namespaces",description:"Returns a list of namespaces.",sidebar_label:"List all namespaces",hide_title:!0,hide_table_of_contents:!0,api:{operationId:"getNamespaces",parameters:[{name:"limit",in:"query",description:"The number of results to return from offset.",required:!1,schema:{type:"integer",example:25,default:100}},{name:"offset",in:"query",description:"The initial position from which to return results.",required:!1,schema:{type:"integer",default:0}}],description:"Returns a list of namespaces.",tags:["Namespaces"],responses:{200:{description:"OK",content:{"application/json":{schema:{type:"object",properties:{namespaces:{type:"array",items:{type:"object",properties:{name:{description:"The name of the namespace.",type:"string"},createdAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was created.",type:"string",format:"date-time"},updatedAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was updated.",type:"string",format:"date-time"},ownerName:{description:"The owner of the namespace.",type:"string"},description:{description:"The description of the namespace.",type:"string"}},example:{name:"my-namespace",createdAt:"2019-05-09T19:49:24.201361Z",updatedAt:"2019-05-09T19:49:24.201361Z",ownerName:"me",description:"My first namespace!"},title:"Namespace"}}},title:"NamespaceList"}}}}},method:"get",path:"/namespaces",servers:[{url:"http://localhost:5000/api/v1",description:"Local API server"}],info:{title:"Marquez",version:"0.41.0-SNAPSHOT",description:"Marquez is an open source **metadata service** for the **collection**, **aggregation**, and **visualization** of a data ecosystem's metadata.",license:{name:"Apache 2.0",url:"http://www.apache.org/licenses/LICENSE-2.0.html"}},postman:{name:"List all namespaces",description:{content:"Returns a list of namespaces.",type:"text/plain"},url:{path:["namespaces"],host:["{{baseUrl}}"],query:[{disabled:!1,description:{content:"The number of results to return from offset.",type:"text/plain"},key:"limit",value:""},{disabled:!1,description:{content:"The initial position from which to return results.",type:"text/plain"},key:"offset",value:""}],variable:[]},header:[{key:"Accept",value:"application/json"}],method:"GET"}},sidebar_class_name:"get api-method",info_path:"docs/api/marquez",custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"Retrieve a namespace",permalink:"/docs/api/get-namespace"},next:{title:"Retrieve a run",permalink:"/docs/api/get-run"}},f={},y=[{value:"List all namespaces",id:"list-all-namespaces",level:2}],g={toc:y},k="wrapper";function T(e){let{components:t,...a}=e;return(0,i.kt)(k,(0,s.Z)({},g,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"list-all-namespaces"},"List all namespaces"),(0,i.kt)("p",null,"Returns a list of namespaces."),(0,i.kt)("details",{style:{marginBottom:"1rem"},"data-collapsed":!1,open:!0},(0,i.kt)("summary",{style:{}},(0,i.kt)("strong",null,"Query Parameters")),(0,i.kt)("div",null,(0,i.kt)("ul",null,(0,i.kt)(p.Z,{className:"paramsItem",param:{name:"limit",in:"query",description:"The number of results to return from offset.",required:!1,schema:{type:"integer",example:25,default:100}},mdxType:"ParamsItem"}),(0,i.kt)(p.Z,{className:"paramsItem",param:{name:"offset",in:"query",description:"The initial position from which to return results.",required:!1,schema:{type:"integer",default:0}},mdxType:"ParamsItem"})))),(0,i.kt)("div",null,(0,i.kt)(n.Z,{mdxType:"ApiTabs"},(0,i.kt)(c.Z,{label:"200",value:"200",mdxType:"TabItem"},(0,i.kt)("div",null,(0,i.kt)("p",null,"OK")),(0,i.kt)("div",null,(0,i.kt)(r.Z,{schemaType:"response",mdxType:"MimeTabs"},(0,i.kt)(c.Z,{label:"application/json",value:"application/json",mdxType:"TabItem"},(0,i.kt)(l.Z,{mdxType:"SchemaTabs"},(0,i.kt)(c.Z,{label:"Schema",value:"Schema",mdxType:"TabItem"},(0,i.kt)("details",{style:{},"data-collapsed":!1,open:!0},(0,i.kt)("summary",{style:{textAlign:"left"}},(0,i.kt)("strong",null,"Schema")),(0,i.kt)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,i.kt)("ul",{style:{marginLeft:"1rem"}},(0,i.kt)(o.Z,{collapsible:!0,className:"schemaItem",mdxType:"SchemaItem"},(0,i.kt)("details",{style:{}},(0,i.kt)("summary",{style:{}},(0,i.kt)("strong",null,"namespaces"),(0,i.kt)("span",{style:{opacity:"0.6"}}," object[]")),(0,i.kt)("div",{style:{marginLeft:"1rem"}},(0,i.kt)("li",null,(0,i.kt)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem",paddingBottom:".5rem"}},"Array [")),(0,i.kt)(o.Z,{collapsible:!1,name:"name",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The name of the namespace.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)(o.Z,{collapsible:!1,name:"createdAt",required:!1,schemaName:"date-time",qualifierMessage:void 0,schema:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was created.",type:"string",format:"date-time"},mdxType:"SchemaItem"}),(0,i.kt)(o.Z,{collapsible:!1,name:"updatedAt",required:!1,schemaName:"date-time",qualifierMessage:void 0,schema:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the namespace was updated.",type:"string",format:"date-time"},mdxType:"SchemaItem"}),(0,i.kt)(o.Z,{collapsible:!1,name:"ownerName",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The owner of the namespace.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)(o.Z,{collapsible:!1,name:"description",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The description of the namespace.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)("li",null,(0,i.kt)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem"}},"]")))))))),(0,i.kt)(c.Z,{label:"Example (from schema)",value:"Example (from schema)",mdxType:"TabItem"},(0,i.kt)(m.Z,{responseExample:'{\n  "namespaces": [\n    {\n      "name": "my-namespace",\n      "createdAt": "2019-05-09T19:49:24.201361Z",\n      "updatedAt": "2019-05-09T19:49:24.201361Z",\n      "ownerName": "me",\n      "description": "My first namespace!"\n    }\n  ]\n}',language:"json",mdxType:"ResponseSamples"}))))))))))}T.isMDXComponent=!0}}]);