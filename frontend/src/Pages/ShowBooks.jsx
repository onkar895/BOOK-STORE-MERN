import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BackButton from "../Components/BackButton"
import { apiUrl } from "../utils/bookAPI"
import { Book, Star, Clock, DollarSign } from "lucide-react"

const ShowBooks = () => {
  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${apiUrl}/${id}`)
        const result = await response.json()
        console.log(result.data)
        setBook(result.data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setBook(null)
        setIsLoading(false)
      }
    }

    if (id) fetchBookData()
  }, [id])

    // Loading state
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="animate-spin w-full max-w-md bg-gray-800 rounded-lg p-6">
            
          </div>
        </div>
      )
    }
 
  // No book found state
  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="text-center">
          <Book className="mx-auto mb-4 w-16 h-16 text-gray-600" />
          <p className="text-xl text-gray-400">No book found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-lg md:max-w-2xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] cursor-pointer">
        {/* Back Button */}
        <div className="absolute z-10 m-8">
          <BackButton />
        </div>

        {/* Book Details Container */}
        <div className="grid md:grid-cols-3 gap-6 p-10">
          {/* Book Cover Placeholder */}
          <div className="md:col-span-1 flex items-center justify-center bg-gray-700/30 rounded-lg p-4">
            <Book className="w-full h-56 text-gray-600" />
          </div>

          {/* Book Information */}
          <div className="md:col-span-2 space-y-4">
            {/* Title and Author */}
            <div>
              <h1 className="text-4xl font-bold text-sky-400 mb-2 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-gray-300 flex items-center">
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
                  <p className="text-sm uppercase tracking-wide text-gray-500">Published</p>
                  <p className="text-lg font-semibold">{book.publishYear}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Description</h3>
              <p className="text-gray-400 leading-relaxed italic">
                {book.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowBooks