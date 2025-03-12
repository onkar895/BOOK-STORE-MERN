import React from 'react';
import { BookOpen, Library, Search, BookMarked, BookText, Star } from 'lucide-react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const AboutPage = () => {
  return (
    <>
      <NavBar />
      <div className="py-36 px-10 rounded-2xl shadow-xl max-w-6xl mx-auto">
        {/* Header Section with Decorative Elements */}
        <div className="relative text-center mb-8 md:mb-12">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-full">
            <div className="flex justify-center space-x-4 opacity-20">
              <BookText className="h-8 w-8 text-indigo-400" />
              <BookOpen className="h-8 w-8 text-purple-400" />
              <BookText className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-white mb-2 md:mb-3">Your Digital Bookshelf</h1>
          <p className="text-md sm:text-lg md:text-xl text-gray-200 italic font-light">Your personal literary journey begins here</p>
        </div>

        {/* Main Message with Animation */}
        <div className="p-6 rounded-xl shadow-lg mb-8 md:mb-12 transform transition duration-500 hover:scale-105 border border-l-4 border-sky-500 cursor-pointer">
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed text-center font-medium">
            Manage your book collection, discover new titles, and keep track of your reading journey all in one place.
          </p>
        </div>

        {/* Features Grid - Responsive for all screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-500 hover:border-sky-300">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-sky-300 p-3 rounded-lg mr-4 shadow-md">
                <Library className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-sky-400">Organize Collection</h3>
            </div>
            <p className="text-gray-400">Catalog your books by genre, author, or custom collections with intuitive sorting tools.</p>
          </div>

          <div className="p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-500 hover:border-sky-300">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-3 rounded-lg mr-4 shadow-md">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-purple-400">Discover Books</h3>
            </div>
            <p className="text-gray-400">Get personalized recommendations based on your unique reading preferences and history.</p>
          </div>

          <div className="p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-500 hover:border-sky-300">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-3 rounded-lg mr-4 shadow-md">
                <BookMarked className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-pink-500">Track Progress</h3>
            </div>
            <p className="text-gray-400">Set reading goals, mark progress with visual indicators, and celebrate achievements.</p>
          </div>

          <div className="p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-500 hover:border-sky-300">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 p-3 rounded-lg mr-4 shadow-md">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-indigo-400">Reading Insights</h3>
            </div>
            <p className="text-gray-400">Visualize reading habits with beautiful charts and gain insights into your preferences.</p>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="p-6 rounded-xl shadow-inner mb-8 md:mb-12 border border-gray-500 hover:border-sky-300">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">JP</span>
            </div>
            <div>
              <p className="italic text-gray-200 mb-2">"This app transformed how I organize my books. I've rediscovered forgotten treasures and found amazing new authors!"</p>
              <p className="font-semibold text-sky-500">Jane Phillips, Book Enthusiast</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center pb-4">
          <button className="bg-gradient-to-r from-indigo-400 to-purple-600 text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl">
            Start Your Reading Journey
          </button>
          <p className="mt-4 text-gray-400 text-sm">Join thousands of readers organizing their literary lives</p>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default AboutPage;