'use client'
 
import { login } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
export default function Page() {
  const [errorMessage, dispatch] = useFormState(login, undefined)


  return (
    <form className='flex flex-col p-4 w-2/5 bg-white shadow rounded-lg gap-4 min-w-64 max-w-80' action={dispatch}>
      <input className='p-2 border shadow border-gray-200 rounded-md' type="username" name="username" placeholder="Username" required />
      <input className='p-2 border shadow border-gray-200 rounded-md' type="password" name="password" placeholder="Password" required />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <LoginButton />
    </form>
  )
}
 
function LoginButton() {
 
  return (
    <button className='bg-sky-400 rounded text-white shadow p-2 hover:bg-sky-500' type="submit">
      Login
    </button>
  )
}