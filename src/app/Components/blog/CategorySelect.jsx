"use client";

import { useRouter, useSearchParams } from "next/navigation";
const categories = [
  "Technology",
  "Lifestyle",
  "Health",
  "Education",
  "Business",
  "Programming"
];

export default function CategorySelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("category") || "";

  const handleChange = (cata) => {
    const category = cata;
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.set("page", "1"); // reset page
    router.push(`${process.env.NEXT_PUBLIC_APP_URL}/blog?${params.toString()}`);
  };

   return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 my-6 w-full ">
      <button
        onClick={() => handleChange("")}
        className={` px-2 py-1 md:px-4 rounded-lg font-semibold transition duration-75 ${
          selectedCategory === ""
            ? "bg-[#7567b4] text-white"
            : "bg-gray-200 text-gray-800 hover:bg-[#ddd]"
        }`}>
        All
      </button>

      {categories.map((cata) => {
        return (
          <button
            key={cata}
            onClick={() => handleChange(cata)}
            className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition duration-200 ${
              selectedCategory === cata
                ? "bg-[#7567b4] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-[#ddd]"
            }`}>
            {" "}
            {cata}
          </button>
        );
      })}
    </div>
  );
}
