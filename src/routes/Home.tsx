import { useEffect, useRef, useState } from "react";
import { cloudDatabase } from "firebaseConfig";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { User } from "firebase/auth";
import React from "react";
import Tweet from "components/Tweet";
import { v4 as uuidv4 } from "uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

interface Props {
  user: User;
}

interface AddTweet {
  createAt: number;
  displayName: string | null;
  text: string;
  uid: string;
  attachmentUrl: string | null;
}

export interface TweetData extends AddTweet {
  id: string;
}

const Home = ({ user }: Props) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState<TweetData[]>([]);
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

  useEffect(() => {
    onSnapshot(collection(cloudDatabase, "tweets"), (doc) => {
      const tweetArray: TweetData[] = doc.docs.map((doc) => {
        const { createAt, displayName, text, uid, attachmentUrl } = doc.data();

        return {
          id: doc.id,
          createAt,
          displayName,
          text,
          uid,
          attachmentUrl,
        };
      });

      setTweets(tweetArray);
    });
  }, []);

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
    <>
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
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} isOwner={tweet.uid === user?.uid} />
      ))}
    </>
  );
};

export default Home;
