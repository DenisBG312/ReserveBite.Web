import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-acent text-gray-400 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Footer Links Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* ReserveBite Column */}
          <div className="md:col-span-1">
            <h3 className="text-secondary font-bold text-2xl mb-4">ReserveBite</h3>
            <p className="text-white text-sm">
              Fast, simple, and convenient restaurant reservations. ReserveBite
              helps you find your perfect table anytime, anywhere.
            </p>
          </div>

          {/* Product Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul>
              <li className="mb-2">
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a href="#security" className="hover:text-white">
                  Security
                </a>
              </li>
              <li className="mb-2">
                <a href="#business" className="hover:text-white">
                  Business
                </a>
              </li>
              <li className="mb-2">
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#resources" className="hover:text-white">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul>
              <li className="mb-2">
                <a href="#developer" className="hover:text-white">
                  Developer
                </a>
              </li>
              <li className="mb-2">
                <a href="#api" className="hover:text-white">
                  API
                </a>
              </li>
              <li className="mb-2">
                <a href="#partners" className="hover:text-white">
                  Partners
                </a>
              </li>
              <li className="mb-2">
                <a href="#github-desktop" className="hover:text-white">
                  GitHub Desktop
                </a>
              </li>
              <li>
                <a href="#atom" className="hover:text-white">
                  Atom
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul>
              <li className="mb-2">
                <a href="#help" className="hover:text-white">
                  Help
                </a>
              </li>
              <li className="mb-2">
                <a href="#community" className="hover:text-white">
                  Community
                </a>
              </li>
              <li className="mb-2">
                <a href="#forum" className="hover:text-white">
                  Forum
                </a>
              </li>
              <li className="mb-2">
                <a href="#training" className="hover:text-white">
                  Training
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul>
              <li className="mb-2">
                <a href="#about" className="hover:text-white">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#blog" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a href="#careers" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li className="mb-2">
                <a href="#press" className="hover:text-white">
                  Press
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white">
                  Shop
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center border-t border-gray-600 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Copyright */}
          <p className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} <span className="text-white">ReserveBite</span>. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6 text-lg">
            <motion.a
              href="#twitter"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-twitter"></i>
            </motion.a>
            <motion.a
              href="#facebook"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-facebook-f"></i>
            </motion.a>
            <motion.a
              href="#linkedin"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-white transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-linkedin"></i>
            </motion.a>
            <motion.a
              href="#github"
              aria-label="GitHub"
              className="text-gray-400 hover:text-white transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-github"></i>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
