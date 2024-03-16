'use server'

import { cookies } from "next/headers"
import { redirect } from 'next/navigation'
 
 
export async function login(_currentState, formData) {
  const user = {name : formData.get("username"), pass : formData.get("password")}
    
    if (user.name === process.env.USERNAME && user.pass === process.env.PASS){
      cookies().set('currentUser', 'mattias', { secure: true })
      redirect("/dashboard")


    }else{
      return "Wrong Username/Password"
    }
}

export async function logout() {
  cookies().delete("currentUser")
  redirect("/login")
}
