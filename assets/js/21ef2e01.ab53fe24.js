"use strict";(self.webpackChunkmarquez_website_docs=self.webpackChunkmarquez_website_docs||[]).push([[3877],{25225:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>h,contentTitle:()=>u,default:()=>_,frontMatter:()=>c,metadata:()=>y,toc:()=>b});var s=a(87462),r=(a(67294),a(3905)),n=a(26389),i=a(94891),o=a(75190),d=a(47507),l=a(24310),p=a(63303),m=(a(75035),a(85162));const c={id:"search",title:"Query all datasets and jobs",description:"Returns one or more datasets and jobs of your query.",sidebar_label:"Query all datasets and jobs",hide_title:!0,hide_table_of_contents:!0,api:{operationId:"search",parameters:[{name:"q",in:"query",schema:{type:"string",example:"my-dataset",description:"Query containing pattern to match; datasets and jobs pattern matching is string based and case-insensitive. Use percent sign (`%`) to match any string of zero or more characters (`my-job%`), or an underscore (`_`) to match a single character (`_job_`)."},required:!0},{name:"filter",in:"query",schema:{type:"string",example:"dataset",description:"Filters the results of your query by `dataset` or `job`."},required:!1},{name:"sort",in:"query",schema:{type:"string",example:"name",description:"Sorts the results of your query by `name` or `updated_at`."},required:!1},{name:"limit",in:"query",description:"The number of results to return from offset.",required:!1,schema:{type:"integer",example:25,default:100}},{name:"namespace",in:"query",description:"Match jobs or datasets within the given namespace.",required:!1,schema:{type:"string",maxLength:1024,example:"my-namespace"}},{before:null,name:"before",in:"query",description:"Match jobs or datasets **before** `YYYY-MM-DD`.",required:!1,schema:{type:"string",pattern:"YYYY-MM-DD",example:"2022-09-15"}},{after:null,name:"after",in:"query",description:"Match jobs or datasets **after** `YYYY-MM-DD`.",required:!1,schema:{type:"string",pattern:"YYYY-MM-DD",example:"2022-09-15"}}],description:"Returns one or more datasets and jobs of your query.",tags:["Search"],responses:{200:{description:"OK",content:{"application/json":{schema:{type:"object",properties:{totalCount:{description:"Total number of search results.",type:"integer",example:1},results:{type:"array",items:{type:"object",properties:{type:{type:"string",enum:["DATASET","JOB"],description:"The type of search result.",example:"DATASET",title:"SearchResultType"},name:{type:null,description:"The name of the dataset or job.",example:"public.delivery_7_days"},updatedAt:{type:null,description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset or job was updated.",example:"2019-05-09T19:49:24.201361Z"},namespace:{type:"string",description:"The namespace of the dataset or job.",example:"food_delivery"},nodeId:{type:"string",description:"The ID of the node. A node can either be a dataset node or a job node. The format of nodeId for dataset is `dataset:<namespace_of_dataset>:<name_of_the_dataset>` and for job is `job:<namespace_of_the_job>:<name_of_the_job>`.",example:"dataset:food_delivery:public.delivery_7_days"}},title:"SearchResult"}}},title:"SearchResultList"}}}}},method:"get",path:"/search",servers:[{url:"http://localhost:5000/api/v1",description:"Local API server"}],info:{title:"Marquez",version:"0.41.0-SNAPSHOT",description:"Marquez is an open source **metadata service** for the **collection**, **aggregation**, and **visualization** of a data ecosystem's metadata.",license:{name:"Apache 2.0",url:"http://www.apache.org/licenses/LICENSE-2.0.html"}},postman:{name:"Query all datasets and jobs",description:{content:"Returns one or more datasets and jobs of your query.",type:"text/plain"},url:{path:["search"],host:["{{baseUrl}}"],query:[{disabled:!1,description:{content:"(Required) ",type:"text/plain"},key:"q",value:""},{disabled:!1,key:"filter",value:""},{disabled:!1,key:"sort",value:""},{disabled:!1,description:{content:"The number of results to return from offset.",type:"text/plain"},key:"limit",value:""},{disabled:!1,description:{content:"Match jobs or datasets within the given namespace.",type:"text/plain"},key:"namespace",value:""},{disabled:!1,description:{content:"Match jobs or datasets **before** `YYYY-MM-DD`.",type:"text/plain"},key:"before",value:""},{disabled:!1,description:{content:"Match jobs or datasets **after** `YYYY-MM-DD`.",type:"text/plain"},key:"after",value:""}],variable:[]},header:[{key:"Accept",value:"application/json"}],method:"GET"}},sidebar_class_name:"get api-method",info_path:"docs/api/marquez",custom_edit_url:null},u=void 0,y={unversionedId:"api/search",id:"api/search",title:"Query all datasets and jobs",description:"Returns one or more datasets and jobs of your query.",source:"@site/docs/api/search.api.mdx",sourceDirName:"api",slug:"/api/search",permalink:"/docs/api/search",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"search",title:"Query all datasets and jobs",description:"Returns one or more datasets and jobs of your query.",sidebar_label:"Query all datasets and jobs",hide_title:!0,hide_table_of_contents:!0,api:{operationId:"search",parameters:[{name:"q",in:"query",schema:{type:"string",example:"my-dataset",description:"Query containing pattern to match; datasets and jobs pattern matching is string based and case-insensitive. Use percent sign (`%`) to match any string of zero or more characters (`my-job%`), or an underscore (`_`) to match a single character (`_job_`)."},required:!0},{name:"filter",in:"query",schema:{type:"string",example:"dataset",description:"Filters the results of your query by `dataset` or `job`."},required:!1},{name:"sort",in:"query",schema:{type:"string",example:"name",description:"Sorts the results of your query by `name` or `updated_at`."},required:!1},{name:"limit",in:"query",description:"The number of results to return from offset.",required:!1,schema:{type:"integer",example:25,default:100}},{name:"namespace",in:"query",description:"Match jobs or datasets within the given namespace.",required:!1,schema:{type:"string",maxLength:1024,example:"my-namespace"}},{before:null,name:"before",in:"query",description:"Match jobs or datasets **before** `YYYY-MM-DD`.",required:!1,schema:{type:"string",pattern:"YYYY-MM-DD",example:"2022-09-15"}},{after:null,name:"after",in:"query",description:"Match jobs or datasets **after** `YYYY-MM-DD`.",required:!1,schema:{type:"string",pattern:"YYYY-MM-DD",example:"2022-09-15"}}],description:"Returns one or more datasets and jobs of your query.",tags:["Search"],responses:{200:{description:"OK",content:{"application/json":{schema:{type:"object",properties:{totalCount:{description:"Total number of search results.",type:"integer",example:1},results:{type:"array",items:{type:"object",properties:{type:{type:"string",enum:["DATASET","JOB"],description:"The type of search result.",example:"DATASET",title:"SearchResultType"},name:{type:null,description:"The name of the dataset or job.",example:"public.delivery_7_days"},updatedAt:{type:null,description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset or job was updated.",example:"2019-05-09T19:49:24.201361Z"},namespace:{type:"string",description:"The namespace of the dataset or job.",example:"food_delivery"},nodeId:{type:"string",description:"The ID of the node. A node can either be a dataset node or a job node. The format of nodeId for dataset is `dataset:<namespace_of_dataset>:<name_of_the_dataset>` and for job is `job:<namespace_of_the_job>:<name_of_the_job>`.",example:"dataset:food_delivery:public.delivery_7_days"}},title:"SearchResult"}}},title:"SearchResultList"}}}}},method:"get",path:"/search",servers:[{url:"http://localhost:5000/api/v1",description:"Local API server"}],info:{title:"Marquez",version:"0.41.0-SNAPSHOT",description:"Marquez is an open source **metadata service** for the **collection**, **aggregation**, and **visualization** of a data ecosystem's metadata.",license:{name:"Apache 2.0",url:"http://www.apache.org/licenses/LICENSE-2.0.html"}},postman:{name:"Query all datasets and jobs",description:{content:"Returns one or more datasets and jobs of your query.",type:"text/plain"},url:{path:["search"],host:["{{baseUrl}}"],query:[{disabled:!1,description:{content:"(Required) ",type:"text/plain"},key:"q",value:""},{disabled:!1,key:"filter",value:""},{disabled:!1,key:"sort",value:""},{disabled:!1,description:{content:"The number of results to return from offset.",type:"text/plain"},key:"limit",value:""},{disabled:!1,description:{content:"Match jobs or datasets within the given namespace.",type:"text/plain"},key:"namespace",value:""},{disabled:!1,description:{content:"Match jobs or datasets **before** `YYYY-MM-DD`.",type:"text/plain"},key:"before",value:""},{disabled:!1,description:{content:"Match jobs or datasets **after** `YYYY-MM-DD`.",type:"text/plain"},key:"after",value:""}],variable:[]},header:[{key:"Accept",value:"application/json"}],method:"GET"}},sidebar_class_name:"get api-method",info_path:"docs/api/marquez",custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"Record a single lineage event",permalink:"/docs/api/record-lineage"},next:{title:"Start a run",permalink:"/docs/api/start-run"}},h={},b=[{value:"Query all datasets and jobs",id:"query-all-datasets-and-jobs",level:2}],f={toc:b},g="wrapper";function _(e){let{components:t,...a}=e;return(0,r.kt)(g,(0,s.Z)({},f,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"query-all-datasets-and-jobs"},"Query all datasets and jobs"),(0,r.kt)("p",null,"Returns one or more datasets and jobs of your query."),(0,r.kt)("details",{style:{marginBottom:"1rem"},"data-collapsed":!1,open:!0},(0,r.kt)("summary",{style:{}},(0,r.kt)("strong",null,"Query Parameters")),(0,r.kt)("div",null,(0,r.kt)("ul",null,(0,r.kt)(o.Z,{className:"paramsItem",param:{name:"q",in:"query",schema:{type:"string",example:"my-dataset",description:"Query containing pattern to match; datasets and jobs pattern matching is string based and case-insensitive. Use percent sign (`%`) to match any string of zero or more characters (`my-job%`), or an underscore (`_`) to match a single character (`_job_`)."},required:!0},mdxType:"ParamsItem"}),(0,r.kt)(o.Z,{className:"paramsItem",param:{name:"filter",in:"query",schema:{type:"string",example:"dataset",description:"Filters the results of your query by `dataset` or `job`."},required:!1},mdxType:"ParamsItem"}),(0,r.kt)(o.Z,{className:"paramsItem",param:{name:"sort",in:"query",schema:{type:"string",example:"name",description:"Sorts the results of your query by `name` or `updated_at`."},required:!1},mdxType:"ParamsItem"}),(0,r.kt)(o.Z,{className:"paramsItem",param:{name:"limit",in:"query",description:"The number of results to return from offset.",required:!1,schema:{type:"integer",example:25,default:100}},mdxType:"ParamsItem"}),(0,r.kt)(o.Z,{className:"paramsItem",param:{name:"namespace",in:"query",description:"Match jobs or datasets within the given namespace.",required:!1,schema:{type:"string",maxLength:1024,example:"my-namespace"}},mdxType:"ParamsItem"}),(0,r.kt)(o.Z,{className:"paramsItem",param:{before:null,name:"before",in:"query",description:"Match jobs or datasets **before** `YYYY-MM-DD`.",required:!1,schema:{type:"string",pattern:"YYYY-MM-DD",example:"2022-09-15"}},mdxType:"ParamsItem"}),(0,r.kt)(o.Z,{className:"paramsItem",param:{after:null,name:"after",in:"query",description:"Match jobs or datasets **after** `YYYY-MM-DD`.",required:!1,schema:{type:"string",pattern:"YYYY-MM-DD",example:"2022-09-15"}},mdxType:"ParamsItem"})))),(0,r.kt)("div",null,(0,r.kt)(n.Z,{mdxType:"ApiTabs"},(0,r.kt)(m.Z,{label:"200",value:"200",mdxType:"TabItem"},(0,r.kt)("div",null,(0,r.kt)("p",null,"OK")),(0,r.kt)("div",null,(0,r.kt)(i.Z,{schemaType:"response",mdxType:"MimeTabs"},(0,r.kt)(m.Z,{label:"application/json",value:"application/json",mdxType:"TabItem"},(0,r.kt)(p.Z,{mdxType:"SchemaTabs"},(0,r.kt)(m.Z,{label:"Schema",value:"Schema",mdxType:"TabItem"},(0,r.kt)("details",{style:{},"data-collapsed":!1,open:!0},(0,r.kt)("summary",{style:{textAlign:"left"}},(0,r.kt)("strong",null,"Schema")),(0,r.kt)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,r.kt)("ul",{style:{marginLeft:"1rem"}},(0,r.kt)(l.Z,{collapsible:!1,name:"totalCount",required:!1,schemaName:"integer",qualifierMessage:void 0,schema:{description:"Total number of search results.",type:"integer",example:1},mdxType:"SchemaItem"}),(0,r.kt)(l.Z,{collapsible:!0,className:"schemaItem",mdxType:"SchemaItem"},(0,r.kt)("details",{style:{}},(0,r.kt)("summary",{style:{}},(0,r.kt)("strong",null,"results"),(0,r.kt)("span",{style:{opacity:"0.6"}}," object[]")),(0,r.kt)("div",{style:{marginLeft:"1rem"}},(0,r.kt)("li",null,(0,r.kt)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem",paddingBottom:".5rem"}},"Array [")),(0,r.kt)(l.Z,{collapsible:!1,name:"type",required:!1,schemaName:"SearchResultType",qualifierMessage:"**Possible values:** [`DATASET`, `JOB`]",schema:{type:"string",enum:["DATASET","JOB"],description:"The type of search result.",example:"DATASET",title:"SearchResultType"},mdxType:"SchemaItem"}),(0,r.kt)(l.Z,{collapsible:!1,name:"name",required:!1,schemaName:"",qualifierMessage:void 0,schema:{type:null,description:"The name of the dataset or job.",example:"public.delivery_7_days"},mdxType:"SchemaItem"}),(0,r.kt)(l.Z,{collapsible:!1,name:"updatedAt",required:!1,schemaName:"",qualifierMessage:void 0,schema:{type:null,description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset or job was updated.",example:"2019-05-09T19:49:24.201361Z"},mdxType:"SchemaItem"}),(0,r.kt)(l.Z,{collapsible:!1,name:"namespace",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{type:"string",description:"The namespace of the dataset or job.",example:"food_delivery"},mdxType:"SchemaItem"}),(0,r.kt)(l.Z,{collapsible:!1,name:"nodeId",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{type:"string",description:"The ID of the node. A node can either be a dataset node or a job node. The format of nodeId for dataset is `dataset:<namespace_of_dataset>:<name_of_the_dataset>` and for job is `job:<namespace_of_the_job>:<name_of_the_job>`.",example:"dataset:food_delivery:public.delivery_7_days"},mdxType:"SchemaItem"}),(0,r.kt)("li",null,(0,r.kt)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem"}},"]")))))))),(0,r.kt)(m.Z,{label:"Example (from schema)",value:"Example (from schema)",mdxType:"TabItem"},(0,r.kt)(d.Z,{responseExample:'{\n  "totalCount": 1,\n  "results": [\n    {\n      "type": "DATASET",\n      "name": "public.delivery_7_days",\n      "updatedAt": "2019-05-09T19:49:24.201361Z",\n      "namespace": "food_delivery",\n      "nodeId": "dataset:food_delivery:public.delivery_7_days"\n    }\n  ]\n}',language:"json",mdxType:"ResponseSamples"}))))))))))}_.isMDXComponent=!0}}]);