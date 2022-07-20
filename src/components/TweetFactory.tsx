import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { User } from "firebase/auth";
import { cloudDatabase } from "firebaseConfig";
import FetchLoading from "./FetchLoading";

interface Props {
  user: User;
}

const TweetFactory = ({ user }: Props) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (tweet !== "" && user !== null) {
        setLoading(true);

        const attachmentRef = ref(getStorage(), `${user.uid}/${uuidv4()}`);

        let attachmentUrl = null;
        if (attachment) {
          await uploadString(attachmentRef, attachment, "data_url");
          attachmentUrl = await getDownloadURL(attachmentRef);
        }

        const photoURL = user.photoURL;

        const data = {
          uid: user.uid,
          displayName: user.displayName,
          text: tweet,
          createAt: Date.now(),
          attachmentUrl,
          photoURL,
        };

        const result = await addDoc(collection(cloudDatabase, "tweets"), data);

        if (result) {
          setLoading(false);
          setTweet("");
          setAttachment(null);
          if (imageFileRef.current) {
            imageFileRef.current.value = "";
          }
          setSubmitError(false);
        }
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setTweet(value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;

    if (files) {
      const currentFile = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setAttachment(reader.result);
        }
      };
      reader.readAsDataURL(currentFile);
    }
  };

  const onClearAttachmentClick = () => {
    setAttachment(null);

    if (imageFileRef.current) {
      imageFileRef.current.value = "";
    }
  };

  return (
    <div className="w-full h-max bg-white">
      {loading && <FetchLoading />}
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center w-full p-4 space-y-4"
      >
        <input
          type="text"
          placeholder="무슨 생각을 하고 계신가요?"
          maxLength={120}
          onChange={onChange}
          value={tweet}
          className="w-full h-10 border-2 rounded-full px-4"
        />
        {submitError && (
          <div className="text-red-700 font-bold">내용을 입력하세요.</div>
        )}
        <div className="flex justify-between w-full px-2">
          <label
            htmlFor="fileInput"
            className="border-2 rounded-full w-28 text-center bg-[#03A9F4] text-white font-bold"
          >
            사진 업로드
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              ref={imageFileRef}
              className="hidden"
              id="fileInput"
            />
          </label>
          <input
            type="submit"
            value="트윗"
            className="border-2 rounded-full w-16 bg-[#03A9F4] text-white font-bold"
          />
        </div>
        {attachment && (
          <>
            <img
              src={attachment}
              width="250px"
              height="250px"
              alt="upload-Thumnail"
            />
            <button
              onClick={onClearAttachmentClick}
              className="border-2 rounded-full w-16 bg-[#03A9F4] text-white"
            >
              취소
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default TweetFactory;
