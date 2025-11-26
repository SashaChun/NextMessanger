export async function getAuthOptions() {
    const { default: CredentialsProvider } = await import('next-auth/providers/credentials');
    
    return {
        providers: [
            CredentialsProvider({
                name: 'credentials',
                credentials: {
                    email: { label: 'Email', type: 'text' },
                    password: { label: 'Password', type: 'password' },
                },
                async authorize(credentials) {
                    const bcrypt = await import('bcryptjs');
                    const { default: prisma } = await import('./prismadb.js');
                    
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Invalid Credentials');
                    }

                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    });

                    if (!user || !user.hashedPassword) {
                        throw new Error('Invalid Credentials');
                    }

                    const isCorrectPassword = await bcrypt.compare(
                        credentials.password,
                        user.hashedPassword
                    );

                    if (!isCorrectPassword) {
                        throw new Error('Invalid Credentials');
                    }

                    return user;
                },
            }),
        ],
        debug: process.env.NODE_ENV === 'development',
        session: { strategy: 'jwt' },
        pages: {
            signIn: '/',
        },
        secret: process.env.NEXTAUTH_SECRET,
    };
}
