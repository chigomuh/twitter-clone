import { useEffect, useState } from "react";
import { cloudDatabase } from "firebaseConfig";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
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
  photoURL: string | null;
}

export interface TweetData extends AddTweet {
  id: string;
}

const Home = ({ user }: Props) => {
  const [tweets, setTweets] = useState<TweetData[]>([]);

  useEffect(() => {
    const q = query(
      collection(cloudDatabase, "tweets"),
      orderBy("createAt", "desc")
    );

    onSnapshot(q, (doc) => {
      const tweetArray: TweetData[] = doc.docs.map((doc) => {
        const { createAt, displayName, text, uid, attachmentUrl, photoURL } =
          doc.data();

        return {
          id: doc.id,
          createAt,
          displayName,
          text,
          uid,
          attachmentUrl,
          photoURL,
        };
      });

      setTweets(tweetArray);
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <TweetFactory user={user} />
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            isOwner={tweet.uid === user?.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
