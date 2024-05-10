/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-mutable-exports */
import { MongoClient } from "mongodb";

declare const global: {
    _mongoClientPromise?: Promise<MongoClient>;
};

const uri: string | undefined = process.env.MONGODB_URL;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

if (!process.env.MONGODB_URL) {
    throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri!, options as any);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri!, options as any);
    clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
