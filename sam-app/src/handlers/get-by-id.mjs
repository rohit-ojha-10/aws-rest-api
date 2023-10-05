
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient,tableName } from '../../utils/constants.mjs';
// const endpoint = "https://8000-rohitojha10-awsrestapi-ktc6f4souaw.ws-us105.gitpod.io"
// const client = new DynamoDBClient({
//   endpoint
// });
// const ddbDocClient = DynamoDBDocumentClient.from(client);

export const getByIdHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info('received:', event);
 
  const id = Number(event.pathParameters.id);
 
  var params = {
    TableName : tableName,
    Key: { id: id },
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    var item = data.Item;
    if(!item)
    {
      const response = {
          statusCode: 500,
          body: JSON.stringify({message:"User doesn't exist"})
        };
        return response
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(item)
    };
    return response;
  } catch (err) {
    console.log("Error", err);
    const response = {
      statusCode: 500,
      body: JSON.stringify({message:"Some error occured"})
    };
    return response
  }
 

}
