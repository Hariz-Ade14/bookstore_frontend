const cloudName = "dmody6b98";
// process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

interface UploadParams {
  file: File | null;
  fileType: string;
}

const uploadToCloudinary = async ({ file, fileType }: UploadParams) => {
  const image = new FormData();
  if (file) {
    image.append("file", file);
  } else {
    throw new Error("File is null");
  }
  image.append("upload_preset", "tracheids_hlx"); // Replace with your Cloudinary upload preset
  image.append("cloud_name", cloudName); // Replace with your Cloudinary upload preset

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${fileType}/upload`, // Replace with your Cloudinary cloud name
      {
        method: "POST",
        body: image,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    const data = await response.json();
      console.log(data.secure_url);
      console.log(fileType);

   
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
export default uploadToCloudinary;
