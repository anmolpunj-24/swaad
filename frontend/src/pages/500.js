import Link from "next/link";

export default function Custom500() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F5ED] px-6">
      <div className="text-center">
        <p className="text-8xl font-semibold tracking-tight text-[#463421]">
          500
        </p>

        <h1 className="mt-4 text-3xl font-semibold text-[#2A2622]">
          Something went wrong
        </h1>

        <p className="mt-3 text-[#806C52]">
          We couldn't process your request. Please try again.
        </p>

        <Link
          href="/dashboard"
          className="mt-7 inline-block rounded-full bg-[#463421] px-6 py-3 text-[#FFF8E7] transition hover:bg-[#59432C]"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}