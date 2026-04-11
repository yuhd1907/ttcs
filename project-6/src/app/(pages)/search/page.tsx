import { SearchBar } from "@/app/components/searchBar/SearchBar";
import { SearchContainer } from "./searchContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm việc làm IT",
  description: "Kết quả tìm kiếm việc làm IT",
}

const FindingResult = () => {
  return (
    <>
      <div className="">
        {/* Section 1 - Search bar */}
        <SearchBar />
        {/* End of Section 1 */}

        {/* Section 3 - Kết quả tìm kiếm */}
        <SearchContainer />
      </div>
      {/* End of Section 3 */}
    </>
  );
};

export default FindingResult;
