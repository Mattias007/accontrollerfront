'use client'
 
import { login } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
export default function Page() {
  const [errorMessage, dispatch] = useFormState(login, undefined)


  return (
    <form className='flex flex-col p-4 w-2/5 border border-gray-200 rounded gap-4 min-w-64 max-w-80' action={dispatch}>
      <input className='p-2 border border-gray-200 rounded' type="username" name="username" placeholder="Username" required />
      <input className='p-2 border border-gray-200 rounded' type="password" name="password" placeholder="Password" required />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <LoginButton />
    </form>
  )
}
 
function LoginButton() {
 
  return (
    <button className='bg-sky-500 rounded p-2 hover:bg-sky-400' type="submit">
      Login
    </button>
  )
}