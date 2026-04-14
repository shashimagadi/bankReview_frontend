// import { navigation } from "@/constant";
// import { X } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// const MobileNav = () => {
//   return (
//     <div
//       className="fixed top-0 inset-0 transform transition-all duration-500 z-10002
//      bg-black opacity-70 w-full h-screen"
//     >
//       <div className="text-white top-0 fixed justify-center flex flex-col h-full
//       transform transition-all duration-500 delay-300 w-[80%]  sm:w-[60%] bg-gray-900 
//       space-y-6 z-100051
//       ">{
//         navigation.map((item)=>(
//             <Link href={item.href} key={item.name} 
//             className="text-2xl ml-12 text-white  w-fit border-b-[1.5px] sm:text-[30px] mb-12"
//             >
//               <p>{item.name}</p>  
//             </Link>
//         ))
//       } 
//       <Link href="/want-to-know" className="text-white w-fit text-2xl ml-12 border-b-[1.5px] pb-2
//        border-white sm:text-[25px]"> 
//         <span className=" font-medium whitespace-nowrap">Want to know</span></Link>

//         {/* CLOSEE ICON */}
//         <X className='absolute top-[0.7rem]  right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 cursor-pointer'/>
//       </div>
//     </div>
//   );
// };

// export default MobileNav;


import { navigation } from "@/constant";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

type MobileNavProps={
    showNav:boolean;
    closeNav:()=>void;
}
const MobileNav = ({showNav,closeNav}: MobileNavProps) => {

   // const navOpen=showNav?"translate-x-0":"translate-x-[-200%]";
  return (
    <div className={`fixed inset-0 flex z-10000 transition-opacity duration-500 
        ${ showNav ? "opacity-100 visible" : "opacity-0 pointer-events-none"}
        `}>
      
      {/* Sidebar */}
      <div className={`w-[80%] sm:w-[60%] h-full  bg-gray-900 text-white flex 
        flex-col justify-center space-y-8 relative shadow-xl
         transform transition-transform duration-500 ease-in-out
        ${showNav ? "translate-x-0" : "-translate-x-full"}
        `}>
        
        {navigation.map((item) => (
          <Link
          onClick={closeNav}
            href={item.href}
            key={item.name}
            className="text-2xl ml-12 w-fit border-b border-white pb-2 sm:text-[30px]"
          >
            {item.name}
          </Link>
        ))}

        <Link
           onClick={closeNav}
          href="/want-to-know"
          className="text-2xl ml-12 w-fit border-b border-white pb-2 sm:text-[25px]"
        >
          <span className="font-medium whitespace-nowrap">
            Want to know
          </span>
        </Link>

        {/* Close Icon */}
        <X 
        onClick={closeNav}
        className="absolute top-5 right-6 sm:w-8 sm:h-8 w-6 h-6 cursor-pointer" />
      </div>

      {/* Overlay (Remaining 20%) */}
      <div className="flex-1 bg-black/70"></div>

    </div>
  );
};

export default MobileNav;