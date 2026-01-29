import { SignIn } from "@clerk/clerk-react";

export default function Login() {
    return (
       <div className="h-screen hero">
        <SignIn></SignIn>
       </div> 
    );
}