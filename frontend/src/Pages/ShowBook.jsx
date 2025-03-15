import { useState } from "react"
import { useParams } from "react-router-dom"
import BackButton from "../Components/BackButton"
import Spinner from "../Components/Spinner"
import { Star, Clock, DollarSign } from "lucide-react"
import useFetchBooks from "../Hooks/useFetchBooks"
import NavBar from "../Components/NavBar"
import ComingSoon from '../assets/Coming-Soon.png'

const ShowBook = () => {
  const [imageError, setImageError] = useState(false);

  const { id } = useParams()
  const { books: book, loading } = useFetchBooks(id)

  //Default image to show when the URL is invalid or image fails to load

  const defaultBookCover = ComingSoon

  return (
    <>
      <div className="mx-auto px-4 sm:px-10 lg:px-28">
        <NavBar />
      </div>
      {
        loading ? <Spinner /> : 
        <div className="flex justify-center items-center min-h-screen p-4">
          <div className="w-full max-w-xl md:max-w-4xl bg-gray-800 rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] cursor-pointer border border-gray-600 shadow-2xl shadow-black my-24">
            {/* Back Button */}
            <div className="absolute z-10 m-8">
              <BackButton />
            </div>

            {/* Book Details Container */}
            <div className="grid md:grid-cols-3 gap-6 p-10">
              <img 
                src={imageError ? defaultBookCover : book.image} 
                className="block m-auto w-[650px] h-[300px] md:h-[350px] object-cover rounded-lg transition-transform hover:scale-105 duration-500 ease-in-out"
                onError={() => {
                  console.error("Image failed to load:", book.image);
                  setImageError(true);
                }} 
              />

              {/* Book Information */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h1 className="text-xl md:text-3xl font-bold text-sky-400 mb-2 leading-tight">
                    {book.title}
                  </h1>
                  <p className="md:text-xl text-gray-300 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    by {book.author}
                  </p>
                </div>

                {/* Book Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm uppercase tracking-wide text-gray-500">Price</p>
                      <p className="text-lg font-semibold text-green-400">${book.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm uppercase tracking-wide text-gray-500">Published Year</p>
                      <p className="text-lg font-semibold">{book.publishYear}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-300 mb-2 uppercase">Description</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {book.description || "No description available."}
                  </p>
                </div>

                <div className="">
                  <span className="font-semibold text-gray-300 uppercase">Create Time</span>
                  <p className="text-sm text-gray-400">{new Date(book.createdAt).toString()}</p>
                </div>

                <div>
                  <span className="font-semibold text-gray-300 uppercase">Last Update Time</span>
                  <p className="text-sm text-gray-400">{new Date(book.updatedAt).toString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default ShowBook