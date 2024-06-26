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
  const res = await fetch(`http://85.89.32.58/feed/data.json?id=52&start=-24 hour&end=now&interval=3600&average=0&timeformat=unix&skipmissing=0&limitinterval=0&delta=0&apikey=7bf4e9f0d76c7fd480b1eae9699aaac9 `,{ next: { revalidate: 3600 } })
  return await res.json()
}

export async function graphData2(){
  const res = await fetch(`http://85.89.32.58/feed/data.json?id=53&start=-24 hour&end=now&interval=3600&average=0&timeformat=unix&skipmissing=0&limitinterval=0&delta=0&apikey=7bf4e9f0d76c7fd480b1eae9699aaac9 `,{ next: { revalidate: 3600 } })
  return await res.json()
}


export async function graphData3(){
  const res = await fetch(`http://85.89.32.58/feed/data.json?id=60&start=-24 hour&end=now&interval=3600&average=0&timeformat=unix&skipmissing=0&limitinterval=0&delta=0&apikey=7bf4e9f0d76c7fd480b1eae9699aaac9 `,{ next: { revalidate: 3600 } })
  return await res.json()
}

export async function graphData4(){
  const res = await fetch(`http://85.89.32.58/feed/data.json?id=61&start=-24 hour&end=now&interval=3600&average=0&timeformat=unix&skipmissing=0&limitinterval=0&delta=0&apikey=7bf4e9f0d76c7fd480b1eae9699aaac9 `,{ next: { revalidate: 3600 } })
  return await res.json()
}





