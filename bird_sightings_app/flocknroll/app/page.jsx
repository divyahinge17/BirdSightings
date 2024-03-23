import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/login">Login</Link><br></br>
      <Link href="/signup">SignUp</Link>
    </div>
  );
}
