import React, { useState, useEffect } from "react";
import { handleRequest } from "../utils/apiRequest";
import { useRouter } from "next/navigation";
import { useDebounce } from "../Hooks/useDebounce";
import { Review } from "@/type";
import axios from "axios";
import { BASE_API_URL } from "@/server";
import { Filter, Loader } from "lucide-react";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [company, setCompany] = React.useState("");
  const [vibe, setVibe] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const debouncedCompany = useDebounce(company, 500);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchRevies = async () => {
      const reviewReq = async () =>
        await axios.get(`${BASE_API_URL}/reviews/all`, {
          params: {
            company: debouncedCompany,
            vibe,
            search: debouncedSearch,
            sort,
            page,
          },
        });
      const result = await handleRequest(reviewReq, setIsLoading);
      if (result?.data.status === "success") {
        console.log("Reviews Fetch Result:", result?.data?.data?.reviews);
        setReviews(result?.data?.data?.reviews || []);
        setTotalPages(result?.data?.data?.totalPages || 1);
      }
    };
    fetchRevies();
  }, [debouncedCompany, vibe, debouncedSearch, sort, page]);
  return (
    <div className="sm:w-[80%] w-full p-6 mx-auto mt-[8rem]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews</h1>
        <p className="text-gray-600">Customer feedback and experiences</p>
      </div>
      {/* Filter section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Search company */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setPage(1);
              }}
              placeholder="Search by company name"
              className=" w-full border rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* vibe select */}
          <div className="md:col-span-3">
            <label>Vibe</label>
            <select
              value={vibe}
              onChange={(e) => {
                setVibe(e.target.value);
                setPage(1);
              }}
              className=" w-full border rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
          {/* search in reviews */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by Reviews"
              className=" w-full border rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* reviews header and sorting options */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="font-bold text-2xl text-gray-900 mb-2">
            Public review
          </h1>
          <p className="text-gray-600 ">Showing {reviews.length}</p>
        </div>
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 
          sm:space-x-4"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-50" />
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="border rounded-lg px-3 py-2 text-sm text-gray-700
                 focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <button
            onClick={() => router.push("/share-story")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium
            hover:scale-105 transition-all cursor-pointer"
          >
            Write Review
          </button>
        </div>
      </div>

      {/* review list */}
      {isLoading && (
        <div className="text-center ">
          <Loader className="w-6 h-6 mx-auto animate-spin" />
        </div>
      )}
      {
        !isLoading && 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {reviews.map((review)=>(
            <ReviewCard key={review._id} review={review}/>
          ))}
           </div>
      }
    </div>
  );
};

export default Reviews;
