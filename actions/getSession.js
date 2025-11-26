export default async function getSession() {
    const { getServerSession } = await import("next-auth");
    const { authOptions } = await import("../libe/authOptions.js");
    return await getServerSession(authOptions);
}