import {
  Edit2,
  EyeIcon,
  Loader2Icon,
  NotebookIcon,
  Trash2,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteResume } from "@/Services/GlobalApi";

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleDelete = () => {
    setLoading(true);
    console.log("Delete Resume with ID", resume.id);
    deleteResume(resume.id)
      .then(() => {
        console.log("Resume Deleted wit ID", resume.id);
        refreshData();
      })
      .catch((error) => {
        console.error("Error deleting resume:", error);
      })
      .finally(() => {
        setLoading(false);
        setOpenAlert(false);
      });
  };
  return (
    <div className=" p-5 bg-secondary h-[380px] rounded-lg flex flex-col justify-between bg-gradient-to-r from-green-200 to-purple-300 shadow-sm" >
      <div className="p-14 flex items-center justify-center ">
        <NotebookIcon />
        <h2 className="text-black text-center font-bold text-lg mx-2">
          {resume.attributes.title}
        </h2>
      </div>
      <div className="flex items-center justify-around">
        <Link to={"/dashboard/view-resume/" + resume.id}>
          <EyeIcon className="cursor-pointer text-gray-500 hover:text-black transition duration-300 ease-in-out" />
        </Link>
        <Link to={"/dashboard/edit-resume/" + resume.id}>
          <Edit2 className=" cursor-pointer text-gray-500 hover:text-black transition duration-300 ease-in-out" />
        </Link>
        <Trash2
          className="cursor-pointer text-gray-500 hover:text-black transition duration-300 ease-in-out"
          onClick={() => {
            setOpenAlert(true);
          }}
        />
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCard;
