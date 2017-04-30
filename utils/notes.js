// Lesson 1: Get data from Elasticsearch by id using http

// pretty print data:
// curl -s http://localhost:9200/simpsons/episode/1/_source | jq . 

// url structure:
// <base_url>/<index>/<type>/<id>/_source

// version gets incremented everytime the document is updated

// _source == data
// adding _source to the url params will give you the data directly

// _source?_source_exclude=video_url
// _source_exclude --> will exclude a particular key in the object returned
// adding commas to chain keys to exclude

// _source_include= (same as _source_exclude by opposite functionality)

________________________________________

// Lesson 3: Add data to Elasticsearch
// adding or saving data is called indexing

// curl -XPUT -d '{ "title": "Add data to elasticsearch", "summary": "Learn to index into elasticsearch", "views": 1000 }' localhost:9200/egghead/lessons/3
// result: 
// { 
//   "_index":"egghead", 
//   "_type":"lessons", 
//   "_id":"3", 
//   "_version":1, 
//   "result":"created", 
//   "_shards":{ "total":2, "successful":1, "failed":0 },
//   "created":true 
// }

// curl -XPOST -d '{ "title": "Add some more data", "summary": "Lots of data to add", "views": 12}' localhost:9200/egghead/lessons
// result: 
// { 
//   "_index":"egghead", 
//   "_type":"lessons", 
//   "_id":"AVu7u1kGWC-ViHj1gB1D", 
//   "_version":1, 
//   "result":"created", 
//   "_shards":{ "total":2, "successful":1, "failed":0 },
//   "created":true 
// }
// _id is guranteed to be unique

// curl -i -XPUT -d '{ "title": "Error handling in elasticsearch, "summary": "Error handling is for wimps", "views": 1000 }' localhost:9200/egghead/lessons/3?op_type=create
// adding /op_type=create makes sure you are not overriding an existing document
// or use /_create

________________________________________

// Lesson 4: Update data in elasticsearch

// documents in elasticsearch is immutable - they have to either be reindexed or replaced

// update existing document
// curl -XPOST -d '{ "doc": { "views": 1001, "tags": ["elasticsearch"]}}' localhost:9200/egghead/lessons/3/_update
// result: 
// {
//   "_index": "egghead",
//   "_type": "lessons",
//   "_id": "3",
//   "_version": 2,
//   "found": true,
//   "_source": {
//     "title": "Add data to elasticsearch",
//     "summary": "Learn to index into elasticsearch",
//     "views": 1001,
//     "tags": [
//       "elasticsearch"
//     ]
//   }
// }

// you cannot just add values to an array, not an object in elasticsearch
// to update an array, you need to update the array with old + new values

//curl -XPOST -d '{ "doc": { "tags": ["data", "elasticsearch"]}}' localhost:9200/egghead/lessons/3/_update
// result:
// {
//   "_index": "egghead",
//   "_type": "lessons",
//   "_id": "3",
//   "_version": 4,
//   "found": true,
//   "_source": {
//     "title": "Add data to elasticsearch",
//     "summary": "Learn to index into elasticsearch",
//     "views": 1001,
//     "tags": [
//       "data",
//       "elasticsearch"
//     ]
//   }
// }

// update using script:
// curl -XPOST -d '{ "script": "ctx._source.views +=1" }' localhost:9200/egghead/lessons/3/_update
// result:
// {
//   "_index": "egghead",
//   "_type": "lessons",
//   "_id": "3",
//   "_version": 5,
//   "found": true,
//   "_source": {
//     "title": "Add data to elasticsearch",
//     "summary": "Learn to index into elasticsearch",
//     "views": 1002,
//     "tags": [
//       "data",
//       "elasticsearch"
//     ]
//   }
// }

// there is a perfomance hit -- update document directly than using scripts
// updating happens on the same shard, with no network latency - checks version to make sure it's the same version

// tell elasticsearch to retry, it will check for version number and retry if the version number changes before writing back
// curl -XPOST -d '{"script": "ctx._source.views += 1" }' localhost:9200/egghead/lessons/3/_update?retry_on_conflict=5
































