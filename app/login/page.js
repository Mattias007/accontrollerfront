import LoginForm from "@/components/loginform";
 

export default function Home(logedin) {


return (  
    <main className="flex justify-center min-h-screen flex-col items-center">
      <h1 className="">PLZ LOG IN</h1>
      <LoginForm />
    </main>
  );
}
