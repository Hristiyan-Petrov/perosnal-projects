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

export const metadata = {
	title: "Broodl",
	description: "Track your daily mood.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
			// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<header>Header</header>
				<Main>
					{children}
				</Main>
				<footer>Footer@</footer>
			</body>
		</html>
	);
}
