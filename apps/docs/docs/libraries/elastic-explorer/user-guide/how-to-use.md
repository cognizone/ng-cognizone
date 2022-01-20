---
id: "How-to-use"
title: "How to use"
sidebar_label: "How to use"
sidebar_position: 2
custom_edit_url: null
---

Here is a basic tutorial on how to use the application.

## Querying an Elasticsearch cluster

### Elasticsearch Cluster Selection
 
Once the user has access to the application, there is an elastic cluster selection section in the top left part of the page. At first, there is no elastic cluster configured, but it can be easily configured by clicking on the "settings" button on the same part of the screen. In the opened dialog, the user can either:

- Click on the "plus" button to add a new Elastic cluster configuration. The only required part is the url of that cluster, the user can also provide a label for ease of use.

- Click on the "download" button to download the current list of instances as a json configuration file.

- Click on the "upload" button to upload a json file representing the list of elastic instances to be used by the app.

  List of elastic instances can be accessed [here](https://www.notion.so/cognizone/Developers-corner-6fd5e2ad3a4b462aa03ecba1525fb7c1#1519a1fe4b7b4d4695842c30acd57126)
  
  Here is a sample JSON - 

  ```json
  [
    {
      "url":"http://localhost:9200",
      "label":"dev"
    }
  ]
  ```
  
- Edit or delete any existing Elastic cluster definition.

  [![jsonfileupload](/elastic-explorer/img/jsonUpload.png)](/elastic-explorer/img/jsonUpload.png)

- When the user selects an Elastic cluster url, the available indexes list gets updated automatically. It is to be noted that it is not mandatory to select an index to start searching on a cluster, but it's advised to nonetheless.
  
  [![index](/elastic-explorer/img/index.png)](/elastic-explorer/img/index.png)

---

### Filtering

Right below the "Elastic cluster selection" part, the Filter section allows the user to fill multiple inputs to construct a query that will run against the selected cluster. It has to be noted, that these fields are tightly linked to the "Hal-ed TypedResource" model that we use at Cognizone. If you are not looking for similar data, you should directly use the "manual mode" (more information below).

#### Filter by uri

Users can filter data based on the uri of the elastic document. Depending on the mapping configuration of the Elastic cluster, this field might also do partial matches. So the equivalent of what is typed in the image below could just be `curia/20195271`. (this field is targeting `data.uri`)

[![uri](/elastic-explorer/img/uriFilter.png)](/elastic-explorer/img/uriFilter.png)

#### Filter by type

Users can filter data based on the available types (this is targeting the `data.type` attribute).

[![types](/elastic-explorer/img/multipleTypes.png)](/elastic-explorer/img/multipleTypes.png)

#### Filter by included

Users can filter data based on the included uris or types within the elastic document. (this field is targeting `included.uri`)

[![included](/elastic-explorer/img/included.png)](/elastic-explorer/img/included.png)

#### Filter by facets

Users can filter data based on the value in the facet. It targets all the fields in `facets`, and should return a document where at least one facet attribute matches the query.

[![facets](/elastic-explorer/img/facets.png)](/elastic-explorer/img/facets.png)

- There are 2 additional options that have been adapted in the filters section,

#### Manual Mode

The user can modify the existing query that is generated on the selection of the filters and the query can be updated to create more complex conditions as per the need of the user.

[![manualMode](/elastic-explorer/img/manualMode.png)](/elastic-explorer/img/manualMode.png)

#### Enable full text search

Provides the ability to toggle a soft full-text search for the other fields in the filters.

---

### Result

On selection of the elastic url and index, all the elastic documents are loaded that comprises of properties like index, uri, type, and label which can be viewed in a tabular format(by default), along with 2 more view types like structured and raw(similar to elastichead), discussed in the below sections. It must be noted that "label" is not really a set property, but the app tries to find the first attribute that could pass as a label for the fetched document (one of the rules to find such label is to find a property name that contains "title" for example).


The data can be viewed in the 3 different modes -

#### Tabular view

On selection of the elastic document, a popup window appears on which a keyword search is possible, it makes it easier for the user to look for a property within the document.
The tabular view also has pagination parameters that can be modified to view multiple elastic documents.
 
[![table](/elastic-explorer/img/table.png)](/elastic-explorer/img/table.png)

#### Structured view
    
Elastic documents can be viewed in a structured format.

[![structured](/elastic-explorer/img/structured.png)](/elastic-explorer/img/structured.png)

#### Raw view 
    
Elastic documents can be viewed in a raw format similar to elastic head

[![raw](/elastic-explorer/img/rawFormat.png)](/elastic-explorer/img/rawFormat.png)


---


### Documents detail view

On the table view, the user can now access these elastic documents and see the data in 3 different data formats. When the user clicks on an elastic document, this will open a popup that allows the user to search by Uri or a keyword.


#### Raw view

The user can view the raw data of the selected elastic document, whatever its \_source looks like.


[![rawData](/elastic-explorer/img/rawData.png)](/elastic-explorer/img/rawData.png)

#### JsonModelFlatGraph view

This view is available only if the document contains a "Hal-ed TypedResource". The user can view all the models available in an elastic document, so viewing complex data within the document is simplified and is a handy feature for developers and project managers.

[![jsonModelFlatGraph](/elastic-explorer/img/jsonModelFlatGraph.png)](/elastic-explorer/img/jsonModelFlatGraph.png)

#### JsonModel view

This view is available only if the document contains a "Hal-ed TypedResource". The user can view the elastic document where the graphs are transformed to JsonModel, inspired by json-ld, where the graph is unflattened so the reference to other nodes is directly the node that you are looking for.

[![jsonModel](/elastic-explorer/img/jsonModel.png)](/elastic-explorer/img/jsonModel.png)

---

### Searching through the document

Search by URI and search by keyword is possible within the elastic document, so if a user is looking for a term within a node or a term in facets, the result can be obtained. The search takes place on every keystroke.

[![searchByUri](/elastic-explorer/img/searchByUri.png)](/elastic-explorer/img/searchByUri.png)

[![searchByKeyword](/elastic-explorer/img/searchByKeyword.png)](/elastic-explorer/img/searchByKeyword.png)

---

## Data Validation

Accessible through the associated button on the toolbar of the app, this section can be used to look for errors that are present in the elastic document that can be downloaded in a .csv format.
To generate the report, click on the generate report button at the top right corner of the table.

[![dataValidation](/elastic-explorer/img/dataValidation.png)](/elastic-explorer/img/dataValidation.png)

---

## Sharing
Most pages can be shared using the share button at the bottom right of the screen. This is done to put in the clipboard a "share-friendly" url that can be clicked by other people who currently have the app installed and have enabled protocol handling (as seen in the installation part of this guide).
This is done because the host part of the url for this extension changes from user to user, so urls copied directly from the browser's bar cannot be used by other users (or not without some tweaking).
