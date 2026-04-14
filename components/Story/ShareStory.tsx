"use client";
import { BASE_API_URL } from "@/server";
import { CompanyType } from "@/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Select from "react-select";
import { handleRequest } from "../utils/apiRequest";
import { Briefcase, Building2, FileText, Heart, Send, User } from "lucide-react";
import LoadingButton from "../utils/LoadingButton";
import { toast } from "sonner";

const ShareStory = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [companies, setCompanies] = React.useState<CompanyType[]>([]);

  const [formData, setFormData] = React.useState({
    vibe: "neutral",
    companyName: "",
    isAnonymous: false,
    name: "",
    userType: "individual customer",
    title: "",
    story: "",
  });

  const route = useRouter();
  //prepare company options for select input
  const companyOptions = companies.map((company) => ({
    value: company.name,
    label: company.name,
  }));
  //vibe options
  const vibeOptions = [
    { value: "neutral", label: "Neutral" },
    { value: "positive", label: "Positive" },
    { value: "negative", label: "Negative" },
  ];

  //user type options
  const userTypeOptions = [
    { value: "individual customer", label: "Individual Customer" },
    { value: "business customer", label: "Business Customer" },
    { value: "bank employee", label: "Bank Employee" },
    { value: "former employee", label: "Former Employee" },
    { value: "investor", label: "Investor" },
    { value: "other", label: "Other" },
  ];

  console.log("BASE_API_URL", BASE_API_URL);
  //fetchour our company from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      const companyReq = async () =>
        await axios.get(`${BASE_API_URL}/companies/getAll`);
      const result = await handleRequest(companyReq, setIsLoading);

      console.log("Company Fetch Result:", result?.data?.data?.companies);
      if (result?.data.status === "success") {
        setCompanies(result?.data.data.companies);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload={
      vibe: formData.vibe,
      companyName: formData.companyName,
      isAnonymous: formData.isAnonymous,
      userType: formData.userType,
      title: formData.title,
      story: formData.story,
      ...(formData.isAnonymous ? {} : {name: formData.name})
    }


    console.log("formData.name",formData.name)

    const shareStoryReq = async () =>
      await axios.post(`${BASE_API_URL}/reviews/create`, payload, {
        withCredentials: true,
      });
    const result = await handleRequest(shareStoryReq, setIsLoading);
    // console.log("Share Story Result:", result);
    if(result?.data?.status === "success"){
      toast.success("your Story submitted successfully!");
      route.push("/reviews");
    }
  };

  const handleChanage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
const {name,type,value}=e.target;
const checked=(e.target as HTMLInputElement).checked;
setFormData((prev)=>({...prev,[name]:type === "checkbox" ? checked : value}))

  }
  return (
    <div className="min-h-screen mt-10 bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Share your banking experience
        </h1>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* vibe */}
          <div>
            <label className="block  font-medium mb-1 text-gray-700 ">
              <Heart className="inline w-4 h-4 mr-2"/>
              Vibe
            </label>
            <Select options={vibeOptions} 
            value={{
              value: formData.vibe,
               label: formData.vibe.charAt(0).toUpperCase() + formData.vibe.slice(1)}}
               onChange={(selected)=>setFormData({...formData,vibe:selected?.value || "neutral"})}
               isSearchable={false}
            />
          </div>

          {/* company name */}
          <div>
            <label className="block  font-medium mb-1 text-gray-700 ">
              <Building2 className="inline w-4 h-4 mr-2"/>
              Company Name
            </label>
            <Select options={companyOptions} 
            value={companyOptions.find(option=>option.value === formData.companyName) }
            onChange={(selected)=>setFormData({...formData,companyName:selected?.value || ""  })}
            placeholder="Select a company"
            isSearchable
            />
          </div>
          {/* Anonymous toggle */}
          <div className="flex items-center space-x-2">
            <input type='checkbox' name='isAnonymous' checked={formData.isAnonymous} 
            onChange={(e)=>handleChanage(e)} />
            <label className="text-sm text-gray-700">Post Anonymously</label>
          </div>

          {/* name filed - only show when not anonymous */}
          {
            !formData.isAnonymous && (
              <div>
                <label className="block  font-medium mb-1 text-gray-700 ">
              <User className="inline w-4 h-4 mr-2"/>
              Your Name
            </label>
            <input type='text' name='name' value={formData.name} onChange={(e)=>handleChanage(e)} 
            className="w-full px-3 py-2 border rounded"
            />
              </div>
            )
          }

          <div className=" ">
            <label className="block font-medium mb-1 text-gray-700">
              <Briefcase className="inline w-4 h-4 mr-2" />
              User Type
            </label>
            <Select options={userTypeOptions} 
            value={{
              value: formData.userType,
              label:formData.userType.split(" ").map(word=>word[0].toUpperCase() + word.slice(1)).join(" ")

            }}
            onChange={(selected)=>setFormData({...formData,userType:selected?.value || "individual customer"  })}
            placeholder="Select a user type"
            isSearchable
            />
          </div>

          {/* title */}
          <div className="">
             <label className="block font-medium mb-1 text-gray-700 ">
              <FileText className="inline w-4 h-4 mr-2" />
              Story
            </label>
            <input  type='text' name='title' value={formData.title} 
            onChange={(e)=>handleChanage(e)} 
            className="w-full px-3 py-2 border rounded"
            placeholder="one-line summary of your story"
             required
            />
          </div>
          {/* description story */}
          <div>
            <label className="block font-medium mb-1 text-gray-700 ">
              <FileText className="inline w-4 h-4 mr-2" />
              Story
            </label>
            <textarea
            name='story' value={formData.story} onChange={(e)=>handleChanage(e)}
            className="w-full px-3 py-2 border rounded resize-y"
            placeholder="Describe your experience here..."
             rows={6}
             required
            />
          </div>

          <div className="text-right">
            <LoadingButton className="bg-blue-600 cursor-pointer hover:bg-blue-700
             text-white font-semibold py-2 px-4 rounded disabled:opacity-50" 
            isLoading={isLoading} type="submit" variant="default">
              <span className="inline-flex items-center">
                <Send className=" w-4 h-4 mr-2"/>
                Share Story
              </span>
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareStory;
