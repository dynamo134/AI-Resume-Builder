import React from "react";
import { useState } from "react";
import { CopyPlus, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { createNewResume } from "../../../Services/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    if (resumetitle === "")
      return console.log("Please add a title to your resume");
    const resumeId = uuidv4();
    const data = {
      data: {
        title: resumetitle,
        resume_id: resumeId,
        user_name: user?.fullName,
        user_email: user?.primaryEmailAddress.emailAddress,
      },
    };
    console.log(`Creating Resume ${resumetitle} and ID: ${resumeId}`);
    createNewResume(data)
      .then((res) => {
        console.log("Prinitng From AddResume Respnse of Create Resume",res);
        Navigate(`/dashboard/edit-resume/${res.data.id}`);
      })
      .finally(() => {
        setLoading(false);
        setResumetitle("");
      });
  };
  return (
    <>
      <div
        className="p-14 py-24 flex items-center justify-center border-2 bg-secondary rounded-lg h-[380px] hover:scale-105 transition-all duration-400 cursor-pointer hover:shadow-md transform-gpu"
        onClick={() => setOpenDialog(true)}
      >
        <CopyPlus className="transition-transform duration-300" />
      </div>
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Resume</DialogTitle>
            <DialogDescription>
              Add a title and Description to your new resume
              <Input
                className="my-3"
                type="text"
                placeholder="Ex: Backend Resume"
                value={resumetitle}
                onChange={(e) => setResumetitle(e.target.value.trimStart())}
              />
            </DialogDescription>
            <div className="gap-2 flex justify-end">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={createResume}
                disabled={!resumetitle || loading}
              >
                {loading ? (
                  <Loader className=" animate-spin" />
                ) : (
                  "Create Resume"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;