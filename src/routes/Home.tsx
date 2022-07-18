import { useEffect, useState } from "react";
import { cloudDatabase } from "firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { User } from "firebase/auth";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

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
  const [tweets, setTweets] = useState<TweetData[]>([]);

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

  return (
    <>
      <TweetFactory user={user} />
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} isOwner={tweet.uid === user?.uid} />
      ))}
    </>
  );
};

export default Home;
