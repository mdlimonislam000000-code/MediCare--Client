
export const uploadImageToImgBB = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed!");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};