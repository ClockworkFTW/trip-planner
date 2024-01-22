import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const { signOut } = useClerk();
  const router = useRouter();

  function handleSignOut() {
    signOut(() => router.push("/"));
  }

  return <button onClick={handleSignOut}>Sign out</button>;
}
