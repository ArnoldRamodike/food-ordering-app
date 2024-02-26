import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({

 providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            username: {label: 'Email', type: 'email', placeholder: 'test@example.com'},
            password: {label: 'Password', type: 'password', placeholder: '123ABCdef@.'},
        },

        async authorize(credentials, req)
        {
            const res = await fetch('/../', {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {"Content-Type": "application/json"}
            })

            const user = await res.json()

            if (res.ok && user) {
                return user
            }
            return null
        }
    })
 ]
    
});

export {}