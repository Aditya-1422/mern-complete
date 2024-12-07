import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';

const Profile = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [uploadMessage, setUploadMessage] = useState(''); // Upload status message
  const [formData, setFormdata] = useState({});
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload task:', progress, '% is done');
        setUploadMessage(`Uploading: ${progress.toFixed(2)}%`);
      },
      (error) => {
        setUploadMessage('Error while uploading');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormdata({ ...formData, avatar: downloadURL });
          setUploadMessage('Image Uploaded successfully');
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="font-semibold text-3xl text-center my-7">Profile</h1>
      <form className="flex flex-col">
        {/* Hidden file input */}
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        {/* Profile image */}
        <img
          onClick={() => {
            fileRef.current.click();
          }}
          src= { formData.avatar ||currentUser.user.avatar}
          alt="User profile"
          className="h-24 w-24 rounded-full self-center hover:cursor-pointer"
        />
        {/* Upload status message */}
        <p
          style={{
            color: uploadMessage.includes('Error') ? 'red' : 'green',
            textAlign: 'center',
            marginTop: '10px',
          }}
        >
          {uploadMessage}
        </p>
        {/* Other form fields */}
        <input type="text" placeholder="username" className="border p-3 rounded-lg mt-2" />
        <input type="email" placeholder="email" className="border p-3 rounded-lg mt-2" />
        <input type="password" placeholder="password" className="border p-3 rounded-lg mt-2" />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg my-2 hover:opacity-90 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      {/* Footer actions */}
      <div className="flex justify-between">
        <span className="text-red-700 hover:underline hover:cursor-pointer mt-5">Delete user</span>
        <span className="text-red-700 hover:underline hover:cursor-pointer mt-5">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;