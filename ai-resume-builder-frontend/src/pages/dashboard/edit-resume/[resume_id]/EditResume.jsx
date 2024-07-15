import React, { useEffect } from "react";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { useParams } from "react-router-dom";
import { getResumeInfo } from "@/Services/GlobalApi";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";

export function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getResumeInfo(resume_id).then((data) => {
      console.log(
        "Printing from EditResume API response",
        data.data.attributes
      );
      dispatch(addResumeData(data.data.attributes));
    });
    console.log("Printing from EditResume API response", resume_id);
  }, [resume_id]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
      <ResumeForm />
      <PreviewPage />
    </div>
  );
}

export default EditResume;
