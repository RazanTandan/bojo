// lib/appwrite.ts
import { Client, Account } from 'appwrite';

export const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID; // Export projectId
export const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;     // Export endpoint

if (!projectId || !endpoint) {
  console.error('ERROR: Missing Appwrite environment variables. Please check your .env.local file.');
}

export const client = new Client();

client
    .setEndpoint(endpoint as string)
    .setProject(projectId as string);

console.log('DEBUG: Appwrite Client Initialized With:');
console.log('  Endpoint (from env var):', endpoint); // Log the variable directly
console.log('  Project ID (from env var):', projectId); // Log the variable directly

export const account = new Account(client);