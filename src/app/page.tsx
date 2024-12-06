import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
     Click <Link href={`/documents/ids`}>here</Link> go to document id
    </div >
  );
}
