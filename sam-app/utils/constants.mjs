import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand ,GetCommand} from '@aws-sdk/lib-dynamodb';
// import { client } from '../utils/constants';
export const endpoint = "https://8000-rohitojha10-awsrestapi-ktc6f4souaw.ws-us105.gitpod.io"
export const client = new DynamoDBClient({
    endpoint
});
export const ddbDocClient = DynamoDBDocumentClient.from(client);
export const tableName = process.env.Table_name;
export const error_response = {
    statusCode: 500,
    body: JSON.stringify({message:"Some error occured"})
}
export const check_if_user_exists = async (search_params) => {
    const check = await ddbDocClient.send(new GetCommand(search_params));
    console.log(check.Item, '--------------')
    if(check.Item)
    return true
    else 
    return false
}