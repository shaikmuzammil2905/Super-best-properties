/**
 * Cloudinary Image Upload Service
 * Uses unsigned preset to upload directly from browser
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'irey2suf';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

export async function uploadImage(file, options = {}) {
  // If file is already a string (URL or data URL), return it directly
  if (typeof file === 'string') {
    return {
      url: file,
      publicId: 'custom-url-' + Date.now(),
      format: 'external',
      bytes: 0
    };
  }

  // Attempt upload to Cloudinary
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    if (options.folder) {
      formData.append('folder', options.folder);
    }

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (response.ok && data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
        format: data.format,
        bytes: data.bytes,
        width: data.width,
        height: data.height,
        uploadedAt: new Date().toISOString()
      };
    }

    // If Cloudinary returned an error (e.g. preset not whitelisted for unsigned uploads)
    console.warn('Cloudinary upload warning:', data.error?.message || 'Upload failed. Falling back to local data URL.');
    
    // Read as local data URL so admin operations never fail or block the user
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result,
          publicId: 'local-asset-' + Date.now(),
          format: file.type.split('/')[1] || 'image',
          bytes: file.size,
          uploadedAt: new Date().toISOString(),
          fallback: true,
          note: data.error?.message
        });
      };
      reader.readAsDataURL(file);
    });

  } catch (error) {
    console.error('Cloudinary Network Error:', error);
    // Fallback to local Data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result,
          publicId: 'local-asset-' + Date.now(),
          format: 'image',
          bytes: file.size,
          uploadedAt: new Date().toISOString(),
          fallback: true
        });
      };
      reader.readAsDataURL(file);
    });
  }
}

