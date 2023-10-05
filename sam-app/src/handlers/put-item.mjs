
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand ,GetCommand} from '@aws-sdk/lib-dynamodb';
import { ddbDocClient,tableName ,check_if_user_exists} from '../../utils/constants.mjs';
// const endpoint = "https://8000-rohitojha10-awsrestapi-ktc6f4souaw.ws-us105.gitpod.io"
// const client = new DynamoDBClient({
//     endpoint
// });
// const ddbDocClient = DynamoDBDocumentClient.from(client);


export const putItemHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    console.info('received:', event);

    const body = JSON.parse(event.body);
    const id = body.id;
    const name = body.first_name;


    var params = {
        TableName : tableName,
        Item: { id : id, first_name: name }
    };
    var search_params = {
        TableName : tableName,
        Key: { id: id },
      };
    try {
        // const check = await ddbDocClient.send(new GetCommand(search_params));
        if(await check_if_user_exists(search_params))
        {
            const response = {
                statusCode: 500,
                body: JSON.stringify({message:"User already exists"})
              };
              return response
        }
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log("Success - item added", data);
        const response = {
            statusCode: 200,
            body: JSON.stringify({message:"Success - item added or updated"})
          };
          return response
      } catch (err) {
          console.log("Error", err.stack);
          const response = {
            statusCode: 500,
            body: JSON.stringify({message:"An error occured"})
          };
          return response
      }

};
