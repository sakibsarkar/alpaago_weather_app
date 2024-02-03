export const local_img_url = (img) => {
    return new Promise((resolve, reject) => {
        if (!img || !img.type.startsWith('image/')) {
            reject(new Error('Invalid file type. Please select an image.'));
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result);
        };

        reader.onerror = () => {
            reject(new Error('Error reading the file.'));
        };

        reader.readAsDataURL(img);
    });
}