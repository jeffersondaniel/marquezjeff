"use strict";(self.webpackChunkmarquez_website_docs=self.webpackChunkmarquez_website_docs||[]).push([[3237],{68572:(e,t,a)=>{a.r(t),a.d(t,{default:()=>E});var n=a(67294),r=a(86010),i=a(39960),l=a(52263),s=a(40025),c=a(87462);const o={flexContainer:"flexContainer_sDXY",rightImage:"rightImage_B3aX",constrain:"constrain_JyYU",imageContainer:"imageContainer_zeTL",image:"image__000"},m=[{title:"What does Marquez do?",subTitle:"Real-time metadata collection",imgSrc:"img/stack.svg",description:n.createElement(n.Fragment,null,n.createElement("p",null,"Marquez is a metadata server, offering an OpenLineage-compatible endpoint for real-time collection of information from running jobs and applications."),n.createElement("p",null,"As the reference implementation of OpenLineage, the Marquez API server already works with all of its integrations developed by the community. This includes Apache Airflow, Apache Spark, dbt, Dagster, and Great Expectations.")),side:"left"},{subTitle:"Unified visual graph",imgSrc:"img/screenshot.png",side:"right",description:n.createElement(n.Fragment,null,n.createElement("p",null,"Through a web user interface, Marquez can provide a visual map that shows complex interdependencies within your data ecosystem."),n.createElement("p",null,"The user interface allows you to browse the metadata within Marquez, making it easy to see the inputs and outputs of each job, trace the lineage of individual datasets, and study performance metrics and execution details."))},{subTitle:"Flexible Lineage API",imgSrc:"img/api-terminal.png",side:"left",description:n.createElement(n.Fragment,null,n.createElement("p",null,"Lineage metadata can be queried using the lineage API, allowing for automation of key tasks like backfills and root cause analysis."),n.createElement("p",null,"With the Lineage API, you can easily traverse the dependency tree and establish context for datasets across multiple pipelines and orchestration platforms. This can be used to enrich data catalogs and data quality systems."))}];function u(e){let{title:t,imgSrc:a,subTitle:i,side:l,description:s}=e;return n.createElement("div",{className:"container"},t&&n.createElement("h1",{className:"text--center margin-top--lg margin-bottom--lg"},t),n.createElement("div",{className:(0,r.Z)(o.flexContainer,"right"===l&&o.rightImage)},n.createElement("div",{className:o.imageContainer},n.createElement("img",{className:o.image,src:a,alt:"Marquez Image"})),n.createElement("div",{className:o.constrain},n.createElement("h3",null,i),n.createElement("p",null,s))))}function d(){return n.createElement("section",{className:(0,r.Z)(o.features,"dashed")},n.createElement("div",{className:"container"},n.createElement("div",{className:"row"},m.map(((e,t)=>n.createElement(u,(0,c.Z)({key:t},e)))))))}const g={heroBanner:"heroBanner_qdFl",flexContainer:"flexContainer_yu2D",buttons:"buttons_AeoN",imageContainer:"imageContainer_yexj",image:"image_bggV"},h={container:"container_fRvA",constrain:"constrain_EWue"};function p(){return n.createElement("section",{className:(0,r.Z)(h.container,"dashed")},n.createElement("div",{className:"container"},n.createElement("div",null,n.createElement("h1",{className:"text--center"},"What is Marquez?"),n.createElement("p",{className:(0,r.Z)("text--center",h.constrain)},"Marquez is an open source metadata service. It maintains data provenance, shows how datasets are consumed and produced, provides global visibility into job runtimes, centralizes dataset lifecycle management, and much more."),n.createElement("h5",{className:"text--center"},"Marquez was released and open sourced by ",n.createElement("a",{target:"_blank",href:"https://wework.com"},"WeWork"),"."))))}function f(){const{siteConfig:e}=(0,l.Z)();return n.createElement("header",{className:(0,r.Z)("hero","dashed",g.heroBanner)},n.createElement("div",{className:"container"},n.createElement("div",{className:g.flexContainer},n.createElement("div",{className:g.imageContainer},n.createElement("img",{className:g.image,src:"img/screenshot.svg",alt:"Lineage Diagram"})),n.createElement("div",null,n.createElement("h1",{className:"hero__title"},e.title),n.createElement("p",{className:"hero__subtitle"},e.tagline),n.createElement("div",{className:g.buttons},n.createElement(i.Z,{className:"button button--secondary button--md",href:"https://github.com/MarquezProject/marquez"},"Quickstart"),n.createElement(i.Z,{className:"button button--secondary button--md margin-left--md",href:"https://github.com/MarquezProject/marquez"},"GitHub"),n.createElement(i.Z,{className:"button button--secondary button--md margin-left--md",href:"https://bit.ly/Marquez_invite"},"Slack"))))))}function E(){const{siteConfig:e}=(0,l.Z)();return n.createElement(s.Z,{title:`${e.title}`,description:"Data lineage for every pipeline."},n.createElement(f,null),n.createElement(p,null),n.createElement("main",null,n.createElement(d,null)))}}}]);