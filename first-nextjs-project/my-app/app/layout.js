import { Fugaz_One, Open_Sans } from "next/font/google"
import localFont from "next/font/local";
import "./globals.css";
import Main from "@/components/Main";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const fugaz = Fugaz_One({ subsets: ["latin"], weight: '400' });
const opensans = Open_Sans({ subsets: ["latin"], weight: '400' });

export const metadata = {
	title: "FeelingFlow",
	description: "Track your daily mood.",
};

export default function RootLayout({ children }) {
	const header = (
		<header className="p-4 sm:p-8 flex items-center justify-between gap-4">
			<Link href={'/'}>
				<h1 className={'text-base sm:text-lg textGradient ' + fugaz.className}>FeelingFlow</h1>
			</Link>
			<div className="flex itemss-center justify-between">
				PLACEHOLDER CTA || STATS
			</div>
		</header>
	);

	const footer = (
		<footer className="p-4 sm:p-8 ">
			<p className={'text-indigo-500 grid place-items-center ' + fugaz.className}>Created with NextJS</p>
		</footer>
	);

	return (
		<html lang="en">
			<AuthProvider>

				<body
					className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ' + opensans.className}
				>
					{header}
					<Main>
						{children}
					</Main>
					{footer}
				</body>
			</AuthProvider>
		</html>
	);
}
