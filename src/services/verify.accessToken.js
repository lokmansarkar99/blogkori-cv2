export async function isUser() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("accessToken")?.value;

    //  Check if token exists
    if (!token) {
      return {
        success: false,
        message: "No access token"
      };
    }

    // Verify token
    const user = jwt.verify(token, process.env.ACCESS_SECRET);
    return { success: true, user };
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return {
      success: false,
      message: "JWT verification failed"
    };
  }
}
