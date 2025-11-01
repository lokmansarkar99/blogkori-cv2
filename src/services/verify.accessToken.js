"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Make sure this import exists

export async function isUser() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("accessToken")?.value;

    // Check if token exists
    if (!token) {
      console.log('❌ [isUser] No token found');
      return {
        success: false,
        message: "No access token",
        isAuthenticated: false
      };
    }

    // Verify token
    const user = jwt.verify(token, process.env.ACCESS_SECRET);
    
    console.log('✅ [isUser] Token verified:', { email: user.email, role: user.role });
    
    return { 
      success: true, 
      user,
      isAuthenticated: true
    };
  } catch (error) {
    console.error('❌ [isUser] JWT verification failed:', error.message);
    
    // Handle specific JWT errors
    if (error.message === "cookies is not defined") {
      console.error('❌ [isUser] CRITICAL: cookies import missing or wrong context');
    }
    
    if (error.name === 'TokenExpiredError') {
      return {
        success: false,
        message: "Token expired",
        isAuthenticated: false
      };
    }
    
    if (error.name === 'JsonWebTokenError') {
      return {
        success: false,
        message: "Invalid token",
        isAuthenticated: false
      };
    }
    
    return {
      success: false,
      message: error.message || "JWT verification failed",
      isAuthenticated: false
    };
  }
}
