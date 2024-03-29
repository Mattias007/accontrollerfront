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

export async function graphData(){
  const res = await fetch(`http://85.89.32.58/feed/data.json?id=52&start=-1 hour&end=now&interval=10&average=0&timeformat=unix&skipmissing=0&limitinterval=0&delta=0&apikey=7bf4e9f0d76c7fd480b1eae9699aaac9 `)
  return await res.json()
}

export async function graphData2(){
  const res = await fetch(`http://85.89.32.58/feed/data.json?id=53&start=-1 hour&end=now&interval=10&average=0&timeformat=unix&skipmissing=0&limitinterval=0&delta=0&apikey=7bf4e9f0d76c7fd480b1eae9699aaac9 `)
  return await res.json()
}



