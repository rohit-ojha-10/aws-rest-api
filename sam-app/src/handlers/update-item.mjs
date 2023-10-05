
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand ,UpdateCommand} from '@aws-sdk/lib-dynamodb';
import { check_if_user_exists, ddbDocClient,tableName } from '../../utils/constants.mjs';
// const endpoint = "https://8000-rohitojha10-awsrestapi-ktc6f4souaw.ws-us105.gitpod.io"
// const client = new DynamoDBClient({
//   endpoint
// });
// const ddbDocClient = DynamoDBDocumentClient.from(client);



export const updateByIdHandler = async (event) => {
  if (event.httpMethod !== 'PUT') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info('received:', event);
 
  const id = Number(event.pathParameters.id);
  const body = JSON.parse(event.body);
  const name = body.first_name;

  const command = new UpdateCommand({
    TableName: "USERS",
    Key: {
      id: id,
    },
    UpdateExpression: `set first_name = :first_name`,
    ExpressionAttributeValues: {
      ":first_name": name,
    },
    ReturnValues: "ALL_NEW",
  });
  var search_params = {
    TableName : tableName,
    Key: { id: id },
  };
  try {
    const data = await ddbDocClient.send(command);
    if(await !check_if_user_exists(search_params))
    {
        const response = {
            statusCode: 500,
            body: JSON.stringify({message:"User doesn't exists"})
          };
          return response
    }
    console.log("Updated Successfully!",data)
    const response = {
        statusCode: 200,
        body: JSON.stringify({message:"Updated successfully"})
      };
      return response
  } catch (err) {
    const response = {
        statusCode: 500,
        body: JSON.stringify({message:"Some error occured"})
      };
      console.log("Error", err);
      return response
  }
 
}
