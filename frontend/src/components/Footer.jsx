import React from "react";
import { assets } from "../assets/assets";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-24 text-white">
      {/* Main Grid */}
      
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-14 border-b border-gray-600 pb-14">
        {/* About Section */}
        <div className=" space-y-6">
          <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
          <p className="text-sm text-gray-400 leading-relaxed">
            Discover movies, book tickets, and enjoy cinema like never before. From new releases to trending hits — MovieFlix brings theaters to your fingertips.
          </p>
          <div className="flex gap-4">
            <img src={assets.googlePlay} alt="Google Play" className="h-10 w-auto hover:scale-105 transition-transform" />
            <img src={assets.appStore} alt="App Store" className="h-10 w-auto hover:scale-105 transition-transform" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition">FAQs</a></li>
          </ul>
        </div>

        {/* Genres / Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Top Genres</h3>
          <ul className="text-sm space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Action</a></li>
            <li><a href="#" className="hover:text-white transition">Drama</a></li>
            <li><a href="#" className="hover:text-white transition">Thriller</a></li>
            <li><a href="#" className="hover:text-white transition">Comedy</a></li>
            <li><a href="#" className="hover:text-white transition">Sci-Fi</a></li>
          </ul>
        </div>

        {/* Contact + QR */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <ul className="text-sm space-y-3 text-gray-400">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 9861669622</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@movieflix.com</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Bhubaneswar, India</li>
          </ul>
          <img
            src="/qr.png"
            alt="QR Code"
            className="w-28 h-28 mt-4 border border-gray-600 rounded-md"
          />
        </div>
      </div>

      {/* Social & Newsletter */}
      <div className="mt-12  flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-700 pb-10">
        <div className="flex items-center gap-5">
          <a href="#"><Facebook className="w-5 h-5 hover:text-primary transition" /></a>
          <a href="#"><Twitter className="w-5 h-5 hover:text-primary transition" /></a>
          <a href="#"><Instagram className="w-5 h-5 hover:text-primary transition" /></a>
          <a href="#"><Youtube className="w-5 h-5 hover:text-primary transition" /></a>
        </div>
        <form className="flex  items-center bg-white/10 border border-gray-600 rounded-full overflow-hidden">
          <input
            type="email"
            placeholder="Subscribe for updates"
            className="px-2 py-2 bg-transparent text-sm text-gray-200 placeholder-gray-400 outline-none flex-grow"
          />
          <button
            type="submit"
            className="bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dull transition"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-500 pb-6 gap-2">
        <p>© {new Date().getFullYear()} <span className="font-semibold text-white">MovieFlix</span>. All Rights Reserved.</p>
        <p className="text-xs">Powered by Codex | Designed by Yogesh</p>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-dull p-2 rounded-full text-white shadow-md transition"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
};

export default Footer;
