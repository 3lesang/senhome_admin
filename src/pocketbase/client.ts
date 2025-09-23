import PocketBase from "pocketbase";

export const API_KEY = "https://b0m772h91854471.pocketbasecloud.com";

const pocketClient = new PocketBase(API_KEY);

pocketClient.autoCancellation(false);

export default pocketClient;
