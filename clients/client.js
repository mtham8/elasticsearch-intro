const ELASTICSEARCH = require('elasticsearch')
const CLIENT = new ELASTICSEARCH.Client({
  host: 'localhost:9200',
  apiVersion: '5.0'
})
// by default client grabs the latest ElasticSearch version

CLIENT.get({
  index: 'simpsons',
  type: 'episode',
  id: 9,
  _sourceExclude: [
    'video_url',
    'image_url'
  ]
})
.then(resp => {
  console.log('resp --> ', resp)
})
.catch(err => {
  console.log('err --> ', err)
})

