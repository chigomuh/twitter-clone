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

interface Props {
  user: User;
}

const TweetFactory = ({ user }: Props) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const storage = getStorage();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (tweet !== "" && user !== null) {
        const attachmentRef = ref(storage, `${user.uid}/${uuidv4()}`);

        let attachmentUrl = null;
        if (attachment) {
          await uploadString(attachmentRef, attachment, "data_url");
          attachmentUrl = await getDownloadURL(attachmentRef);
        }

        const data = {
          uid: user.uid,
          displayName: user.displayName,
          text: tweet,
          createAt: Date.now(),
          attachmentUrl,
        };

        await addDoc(collection(cloudDatabase, "tweets"), data);

        setTweet("");
        setAttachment(null);
        if (imageFileRef.current) {
          imageFileRef.current.value = "";
        }
      } else {
        alert("내용을 입력해주세요.");
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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="무슨 생각을 하고 계신가요?"
        maxLength={120}
        onChange={onChange}
        value={tweet}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={imageFileRef}
      />
      <input type="submit" value="tweet" />
      {attachment && (
        <>
          <img
            src={attachment}
            width="250px"
            height="250px"
            alt="upload-Thumnail"
          />
          <button onClick={onClearAttachmentClick}>Clear</button>
        </>
      )}
    </form>
  );
};

export default TweetFactory;
