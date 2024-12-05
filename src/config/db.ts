import mongoose from 'mongoose';
import { config } from './env';
export const connectDB = async(): Promise<mongoose.Connection> => {

    /**
   * "Type 'string | undefined' is not assignable to type 'string'"
   * When this error is given use non-null assertion operator "!"
   * at the end of variable. It tells TypeScript that even though
   * something looks like it could be null, it can trust you that it's not
   * Always enable 'runValidators' as true so that update also runs validation
   */
    const dbUri = config.MONGO_URI;
    const database = await mongoose.connect(dbUri);
    database.set('runValidators', true);
    database.connection.on('error', (error) => {
        console.log('Database connection error:', error);
    });
    console.log('Database Connected');
    return database.connection;
};
