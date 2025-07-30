export const uploadBannerToCloudinary = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'event-x');
  data.append('folder', 'events/banner');

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: data,
    });
    const json = await res.json();
    return json.secure_url;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return null;
  }
};

export const uploadProfileToCloudinary = async (file) => {
  const data = new FormData();
  data.append('file',file);
  data.append('upload_preset','event-x');
  data.append('folder','users/profile');

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: data,
    });
    const json = await res.json();
    return json.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
}