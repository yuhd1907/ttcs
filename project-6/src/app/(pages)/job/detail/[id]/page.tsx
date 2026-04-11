import { Metadata } from "next";
import JobContainer from "./jobContainer";

export const metadata: Metadata = {
  title: "Chi tiết công việc",
  description: "Chi tiết công việc",
};

const JobDetail = () => {
  return (
    <JobContainer />
  )
};

export default JobDetail;
