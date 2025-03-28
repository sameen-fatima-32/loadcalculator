import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/loadCalculator"); // Redirect to Load Calculator
  }, []);

  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold text-blue-600">Redirecting...</h1>
      <p>If you are not redirected, <a href="/loadCalculator" className="text-blue-500 underline">click here</a>.</p>
    </div>
  );
}
