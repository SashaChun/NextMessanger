export const dynamic = 'force-dynamic';

async function auth(req, context) {
    const { default: NextAuth } = await import('next-auth');
    const { authOptions } = await import('../../../../../libe/authOptions.js');
    return NextAuth(req, context, authOptions);
}

export { auth as GET, auth as POST };
