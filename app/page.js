import LoginForm from "@/components/loginform";
 

export default function Home(logedin) {


return (  
  <main className="flex justify-center min-h-screen items-center">
    <h1>Welcome to AC Controll Web Page</h1>
      <LoginForm />
    </main>
  );
}
