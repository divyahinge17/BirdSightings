"use client;"
import Link from 'next/link';
import Login from './login/page';

export default function Home() {
  return (
    <div>
      <Login></Login>
      <Link href="/desktop/location">Location</Link>
{/* <Link href="/desktop/location">Location</Link><br></br>
<Link href="/login">Login</Link><br></br>
<Link href="/signup">SignUp</Link>
<Link href="/desktop/birds">SearchBird</Link> */}
    </div>
  );
}
