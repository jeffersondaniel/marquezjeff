"use strict";(self.webpackChunkmarquez_website_docs=self.webpackChunkmarquez_website_docs||[]).push([[53],{1109:e=>{e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"Quickstart","href":"/docs/quickstart/","docId":"quickstart/index"},{"type":"category","label":"Metadata API","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Introduction","href":"/docs/api/marquez","docId":"api/marquez"},{"type":"link","label":"Abort a run","href":"/docs/api/abort-run","className":"post api-method","docId":"api/abort-run"},{"type":"link","label":"Tag a dataset","href":"/docs/api/add-tag-to-dataset","className":"post api-method","docId":"api/add-tag-to-dataset"},{"type":"link","label":"Tag a field","href":"/docs/api/add-tag-to-field-of-dataset","className":"post api-method","docId":"api/add-tag-to-field-of-dataset"},{"type":"link","label":"Complete a run","href":"/docs/api/complete-run","className":"post api-method","docId":"api/complete-run"},{"type":"link","label":"Create a run","href":"/docs/api/create-run","className":"post api-method","docId":"api/create-run"},{"type":"link","label":"Soft deletes dataset.","href":"/docs/api/delete-dataset","className":"delete api-method","docId":"api/delete-dataset"},{"type":"link","label":"Deletes a namespace","href":"/docs/api/delete-namespace","className":"delete api-method","docId":"api/delete-namespace"},{"type":"link","label":"Fail a run","href":"/docs/api/fail-run","className":"post api-method","docId":"api/fail-run"},{"type":"link","label":"Retrieve a dataset","href":"/docs/api/get-dataset","className":"get api-method","docId":"api/get-dataset"},{"type":"link","label":"List all datasets","href":"/docs/api/get-datasets","className":"get api-method","docId":"api/get-datasets"},{"type":"link","label":"Retrieve run or job facets for a run.","href":"/docs/api/get-facets","className":"get api-method","docId":"api/get-facets"},{"type":"link","label":"List all received OpenLineage events.","href":"/docs/api/get-lineage-events","className":"get api-method","docId":"api/get-lineage-events"},{"type":"link","label":"Get a lineage graph","href":"/docs/api/get-lineage","className":"get api-method","docId":"api/get-lineage"},{"type":"link","label":"Retrieve a namespace","href":"/docs/api/get-namespace","className":"get api-method","docId":"api/get-namespace"},{"type":"link","label":"List all namespaces","href":"/docs/api/get-namespaces","className":"get api-method","docId":"api/get-namespaces"},{"type":"link","label":"Retrieve a run","href":"/docs/api/get-run","className":"get api-method","docId":"api/get-run"},{"type":"link","label":"List all runs","href":"/docs/api/get-runs","className":"get api-method","docId":"api/get-runs"},{"type":"link","label":"Retrieve a source","href":"/docs/api/get-source","className":"get api-method","docId":"api/get-source"},{"type":"link","label":"List all sources","href":"/docs/api/get-sources","className":"get api-method","docId":"api/get-sources"},{"type":"link","label":"List all tags","href":"/docs/api/get-tags","className":"get api-method","docId":"api/get-tags"},{"type":"link","label":"Create a dataset","href":"/docs/api/put-dataset","className":"put api-method","docId":"api/put-dataset"},{"type":"link","label":"Create a namespace","href":"/docs/api/put-namespace","className":"put api-method","docId":"api/put-namespace"},{"type":"link","label":"Create a source","href":"/docs/api/put-source","className":"put api-method","docId":"api/put-source"},{"type":"link","label":"Create a tag","href":"/docs/api/put-tag","className":"put api-method","docId":"api/put-tag"},{"type":"link","label":"Record a single lineage event","href":"/docs/api/record-lineage","className":"post api-method","docId":"api/record-lineage"},{"type":"link","label":"Query all datasets and jobs","href":"/docs/api/search","className":"get api-method","docId":"api/search"},{"type":"link","label":"Start a run","href":"/docs/api/start-run","className":"post api-method","docId":"api/start-run"}],"href":"/docs/category/metadata-api"},{"type":"category","label":"Deployment Overview","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Running Marquez on AWS","href":"/docs/deployment/running-on-aws","docId":"deployment/running-on-aws"}],"href":"/docs/deployment/"},{"type":"link","label":"Frequently Asked Questions","href":"/docs/faq","docId":"faq"}]},"docs":{"api/abort-run":{"id":"api/abort-run","title":"Abort a run","description":"Marks the run as `ABORTED`.","sidebar":"tutorialSidebar"},"api/add-tag-to-dataset":{"id":"api/add-tag-to-dataset","title":"Tag a dataset","description":"Tag an existing dataset.","sidebar":"tutorialSidebar"},"api/add-tag-to-field-of-dataset":{"id":"api/add-tag-to-field-of-dataset","title":"Tag a field","description":"Tag an existing field of a dataset.","sidebar":"tutorialSidebar"},"api/complete-run":{"id":"api/complete-run","title":"Complete a run","description":"Marks the run as `COMPLETED`.","sidebar":"tutorialSidebar"},"api/create-run":{"id":"api/create-run","title":"Create a run","description":"Creates a new run object for a job.","sidebar":"tutorialSidebar"},"api/delete-dataset":{"id":"api/delete-dataset","title":"Soft deletes dataset.","description":"Soft deletes dataset. It will be un-deleted if new OpenLineage event containing this dataset comes.","sidebar":"tutorialSidebar"},"api/delete-namespace":{"id":"api/delete-namespace","title":"Deletes a namespace","description":"Soft deletes a namespace, and every job and dataset inside. On next event containing this namespace, the namespace will be undeleted.","sidebar":"tutorialSidebar"},"api/fail-run":{"id":"api/fail-run","title":"Fail a run","description":"Marks the run as `FAILED`.","sidebar":"tutorialSidebar"},"api/get-dataset":{"id":"api/get-dataset","title":"Retrieve a dataset","description":"Returns a dataset.","sidebar":"tutorialSidebar"},"api/get-datasets":{"id":"api/get-datasets","title":"List all datasets","description":"Returns a list of datasets.","sidebar":"tutorialSidebar"},"api/get-facets":{"id":"api/get-facets","title":"Retrieve run or job facets for a run.","description":"Retrieve run or job facets for a run.","sidebar":"tutorialSidebar"},"api/get-lineage":{"id":"api/get-lineage","title":"Get a lineage graph","description":"Get a lineage graph","sidebar":"tutorialSidebar"},"api/get-lineage-events":{"id":"api/get-lineage-events","title":"List all received OpenLineage events.","description":"Returns a list of OpenLineage events, sorted in direction of passed sort parameter. By default it is desc.","sidebar":"tutorialSidebar"},"api/get-namespace":{"id":"api/get-namespace","title":"Retrieve a namespace","description":"Returns a namespace.","sidebar":"tutorialSidebar"},"api/get-namespaces":{"id":"api/get-namespaces","title":"List all namespaces","description":"Returns a list of namespaces.","sidebar":"tutorialSidebar"},"api/get-run":{"id":"api/get-run","title":"Retrieve a run","description":"Retrieve a run.","sidebar":"tutorialSidebar"},"api/get-runs":{"id":"api/get-runs","title":"List all runs","description":"Returns a list of runs for a job.","sidebar":"tutorialSidebar"},"api/get-source":{"id":"api/get-source","title":"Retrieve a source","description":"Returns a source.","sidebar":"tutorialSidebar"},"api/get-sources":{"id":"api/get-sources","title":"List all sources","description":"Returns a list of sources.","sidebar":"tutorialSidebar"},"api/get-tags":{"id":"api/get-tags","title":"List all tags","description":"Returns a list of tags.","sidebar":"tutorialSidebar"},"api/marquez":{"id":"api/marquez","title":"Marquez","description":"Marquez is an open source **metadata service** for the **collection**, **aggregation**, and **visualization** of a data ecosystem\'s metadata.","sidebar":"tutorialSidebar"},"api/put-dataset":{"id":"api/put-dataset","title":"Create a dataset","description":"Creates a new dataset.","sidebar":"tutorialSidebar"},"api/put-namespace":{"id":"api/put-namespace","title":"Create a namespace","description":"Creates a new namespace object. A namespace enables the contextual grouping of related jobs and datasets. Namespaces must contain only letters (`a-z`, `A-Z`), numbers (`0-9`), underscores (`_`), dashes (`-`), colons (`:`), slashes (`/`), or dots (`.`). A namespace is case-insensitive with a maximum length of `1024` characters. Note jobs and datasets will be unique within a namespace, but not across namespaces.","sidebar":"tutorialSidebar"},"api/put-source":{"id":"api/put-source","title":"Create a source","description":"Creates a new source object. A source is the physical location of a dataset such as a table in PostgreSQL, or topic in Kafka. A source enables the grouping of physical datasets to their physical source.","sidebar":"tutorialSidebar"},"api/put-tag":{"id":"api/put-tag","title":"Create a tag","description":"Creates a new tag object.","sidebar":"tutorialSidebar"},"api/record-lineage":{"id":"api/record-lineage","title":"Record a single lineage event","description":"Receive, process, and store lineage metadata using the [OpenLineage](https://github.com/OpenLineage/OpenLineage/blob/main/spec/OpenLineage.json) standard.","sidebar":"tutorialSidebar"},"api/search":{"id":"api/search","title":"Query all datasets and jobs","description":"Returns one or more datasets and jobs of your query.","sidebar":"tutorialSidebar"},"api/start-run":{"id":"api/start-run","title":"Start a run","description":"Marks the run as `RUNNING`.","sidebar":"tutorialSidebar"},"deployment/deployment":{"id":"deployment/deployment","title":"Deployment Overview","description":"Helm Chart","sidebar":"tutorialSidebar"},"deployment/running-on-aws":{"id":"deployment/running-on-aws","title":"Running Marquez on AWS","description":"This guide helps you deploy and manage Marquez on AWS EKS.","sidebar":"tutorialSidebar"},"faq":{"id":"faq","title":"Frequently Asked Questions","description":"- How to write Marquez API logs to log file?","sidebar":"tutorialSidebar"},"quickstart/index":{"id":"quickstart/index","title":"Quickstart","description":"Table of Contents","sidebar":"tutorialSidebar"}}}')}}]);