"use strict";(self.webpackChunkmarquez_website_docs=self.webpackChunkmarquez_website_docs||[]).push([[3627],{75931:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>y,contentTitle:()=>h,default:()=>T,frontMatter:()=>l,metadata:()=>u,toc:()=>f});var s=a(87462),i=(a(67294),a(3905)),n=a(26389),r=a(94891),o=a(75190),d=a(47507),m=a(24310),p=a(63303),c=(a(75035),a(85162));const l={id:"get-datasets",title:"List all datasets",description:"Returns a list of datasets.",sidebar_label:"List all datasets",hide_title:!0,hide_table_of_contents:!0,api:{operationId:"getDatasets",parameters:[{name:"orderBy",in:"query",schema:{type:"string",default:"name",example:"name",description:"Orders the results of your query by indicated `sortDirection` by any column on the row."},required:!1},{name:"sortDirection",in:"query",schema:{type:"string",example:"name",description:"Sorts the results of your query by indicated direction `asc` or `desc`."},required:!1},{name:"pattern",in:"query",schema:{default:"%",type:"string",example:"etl",description:"Filters the results of your query by indicated pattern. Matches any substring"},required:!1},{name:"limit",in:"query",description:"The number of results to return from offset.",required:!1,schema:{type:"integer",example:25,default:100}},{name:"offset",in:"query",description:"The initial position from which to return results.",required:!1,schema:{type:"integer",default:0}},{name:"namespace",in:"path",description:"The name of the namespace.",required:!0,schema:{type:"string",maxLength:1024,example:"my-namespace"}},{name:"dataset",in:"path",description:"The name of the dataset.",required:!0,schema:{type:"string",maxLength:1024,example:"my-dataset"}}],description:"Returns a list of datasets.",tags:["Datasets"],responses:{200:{description:"OK",content:{"application/json":{schema:{type:"object",properties:{datasets:{items:{type:"object",properties:{id:{type:"object",description:"The ID of the dataset.",properties:{namespace:{type:"string",description:"The namespace of the dataset."},name:{type:"string",description:"The name of the dataset."}},title:"DatasetId"},type:{description:"The type of the dataset.",type:"string"},name:{description:"The **logical** name of the dataset.",type:"string"},physicalName:{description:"The **physical** name of the dataset.",type:"string"},createdAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset was created.",type:"string",format:"date-time"},updatedAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset was updated.",type:"string",format:"date-time"},namespace:{type:"string",description:"The namespace of the dataset."},sourceName:{description:"The name of the source associated with the dataset.",type:"string"},fields:{description:"The fields of the dataset.",type:"array",items:{type:"object",properties:{name:{description:"The name of the field.",type:"string"},type:{description:"The data type of the field.",type:"string"},tags:{description:"List of tags.",type:"array",items:{type:"string"}},description:{description:"The description of the field.",type:"string"}},required:["name","type"]}},tags:{description:"List of tags.",type:"array",items:{type:"string"}},lastModifiedAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset was last modified by a successful run.",type:"string",format:"date-time"},lastLifecycleState:{description:"The last lifecycle state of the dataset.",type:"string"},description:{description:"The description of the dataset.",type:"string"},facets:{description:"The facets of the dataset. For a full list of standard dataset facets, see [OpenLineage](https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.md#standard-facets).",type:"object",additionalProperties:{description:"A custom facet enables the extension of _dataset_, _job_, and _run_ metadata. A custom facet **must** also have a schema, where a version of the schema is identifiable via a URL. A field within the schema **must** not start with an underscore (`_`).",allOf:[{description:"All base facet fields are prefixed with an underscore (`_`) to avoid field naming conflicts defined with other facets.",type:"object",properties:{_producer:{description:"URI identifying the producer of this metadata. For example this could be a git url with a given tag or sha",type:"string",format:"uri",example:"https://github.com/OpenLineage/OpenLineage/blob/v1-0-0/client"},_schemaURL:{description:"The URL to the corresponding version of the schema definition following a $ref URL Reference (see https://swagger.io/docs/specification/using-ref/)",type:"string",format:"uri",example:"https://github.com/OpenLineage/OpenLineage/blob/v1-0-0/spec/OpenLineage.yml#MyCustomJobFacet"}},required:["_producer","_schemaURL"],title:"BaseFacet"},{type:"object",additionalProperties:!0}],title:"CustomFacet"},title:"DatasetFacets"},currentVersion:{description:"The current version of the dataset.",type:"string",format:"uuid"},deleted:{description:"The deleted state of the dataset.",type:"boolean"}},example:{id:{namespace:"my-namespace",name:"my-dataset"},type:"DB_TABLE",name:"my-dataset",physicalName:"public.mytable",createdAt:"2019-05-09T19:49:24.201361Z",upodatedAt:"2019-05-09T19:49:24.201361Z",namespace:"my-namespace",sourceName:"my-source",fields:[{"name'":"a",type:"INTEGER",tags:[]},{"name'":"b",type:"TIMESTAMP",tags:[]},{"name'":"c",type:"INTEGER",tags:[]},{"name'":"d",type:"INTEGER",tags:[]}],tags:[],lastModifiedAt:null,description:"My first dataset!",facets:{},currentVersion:"b1d626a2-6d3a-475e-9ecf-943176d4a8c6"},title:"Dataset"}},totalCount:{type:"number",description:"The total number of datasets for the given namespace"}},required:["datasets"],title:"DatasetList"}}}}},method:"get",path:"/namespaces/{namespace}/datasets",servers:[{url:"http://localhost:5000/api/v1",description:"Local API server"}],info:{title:"Marquez",version:"0.41.0-SNAPSHOT",description:"Marquez is an open source **metadata service** for the **collection**, **aggregation**, and **visualization** of a data ecosystem's metadata.",license:{name:"Apache 2.0",url:"http://www.apache.org/licenses/LICENSE-2.0.html"}},postman:{name:"List all datasets",description:{content:"Returns a list of datasets.",type:"text/plain"},url:{path:["namespaces",":namespace","datasets"],host:["{{baseUrl}}"],query:[{disabled:!1,key:"orderBy",value:""},{disabled:!1,key:"sortDirection",value:""},{disabled:!1,key:"pattern",value:""},{disabled:!1,description:{content:"The number of results to return from offset.",type:"text/plain"},key:"limit",value:""},{disabled:!1,description:{content:"The initial position from which to return results.",type:"text/plain"},key:"offset",value:""}],variable:[{disabled:!1,description:{content:"(Required) The name of the namespace.",type:"text/plain"},type:"any",value:"",key:"namespace"},{disabled:!1,description:{content:"(Required) The name of the dataset.",type:"text/plain"},type:"any",value:"",key:"dataset"}]},header:[{key:"Accept",value:"application/json"}],method:"GET"}},sidebar_class_name:"get api-method",info_path:"docs/api/marquez",custom_edit_url:null},h=void 0,u={unversionedId:"api/get-datasets",id:"api/get-datasets",title:"List all datasets",description:"Returns a list of datasets.",source:"@site/docs/api/get-datasets.api.mdx",sourceDirName:"api",slug:"/api/get-datasets",permalink:"/docs/api/get-datasets",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"get-datasets",title:"List all datasets",description:"Returns a list of datasets.",sidebar_label:"List all datasets",hide_title:!0,hide_table_of_contents:!0,api:{operationId:"getDatasets",parameters:[{name:"orderBy",in:"query",schema:{type:"string",default:"name",example:"name",description:"Orders the results of your query by indicated `sortDirection` by any column on the row."},required:!1},{name:"sortDirection",in:"query",schema:{type:"string",example:"name",description:"Sorts the results of your query by indicated direction `asc` or `desc`."},required:!1},{name:"pattern",in:"query",schema:{default:"%",type:"string",example:"etl",description:"Filters the results of your query by indicated pattern. Matches any substring"},required:!1},{name:"limit",in:"query",description:"The number of results to return from offset.",required:!1,schema:{type:"integer",example:25,default:100}},{name:"offset",in:"query",description:"The initial position from which to return results.",required:!1,schema:{type:"integer",default:0}},{name:"namespace",in:"path",description:"The name of the namespace.",required:!0,schema:{type:"string",maxLength:1024,example:"my-namespace"}},{name:"dataset",in:"path",description:"The name of the dataset.",required:!0,schema:{type:"string",maxLength:1024,example:"my-dataset"}}],description:"Returns a list of datasets.",tags:["Datasets"],responses:{200:{description:"OK",content:{"application/json":{schema:{type:"object",properties:{datasets:{items:{type:"object",properties:{id:{type:"object",description:"The ID of the dataset.",properties:{namespace:{type:"string",description:"The namespace of the dataset."},name:{type:"string",description:"The name of the dataset."}},title:"DatasetId"},type:{description:"The type of the dataset.",type:"string"},name:{description:"The **logical** name of the dataset.",type:"string"},physicalName:{description:"The **physical** name of the dataset.",type:"string"},createdAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset was created.",type:"string",format:"date-time"},updatedAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset was updated.",type:"string",format:"date-time"},namespace:{type:"string",description:"The namespace of the dataset."},sourceName:{description:"The name of the source associated with the dataset.",type:"string"},fields:{description:"The fields of the dataset.",type:"array",items:{type:"object",properties:{name:{description:"The name of the field.",type:"string"},type:{description:"The data type of the field.",type:"string"},tags:{description:"List of tags.",type:"array",items:{type:"string"}},description:{description:"The description of the field.",type:"string"}},required:["name","type"]}},tags:{description:"List of tags.",type:"array",items:{type:"string"}},lastModifiedAt:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset was last modified by a successful run.",type:"string",format:"date-time"},lastLifecycleState:{description:"The last lifecycle state of the dataset.",type:"string"},description:{description:"The description of the dataset.",type:"string"},facets:{description:"The facets of the dataset. For a full list of standard dataset facets, see [OpenLineage](https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.md#standard-facets).",type:"object",additionalProperties:{description:"A custom facet enables the extension of _dataset_, _job_, and _run_ metadata. A custom facet **must** also have a schema, where a version of the schema is identifiable via a URL. A field within the schema **must** not start with an underscore (`_`).",allOf:[{description:"All base facet fields are prefixed with an underscore (`_`) to avoid field naming conflicts defined with other facets.",type:"object",properties:{_producer:{description:"URI identifying the producer of this metadata. For example this could be a git url with a given tag or sha",type:"string",format:"uri",example:"https://github.com/OpenLineage/OpenLineage/blob/v1-0-0/client"},_schemaURL:{description:"The URL to the corresponding version of the schema definition following a $ref URL Reference (see https://swagger.io/docs/specification/using-ref/)",type:"string",format:"uri",example:"https://github.com/OpenLineage/OpenLineage/blob/v1-0-0/spec/OpenLineage.yml#MyCustomJobFacet"}},required:["_producer","_schemaURL"],title:"BaseFacet"},{type:"object",additionalProperties:!0}],title:"CustomFacet"},title:"DatasetFacets"},currentVersion:{description:"The current version of the dataset.",type:"string",format:"uuid"},deleted:{description:"The deleted state of the dataset.",type:"boolean"}},example:{id:{namespace:"my-namespace",name:"my-dataset"},type:"DB_TABLE",name:"my-dataset",physicalName:"public.mytable",createdAt:"2019-05-09T19:49:24.201361Z",upodatedAt:"2019-05-09T19:49:24.201361Z",namespace:"my-namespace",sourceName:"my-source",fields:[{"name'":"a",type:"INTEGER",tags:[]},{"name'":"b",type:"TIMESTAMP",tags:[]},{"name'":"c",type:"INTEGER",tags:[]},{"name'":"d",type:"INTEGER",tags:[]}],tags:[],lastModifiedAt:null,description:"My first dataset!",facets:{},currentVersion:"b1d626a2-6d3a-475e-9ecf-943176d4a8c6"},title:"Dataset"}},totalCount:{type:"number",description:"The total number of datasets for the given namespace"}},required:["datasets"],title:"DatasetList"}}}}},method:"get",path:"/namespaces/{namespace}/datasets",servers:[{url:"http://localhost:5000/api/v1",description:"Local API server"}],info:{title:"Marquez",version:"0.41.0-SNAPSHOT",description:"Marquez is an open source **metadata service** for the **collection**, **aggregation**, and **visualization** of a data ecosystem's metadata.",license:{name:"Apache 2.0",url:"http://www.apache.org/licenses/LICENSE-2.0.html"}},postman:{name:"List all datasets",description:{content:"Returns a list of datasets.",type:"text/plain"},url:{path:["namespaces",":namespace","datasets"],host:["{{baseUrl}}"],query:[{disabled:!1,key:"orderBy",value:""},{disabled:!1,key:"sortDirection",value:""},{disabled:!1,key:"pattern",value:""},{disabled:!1,description:{content:"The number of results to return from offset.",type:"text/plain"},key:"limit",value:""},{disabled:!1,description:{content:"The initial position from which to return results.",type:"text/plain"},key:"offset",value:""}],variable:[{disabled:!1,description:{content:"(Required) The name of the namespace.",type:"text/plain"},type:"any",value:"",key:"namespace"},{disabled:!1,description:{content:"(Required) The name of the dataset.",type:"text/plain"},type:"any",value:"",key:"dataset"}]},header:[{key:"Accept",value:"application/json"}],method:"GET"}},sidebar_class_name:"get api-method",info_path:"docs/api/marquez",custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"Retrieve a dataset",permalink:"/docs/api/get-dataset"},next:{title:"Retrieve run or job facets for a run.",permalink:"/docs/api/get-facets"}},y={},f=[{value:"List all datasets",id:"list-all-datasets",level:2}],g={toc:f},b="wrapper";function T(e){let{components:t,...a}=e;return(0,i.kt)(b,(0,s.Z)({},g,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"list-all-datasets"},"List all datasets"),(0,i.kt)("p",null,"Returns a list of datasets."),(0,i.kt)("details",{style:{marginBottom:"1rem"},"data-collapsed":!1,open:!0},(0,i.kt)("summary",{style:{}},(0,i.kt)("strong",null,"Path Parameters")),(0,i.kt)("div",null,(0,i.kt)("ul",null,(0,i.kt)(o.Z,{className:"paramsItem",param:{name:"namespace",in:"path",description:"The name of the namespace.",required:!0,schema:{type:"string",maxLength:1024,example:"my-namespace"}},mdxType:"ParamsItem"}),(0,i.kt)(o.Z,{className:"paramsItem",param:{name:"dataset",in:"path",description:"The name of the dataset.",required:!0,schema:{type:"string",maxLength:1024,example:"my-dataset"}},mdxType:"ParamsItem"})))),(0,i.kt)("details",{style:{marginBottom:"1rem"},"data-collapsed":!1,open:!0},(0,i.kt)("summary",{style:{}},(0,i.kt)("strong",null,"Query Parameters")),(0,i.kt)("div",null,(0,i.kt)("ul",null,(0,i.kt)(o.Z,{className:"paramsItem",param:{name:"orderBy",in:"query",schema:{type:"string",default:"name",example:"name",description:"Orders the results of your query by indicated `sortDirection` by any column on the row."},required:!1},mdxType:"ParamsItem"}),(0,i.kt)(o.Z,{className:"paramsItem",param:{name:"sortDirection",in:"query",schema:{type:"string",example:"name",description:"Sorts the results of your query by indicated direction `asc` or `desc`."},required:!1},mdxType:"ParamsItem"}),(0,i.kt)(o.Z,{className:"paramsItem",param:{name:"pattern",in:"query",schema:{default:"%",type:"string",example:"etl",description:"Filters the results of your query by indicated pattern. Matches any substring"},required:!1},mdxType:"ParamsItem"}),(0,i.kt)(o.Z,{className:"paramsItem",param:{name:"limit",in:"query",description:"The number of results to return from offset.",required:!1,schema:{type:"integer",example:25,default:100}},mdxType:"ParamsItem"}),(0,i.kt)(o.Z,{className:"paramsItem",param:{name:"offset",in:"query",description:"The initial position from which to return results.",required:!1,schema:{type:"integer",default:0}},mdxType:"ParamsItem"})))),(0,i.kt)("div",null,(0,i.kt)(n.Z,{mdxType:"ApiTabs"},(0,i.kt)(c.Z,{label:"200",value:"200",mdxType:"TabItem"},(0,i.kt)("div",null,(0,i.kt)("p",null,"OK")),(0,i.kt)("div",null,(0,i.kt)(r.Z,{schemaType:"response",mdxType:"MimeTabs"},(0,i.kt)(c.Z,{label:"application/json",value:"application/json",mdxType:"TabItem"},(0,i.kt)(p.Z,{mdxType:"SchemaTabs"},(0,i.kt)(c.Z,{label:"Schema",value:"Schema",mdxType:"TabItem"},(0,i.kt)("details",{style:{},"data-collapsed":!1,open:!0},(0,i.kt)("summary",{style:{textAlign:"left"}},(0,i.kt)("strong",null,"Schema")),(0,i.kt)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,i.kt)("ul",{style:{marginLeft:"1rem"}},(0,i.kt)(m.Z,{collapsible:!0,className:"schemaItem",mdxType:"SchemaItem"},(0,i.kt)("details",{style:{}},(0,i.kt)("summary",{style:{}},(0,i.kt)("strong",null,"datasets"),(0,i.kt)("span",{style:{opacity:"0.6"}}," object[]"),(0,i.kt)("strong",{style:{fontSize:"var(--ifm-code-font-size)",color:"var(--openapi-required)"}}," required")),(0,i.kt)("div",{style:{marginLeft:"1rem"}},(0,i.kt)("li",null,(0,i.kt)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem",paddingBottom:".5rem"}},"Array [")),(0,i.kt)(m.Z,{collapsible:!0,className:"schemaItem",mdxType:"SchemaItem"},(0,i.kt)("details",{style:{}},(0,i.kt)("summary",{style:{}},(0,i.kt)("strong",null,"id"),(0,i.kt)("span",{style:{opacity:"0.6"}}," object")),(0,i.kt)("div",{style:{marginLeft:"1rem"}},(0,i.kt)("div",{style:{marginTop:".5rem",marginBottom:".5rem"}},(0,i.kt)("p",null,"The ID of the dataset.")),(0,i.kt)(m.Z,{collapsible:!1,name:"namespace",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{type:"string",description:"The namespace of the dataset."},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"name",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{type:"string",description:"The name of the dataset."},mdxType:"SchemaItem"})))),(0,i.kt)(m.Z,{collapsible:!1,name:"type",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The type of the dataset.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"name",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The **logical** name of the dataset.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"physicalName",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The **physical** name of the dataset.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"createdAt",required:!1,schemaName:"date-time",qualifierMessage:void 0,schema:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset was created.",type:"string",format:"date-time"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"updatedAt",required:!1,schemaName:"date-time",qualifierMessage:void 0,schema:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset was updated.",type:"string",format:"date-time"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"namespace",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{type:"string",description:"The namespace of the dataset."},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"sourceName",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The name of the source associated with the dataset.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!0,className:"schemaItem",mdxType:"SchemaItem"},(0,i.kt)("details",{style:{}},(0,i.kt)("summary",{style:{}},(0,i.kt)("strong",null,"fields"),(0,i.kt)("span",{style:{opacity:"0.6"}}," object[]")),(0,i.kt)("div",{style:{marginLeft:"1rem"}},(0,i.kt)("div",{style:{marginTop:".5rem",marginBottom:".5rem"}},(0,i.kt)("p",null,"The fields of the dataset.")),(0,i.kt)("li",null,(0,i.kt)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem",paddingBottom:".5rem"}},"Array [")),(0,i.kt)(m.Z,{collapsible:!1,name:"name",required:!0,schemaName:"string",qualifierMessage:void 0,schema:{description:"The name of the field.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"type",required:!0,schemaName:"string",qualifierMessage:void 0,schema:{description:"The data type of the field.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"tags",required:!1,schemaName:"string[]",qualifierMessage:void 0,schema:{description:"List of tags.",type:"array",items:{type:"string"}},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"description",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The description of the field.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)("li",null,(0,i.kt)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem"}},"]"))))),(0,i.kt)(m.Z,{collapsible:!1,name:"tags",required:!1,schemaName:"string[]",qualifierMessage:void 0,schema:{description:"List of tags.",type:"array",items:{type:"string"}},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"lastModifiedAt",required:!1,schemaName:"date-time",qualifierMessage:void 0,schema:{description:"An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp representing the date/time the dataset was last modified by a successful run.",type:"string",format:"date-time"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"lastLifecycleState",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The last lifecycle state of the dataset.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"description",required:!1,schemaName:"string",qualifierMessage:void 0,schema:{description:"The description of the dataset.",type:"string"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!0,className:"schemaItem",mdxType:"SchemaItem"},(0,i.kt)("details",{style:{}},(0,i.kt)("summary",{style:{}},(0,i.kt)("strong",null,"facets"),(0,i.kt)("span",{style:{opacity:"0.6"}}," object")),(0,i.kt)("div",{style:{marginLeft:"1rem"}},(0,i.kt)("div",{style:{marginTop:".5rem",marginBottom:".5rem"}},(0,i.kt)("p",null,"The facets of the dataset. For a full list of standard dataset facets, see ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.md#standard-facets"},"OpenLineage"),".")),(0,i.kt)(m.Z,{collapsible:!1,name:"description",required:!1,schemaName:"",qualifierMessage:void 0,schema:"A custom facet enables the extension of _dataset_, _job_, and _run_ metadata. A custom facet **must** also have a schema, where a version of the schema is identifiable via a URL. A field within the schema **must** not start with an underscore (`_`).",mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"allOf",required:!1,schemaName:"",qualifierMessage:void 0,schema:[{description:"All base facet fields are prefixed with an underscore (`_`) to avoid field naming conflicts defined with other facets.",type:"object",properties:{_producer:{description:"URI identifying the producer of this metadata. For example this could be a git url with a given tag or sha",type:"string",format:"uri",example:"https://github.com/OpenLineage/OpenLineage/blob/v1-0-0/client"},_schemaURL:{description:"The URL to the corresponding version of the schema definition following a $ref URL Reference (see https://swagger.io/docs/specification/using-ref/)",type:"string",format:"uri",example:"https://github.com/OpenLineage/OpenLineage/blob/v1-0-0/spec/OpenLineage.yml#MyCustomJobFacet"}},required:["_producer","_schemaURL"],title:"BaseFacet"},{type:"object",additionalProperties:!0}],mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"title",required:!1,schemaName:"",qualifierMessage:void 0,schema:"CustomFacet",mdxType:"SchemaItem"})))),(0,i.kt)(m.Z,{collapsible:!1,name:"currentVersion",required:!1,schemaName:"uuid",qualifierMessage:void 0,schema:{description:"The current version of the dataset.",type:"string",format:"uuid"},mdxType:"SchemaItem"}),(0,i.kt)(m.Z,{collapsible:!1,name:"deleted",required:!1,schemaName:"boolean",qualifierMessage:void 0,schema:{description:"The deleted state of the dataset.",type:"boolean"},mdxType:"SchemaItem"}),(0,i.kt)("li",null,(0,i.kt)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem"}},"]"))))),(0,i.kt)(m.Z,{collapsible:!1,name:"totalCount",required:!1,schemaName:"number",qualifierMessage:void 0,schema:{type:"number",description:"The total number of datasets for the given namespace"},mdxType:"SchemaItem"})))),(0,i.kt)(c.Z,{label:"Example (from schema)",value:"Example (from schema)",mdxType:"TabItem"},(0,i.kt)(d.Z,{responseExample:'{\n  "datasets": [\n    {\n      "id": {\n        "namespace": "my-namespace",\n        "name": "my-dataset"\n      },\n      "type": "DB_TABLE",\n      "name": "my-dataset",\n      "physicalName": "public.mytable",\n      "createdAt": "2019-05-09T19:49:24.201361Z",\n      "upodatedAt": "2019-05-09T19:49:24.201361Z",\n      "namespace": "my-namespace",\n      "sourceName": "my-source",\n      "fields": [\n        {\n          "name\'": "a",\n          "type": "INTEGER",\n          "tags": []\n        },\n        {\n          "name\'": "b",\n          "type": "TIMESTAMP",\n          "tags": []\n        },\n        {\n          "name\'": "c",\n          "type": "INTEGER",\n          "tags": []\n        },\n        {\n          "name\'": "d",\n          "type": "INTEGER",\n          "tags": []\n        }\n      ],\n      "tags": [],\n      "lastModifiedAt": null,\n      "description": "My first dataset!",\n      "facets": {},\n      "currentVersion": "b1d626a2-6d3a-475e-9ecf-943176d4a8c6"\n    }\n  ],\n  "totalCount": 0\n}',language:"json",mdxType:"ResponseSamples"}))))))))))}T.isMDXComponent=!0}}]);