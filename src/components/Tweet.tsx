import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { cloudDatabase } from "firebaseConfig";
import { useState } from "react";
import { TweetData } from "routes/Home";

interface Props {
  tweet: TweetData;
  isOwner: boolean;
}

const Tweet = ({ tweet, isOwner }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweetText] = useState(tweet.text);
  const storage = getStorage();

  const onDeleteClick = async () => {
    const deleteOk = window.confirm("정말 해당 트윗을 삭제하겠습니까?");

    if (deleteOk) {
      try {
        await deleteDoc(doc(cloudDatabase, "tweets", tweet.id));
        if (tweet.attachmentUrl) {
          await deleteObject(ref(storage, tweet.attachmentUrl));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setNewTweetText(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await updateDoc(doc(cloudDatabase, "tweets", tweet.id), {
      text: newTweet,
    });

    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newTweet}
              placeholder="Edit your tweet!"
              onChange={onChange}
              required
              autoFocus
            />
            <input type="submit" value="updateTweet" />
          </form>
          <button onClick={toggleEditing}>Cancel Update</button>
        </>
      ) : (
        <>
          <div>{tweet.text}</div>
          {tweet.attachmentUrl && (
            <img
              src={tweet.attachmentUrl}
              width="100px"
              height="100px"
              alt="tweet-img"
            />
          )}
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Update</button>
              <button onClick={onDeleteClick}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
