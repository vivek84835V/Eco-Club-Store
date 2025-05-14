import "../styles/globals.css";  // Global styles
import "../app/globals.css";     // App-specific styles
import Navbar from "../components/Navbar";  // Navbar component
import Carousel from "@/components/Caraousel";  // Carousel component (optional)

export const metadata = {
  title: "SouledStore Clone",  // Metadata for the page
  description: "Stylish store made with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Include any other meta tags, links for favicon, etc. */}
      </head>
      <body className="bg-white text-gray-900 font-sans">
        {/* Navbar component */}
        <Navbar />

        {/* Carousel component (could be added on specific pages)
        <Carousel /> */}

        {/* Main content */}
        <main className="min-h-screen bg-gray-50">{children}</main>

        {/* Optionally include Footer */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
