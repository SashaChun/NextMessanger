export default async function getSession() {
    const { getServerSession } = await import("next-auth");
    const { getAuthOptions } = await import("../libe/authOptions.js");
    const authOptions = await getAuthOptions();
    return await getServerSession(authOptions);
}