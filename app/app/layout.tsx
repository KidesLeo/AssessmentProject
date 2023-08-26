import "./globals.css";
import { Raleway } from "next/font/google";

const ralewayFont = Raleway({ subsets: ["latin"] });

export const metadata = {
    title: "GamerPay Assessment Project",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={ralewayFont.className}>{children}</body>
        </html>
    );
}
