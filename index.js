const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')
const api = new ApiBuilder()
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const uuid = require('uuid/v4')

const TABLENAME = 'icecreams'

api.post(
  '/icecreams',
  request => {
    const params = {
      TableName: TABLENAME,
      Item: {
        icecreamid: uuid(),
        name: request.body.name
      }
    }
    return dynamoDb.put(params).promise()
  },
  { success: 201 }
)

api.get('/icecreams', request => {
  return dynamoDb
    .scan({ TableName: TABLENAME })
    .promise()
    .then(response => response.Items)
})

module.exports = api
