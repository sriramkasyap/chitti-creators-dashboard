export const fake = "";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("cloud_name", process.env.CLOUD_NAME);
  formData.append("upload_preset", process.env.CLOUD_UPLOAD_PRESET);
  return fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  ).then((r) => r.json());
};
