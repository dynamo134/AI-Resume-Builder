import React, { useEffect } from "react";
import AddResume from "./components/AddResume";
import { getResumes } from "@/Services/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCard from "./components/ResumeCard";
import { Provider } from "react-redux";
import { resumeStore } from "@/store/store";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = React.useState([]);

  useEffect(() => {
    user && getUserResumeList();
  }, [user]);

  const getUserResumeList = async () => {
    getResumes(user?.primaryEmailAddress.emailAddress).then((resumes) => {
      console.log(
        `Printing from DashBoard List of Resumes got from Backend`,
        resumes.data
      );
      setResumeList(resumes.data);
    });
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p className="py-3"> Start creating your Ai resume for next Job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-4">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCard
              key={resume.attributes.resume_id}
              resume={resume}
              refreshData={getUserResumeList}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
