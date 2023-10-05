
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
// import { client } from '../utils/constants';
import { ddbDocClient ,tableName} from '../../utils/constants.mjs';
// const endpoint = "https://8000-rohitojha10-awsrestapi-ktc6f4souaw.ws-us105.gitpod.io"
// const client = new DynamoDBClient({
//     endpoint
// });
// const ddbDocClient = DynamoDBDocumentClient.from(client);

export const getAllItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);
    var params = {
        TableName : tableName
    };

    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        var items = data.Items;
        const response = {
            statusCode: 200,
            body: JSON.stringify(items)
        };
        return response
    } catch (err) {
        console.log('***********************')
        console.log("Error", err);
        const response = {
            statusCode: 500,
            body: JSON.stringify({message:"some error occured"})
        };
        return response
    }


}
