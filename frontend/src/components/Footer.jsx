import React from 'react'
import { assets } from '../assets/assets'
import {
  Facebook, Twitter, Instagram, Youtube, Mail, Phone, Send
} from 'lucide-react'

const Footer = () => {
  return (
    <footer
      className="relative text-gray-300 pt-20 pb-10 px-6 md:px-16 lg:px-36 overflow-hidden"
   
    >
      {/* dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-sm z-0" />

      {/* top content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-10 border-b border-white/10 pb-14">

        {/* Brand + App Links */}
        <div className="col-span-2">
          <img src={assets.logo} alt="logo" className="w-40 h-auto mb-6" />
          <p className="text-sm text-gray-400 leading-relaxed">
            MovieVerse brings the best movies, shows, and trailers in one place. Watch, explore, and enjoy with us.
          </p>

          <div className="flex gap-3 mt-5">
            <img src={assets.googlePlay} alt="Google Play" className="h-10 w-auto hover:scale-105 transition" />
            <img src={assets.appStore} alt="App Store" className="h-10 w-auto hover:scale-105 transition" />
          </div>

          <div className="flex gap-4 mt-5">
            <a href="#"><Facebook size={20} className="hover:text-white" /></a>
            <a href="#"><Twitter size={20} className="hover:text-white" /></a>
            <a href="#"><Instagram size={20} className="hover:text-white" /></a>
            <a href="#"><Youtube size={20} className="hover:text-white" /></a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">Press</a></li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">Browse Movies</a></li>
            <li><a href="#" className="hover:text-white transition">New Releases</a></li>
            <li><a href="#" className="hover:text-white transition">Top Rated</a></li>
            <li><a href="#" className="hover:text-white transition">TV Series</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={16} /> help@movieverse.com</li>
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Report Bug</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-5 mt-12">
          <h3 className="text-white font-semibold text-xl mb-4 text-center">Subscribe to our Newsletter</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-1/3 px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dull transition">
              Subscribe <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <p className="relative z-10 mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MovieVerse. Made with ❤️ by GreatStack.
      </p>
    </footer>
  );
};

export default Footer;
