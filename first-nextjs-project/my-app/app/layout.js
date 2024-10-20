import { Fugaz_One, Open_Sans } from "next/font/google"
import localFont from "next/font/local";
import "./globals.css";
import Main from "@/components/Main";

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
			<h1 className={'text-base sm:text-lg textGradient ' + fugaz.className}>FeelingFlow</h1>
		</header>
	);

	const footer = (
		<footer className="p-4 sm:p-8 ">
			Footer
		</footer>
	);

	return (
		<html lang="en">
			<body
				className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ' + opensans.className}
			>
				{header}
				<Main>
					{children}
				</Main>
				{footer}
			</body>
		</html>
	);
}
