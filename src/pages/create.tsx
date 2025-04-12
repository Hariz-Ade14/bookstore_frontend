import Layout from "../components/layout";
import React, { useState,useRef } from "react";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { IoCloudUploadSharp } from "react-icons/io5";
import uploadToCloudinary from "../components/cloudinary";
import CircularProgress from "@mui/material/CircularProgress";
// import ProtectedRoutes from "../components/protectedRoutes";


// const BASE_URL = "http://localhost:4000/books"
const Create = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [imageFile, setImage] = useState<File | null>(null);
  const [rating, setRating] = useState(3);
  const fileInputRef = useRef(null);

  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setImage(selectedFile);
    console.log(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }

    const cloudinaryFileUrl = await uploadToCloudinary({ file: imageFile, fileType: "image" });
    const image = cloudinaryFileUrl;
    const bookDetails = { title, caption, image, rating,description };
    try {
      if(!title || !caption || !imageFile || !rating) {console.log("empty");
         return};
      const createBook = await fetch("https://bookstore-h11a.onrender.com/addbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookDetails),
      });
      const response = await createBook.json();
      console.log(response);
      if (response.success) {
        setLoading(false);
        setTitle("");
        setCaption("");
        setDescription("");
        setRating(3);
        setImage(null);
        setFilePreview(null);
        
      }
    } catch (error) {
      return error;
    }
  };

  const commonStyles =
    "border border-solid border-gray-300 outline-none rounded-[10px] p-3 w-[100%]";

  return (
    // <ProtectedRoutes>
    <Layout>
      <div className="flex flex-col items-start justify-start gap-10 p-4 border m-5 rounded-[10px] bg-white">
        <div className="text-center w-full">
          <h1 className="md:text-[2rem] text-center font-bold text-emerald-900 whitespace-nowrap">
            Add a Book Recommendation
          </h1>
          <p className="text-[15px] text-center text-emerald-900">
            Share your Books with others
          </p>
        </div>

        <form onSubmit={handleSubmit} action="" className="w-full flex flex-col gap-10">
          <div className="flex flex-col gap-3 items-start w-full justify-center">
            <h1 className="font-semibold text-emerald-900">Title</h1>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${commonStyles}`}
            />
          </div>

          <div className="flex flex-col gap-3 w-[100%] items-start justify-center">
            <p className="font-semibold text-emerald-900">Rating</p>
            <div className="flex flex-row gap-2 items-center justify-start">
              {[...Array(5)].map((_, index) => (
                <div key={index} onClick={() => setRating(index + 1)}>
                  {index < rating ? (
                    <IoIosStar color="gold" size={30} />
                  ) : (
                    <IoIosStarOutline color="green" size={30} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 items-start w-full justify-center">
            <h1 className="font-semibold text-emerald-900">Author</h1>

            <input
              placeholder="Author"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className={`${commonStyles}`}
            />
          </div>
          <div className="flex flex-col gap-3 items-start w-full justify-center">
            <h1 className="font-semibold text-emerald-900">Description</h1>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${commonStyles}`}
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <h1 className="font-semibold text-emerald-900">Select image</h1>
            <div className="border flex flex-col gap-2 items-center justify-center rounded-[10px] p-20 w-[100%]">
              {filePreview && (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="max-w-full max-h-[200px]"
                />
              )}
              <input
                placeholder="Attach Image"
                onChange={handleFileChange}
                className=" text-center w-[200px]"
                type="file"
                ref={fileInputRef}
              />
            </div>
          </div>
          <button
            className={`${commonStyles} flex flex-row items-center gap-4 justify-center  bg-emerald-500 text-white border-none`}
          >
            {loading ?  <CircularProgress color="success" /> : <IoCloudUploadSharp size={20} />}
            Share
          </button>
        </form>
      </div>
    </Layout>
    // </ProtectedRoutes>
  );
};

export default Create;
