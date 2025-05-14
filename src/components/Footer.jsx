"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-gray-300 px-6 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 border-b border-neutral-700 pb-10">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Returns & Exchanges</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/order-status" className="hover:text-white transition">Order Status</Link></li>
              <li><Link href="/size-guide" className="hover:text-white transition">Size Guide</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              {[
                { href: "https:#", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", alt: "Facebook" },
                { href: "https:#", src: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg", alt: "Instagram" },
                
              ].map((icon) => (
                <a key={icon.alt} href={icon.href} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <img src={icon.src} alt={icon.alt} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 The Souled Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
