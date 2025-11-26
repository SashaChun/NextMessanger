export const dynamic = 'force-dynamic';

async function handler(req, context) {
    const { default: NextAuth } = await import('next-auth');
    const { getAuthOptions } = await import('../../../../../libe/authOptions.js');
    const authOptions = await getAuthOptions();
    return NextAuth(authOptions)(req, context);
}

export { handler as GET, handler as POST };
