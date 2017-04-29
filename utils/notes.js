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

// Lesson 3: Add data to Elasticsearch
// adding or saving data is called indexing





