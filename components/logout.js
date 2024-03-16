 import { logout } from "@/app/lib/actions"

export default function Logout() {

  return (
    <form action={logout}>
        <button type="submit" className="p-2 border border-gray-200 rounded m-2" onClick={logout}>Logout</button>
    </form>
  )
}
 
