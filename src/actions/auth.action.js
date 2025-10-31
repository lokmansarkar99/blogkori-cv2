"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    console.log('🔐 [SERVER ACTION] Login attempt for:', email);

    // Call backend API
    const response = await fetch(`${process.env.NEXT_APP_SERVER}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log('📡 [SERVER ACTION] Backend response:', { success: data.success, hasToken: !!data.accessToken });

    if (!response.ok || !data?.success) {
      return { 
        success: false, 
        message: data?.message || 'Login failed' 
      };
    }

    //  Set cookie on Next.js SERVER (not backend!)
    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === 'production';
    
    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 24 * 60 * 60
    });

    console.log('🍪 [SERVER ACTION] Cookie set on Next.js server');

    //  Server-side redirect (no timing issues!)
    console.log('🚀 [SERVER ACTION] Redirecting to:', data.user?.role === "admin" ? "/admin" : "/user");
    
    if (data.user?.role === "admin") {
      redirect("/admin");
    } else {
      redirect("/user");
    }

  } catch (error) {
    console.error('❌ [SERVER ACTION] Login error:', error);
    return { 
      success: false, 
      message: error.message || 'An error occurred' 
    };
  }
}
