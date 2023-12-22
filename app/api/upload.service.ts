export const uploadRequest = async (
  file: File | undefined
): Promise<string | undefined> => {
  try {
    const url = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const formData: FormData = new FormData();
    file && formData.append("image", file);

    const response: Response = await fetch(`${url}/movie/upload/image`, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    });

    const data = await response.json();

    if (data && data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Invalid response format from server:", data);
      return undefined;
    }
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return undefined;
  }
};
