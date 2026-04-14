"use client";
import { useDebounce } from "@/components/Hooks/useDebounce";
import Reviews from "@/components/Reviews/Reviews";
import { handleRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import { Review } from "@/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ReviewPage = () => {

  return (
    <div>
      <Reviews />
    </div>
  );
};

export default ReviewPage;
