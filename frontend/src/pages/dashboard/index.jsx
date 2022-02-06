import Link from "next/link";

export default function Page() {
    return(
        <>
            Bem vindo!
            <br />
            <Link href='/dashboard/logout'>Logout</Link>
        </>
    );
}