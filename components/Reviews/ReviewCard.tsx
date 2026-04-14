"use client";

import { Review } from "@/type";
import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronUp, User } from "lucide-react";

type Props = {
  review: Review;
};
const ReviewCard = ({ review }: Props) => {
  const [expanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  // const shouldShowSeeMore=review?.story?.length || 0> maxLength;
  const story = review?.story || "";
  const shouldShowSeeMore = story.length > maxLength;

  const getVibeColor = (vibe: string) => {
    switch (vibe) {
      case "positive":
        return "text-green-700 bg-green-100 border-green-200";

      case "negative":
        return "text-red-700 bg-red-100 border-red-200";

      default:
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
    }
  };
  const displayContent =
    shouldShowSeeMore && !expanded
      ? review.story.substring(0, maxLength) + "..."
      : review.story;
      console.log("review in card:", review);   
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg
    transition-all duration-300 hover:border-blue-200"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
        <div className="flex-1">
          <div className="flex flex-wrap items-center space-x-3 mb-3">
            <h3 className="sm:text-xl text-lg font-bold text-gray-900">
              {review?.companyName}
            </h3>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full border ${getVibeColor(review.vibe)}`}
            >
              {review.vibe}
            </span>
          </div>
        </div>
      </div>

      {/* review title */}
      <h4 className="sm:text-lg text-base font-semibold text-gray-800 mb-4 leading-relaxed">
        {review.title}
      </h4>

      {/* review content */}
      <div className="mb-6">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {displayContent}
        </p>
        {shouldShowSeeMore && (
          <button
            onClick={() => setIsExpanded(!expanded)}
            className="mt-4 flex items-center space-x-1 text-blue-600 hover:text-blue-700
                    font-semibold transition-colors text-sm sm:text-base"
          >
            <span>{expanded ? "See Less" : "See More"}</span>
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100
      space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 text-gray-600">
            <User className="h-4 w-4"/>
            <span>{review?.name || review?.anonymousId }</span>
        </div>
        <div className="flex items-center text-sm sm:text-base space-x-2">
            <Calendar className="h-4 w-4"/>
            <span>
                {new Date(review.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
            </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
