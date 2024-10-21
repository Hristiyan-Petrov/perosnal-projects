import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: '400' });

export default function Loading() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <i className="fa-solid fa-spinner text-slate-800 animate-spin text-4xl sm:text-6xl"></i>
        </div>
    )
}