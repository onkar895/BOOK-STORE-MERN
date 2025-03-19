import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const styles = "text-gray-400 hover:text-sky-400 transition-colors duration-500"

  return (
    <footer>
      {/* Newsletter Section */}
      <div className='border-t border-gray-700'>
        <div className='w-full mx-auto py-16 px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='text-center md:text-start mb-6 md:mb-0'>
              <h3 className='text-lg font-semibold text-white mb-2'>Stay updated with BookVerse</h3>
              <p className='text-gray-300 max-w-md'>Subscribe to our newsletter for the latest book releases, reading recommendations, and updates.</p>
            </div>
            <div className='w-full md:w-auto'>
              <form className='flex items-center justify-center sm:flex-row gap-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-300'
                  required
                />
                <button type='submit' className='px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-md transition-colors duration-300'>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className='border-t border-gray-700'>
        <div className='w-full mx-auto py-16 px-4'>
          <div className="flex flex-col lg:flex-row items-start gap-16 justify-between">
            <div className='flex flex-col justify-center gap-4'>
              <Link to='/' className='flex items-center gap-2 group'>
                <FaBook className='text-2xl text-sky-500 transition-colors duration-300' />
                <div className='text-2xl font-bold'>
                  <span className='text-sky-500'>Book</span>
                  <span className='text-white'>Verse</span>
                </div>
              </Link>
              <p className='text-gray-300'>Your digital book management solution. Organize, discover, and enjoy your reading journey.</p>
              <div className='flex space-x-4'>
                <a href='#' target='_blank' rel='noopener noreferrer' className='text-gray-400 hover:text-sky-400 transition-colors duration-300'>
                  <FaGithub size={20} />
                </a>
                <a href='#' className='text-gray-400 hover:text-sky-400 transition-colors duration-300'>
                  <FaTwitter size={20} />
                </a>
                <a href='#' className='text-gray-400 hover:text-sky-400 transition-colors duration-300'>
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
            <div className='flex max-sm:flex-col gap-10 items-center max-sm:items-start justify-between w-full'>
              {/* Quick Links */}
              <div className='col-span-1'>
                <h3 className='max-sm:text-sm font-semibold text-white uppercase tracking-widest mb-4'>Quick Links</h3>
                <ul className='space-y-2'>
                  <li>
                    <Link to='/' className={styles}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to='/books' className={styles}>
                      Books
                    </Link>
                  </li>
                  <li>
                    <Link to='/books/create' className={styles}>
                      Add Book
                    </Link>
                  </li>
                  <li>
                    <Link to='/about' className={styles}>
                      About
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className='col-span-1'>
                <h3 className='max-sm:text-sm font-semibold text-white uppercase tracking-widest mb-4'>Resources</h3>
                <ul className='space-y-2'>
                  <li>
                    <a href='#' className={styles}>
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href='#' className={styles}>
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a href='#' className={styles}>
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a href='#' className={styles}>
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className='col-span-1'>
                <h3 className='max-sm:text-sm font-semibold text-white uppercase tracking-widest mb-4'>Legal</h3>
                <ul className='space-y-2'>
                  <li>
                    <a href='#' className={styles}>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href='#' className={styles}>
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href='#' className={styles}>
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a href='#' className={styles}>
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className='border-t border-gray-700'>
        <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
          <p className='text-center text-gray-400'>&copy; {currentYear} BookVerse. All rights reserved.</p>
          <p className='text-sky-400 text-center mt-4'>Designed & Developed By <span className="text-white">Onkar Karale</span> 🚀</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
