import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/app/models/User";
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../libs/mongoConnect"
 
 const authOptions = ({

    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
     providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: 'test@example.com'},
                password: {label: 'Password', type: 'password', placeholder: '123ABCdef@.'},
            },
    
            async authorize(credentials, req)
            {
                const {email, password} = credentials;   
                await mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({email});          
                const passwordOK = user && bcrypt.compareSync(password, user.password);  
                    if (passwordOK) {
                        return user;
                    }   
                return null
            }
        })
     ],
     session: {
        jwt: true, // Ensure JWT sessions are enabled
      },
      jwt: {
        secret: process.env.SECRET, // Ensure this is set
      },
        
    });

const handler = NextAuth(authOptions);
// export {  authOptions}
export {handler as GET, handler as POST}