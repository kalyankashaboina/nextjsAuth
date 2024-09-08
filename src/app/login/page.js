"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utilis/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log("Successful login:", res.user);
      router.push("/"); // Navigate to home page on successful login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (user) {
    router.push("/"); // Redirect if already logged in
    return null; // Avoid rendering the login button if already logged in
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Logo"
            width={24} // Adjust width
            height={24} // Adjust height
            className="mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
