
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand ,DeleteCommand} from '@aws-sdk/lib-dynamodb';
import { check_if_user_exists, ddbDocClient ,tableName} from '../../utils/constants.mjs';
// const endpoint = "https://8000-rohitojha10-awsrestapi-ktc6f4souaw.ws-us105.gitpod.io"
// const client = new DynamoDBClient({
//   endpoint
// });


export const deleteByIdHandler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info('received:', event);
 
  const id = Number(event.pathParameters.id);
 

  var params = {
    TableName : tableName,
    Key: { id: id },
  };

  try {
    if(await !check_if_user_exists(params))
    {
        const response = {
            statusCode: 500,
            body: JSON.stringify({message:"User doesn't exist"})
          };
          return response
    }
    const data = await ddbDocClient.send(new DeleteCommand(params));
     console.log("Success - item deleted", data);
     const response = {
        statusCode: 200,
        body: JSON.stringify({message:"Item deleted successfully"})
      };
      return response;
  } catch (err) {
    console.log("Error", err);
    const response = {
        statusCode: 500,
        body: JSON.stringify({message:"Some error occured"})
      };
      return response;
      
  }
 

}
