import PocketBase from "pocketbase";

export const API_URL = import.meta.env.VITE_API_URL;

const pocketClient = new PocketBase(API_URL);

pocketClient.autoCancellation(false);

export default pocketClient;
