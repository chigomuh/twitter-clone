import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { cloudDatabase } from "firebaseConfig";
import DotsHorizontal from "images/DotsHorizontal";
import UserDefaultImage from "images/UserDefaultImage";
import { useState } from "react";
import { TweetData } from "routes/Home";
import EditModal from "./EditModal";

interface Props {
  tweet: TweetData;
  isOwner: boolean;
}

const Tweet = ({ tweet, isOwner }: Props) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweetText] = useState(tweet.text);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const storage = getStorage();

  const onDeleteClick = async () => {
    try {
      if (!editing) {
        handleEditModal();
      }
      await deleteDoc(doc(cloudDatabase, "tweets", tweet.id));
      if (tweet.attachmentUrl) {
        await deleteObject(ref(storage, tweet.attachmentUrl));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);

    if (!editing) {
      handleEditModal();
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setNewTweetText(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEditing(false);

    await updateDoc(doc(cloudDatabase, "tweets", tweet.id), {
      text: newTweet,
    });
  };

  const handleEditModal = () => {
    setIsEditModalOpen((prev) => !prev);

    if (!isEditModalOpen) {
      document.body.style.cssText = "overflow-y: hidden; padding-right: 16px;";
    } else {
      document.body.style.cssText = "";
    }
  };

  const createDate = new Date(tweet.createAt);
  const dateFormat = `${createDate.getFullYear()}년 ${
    createDate.getMonth() + 1
  }월 ${createDate.getDate()}일`;

  return (
    <>
      <div className="relative flex justify-center w-full space-x-4 py-8 border-b-[1px]">
        {tweet.photoURL ? (
          <img
            src={tweet.photoURL}
            alt="user-profile"
            className="w-14 h-14 rounded-full"
          />
        ) : (
          <UserDefaultImage width="60px" height="60px" />
        )}
        <div className="w-2/3">
          <div className="flex w-full">
            <div className="font-bold text-ellipsis w-2/5 whitespace-nowrap overflow-hidden">
              {tweet.displayName}
            </div>
            <div className="w-3/5 text-right whitespace-nowrap">
              {dateFormat}
            </div>
          </div>
          <div>{tweet.text}</div>
          {tweet.attachmentUrl && (
            <img src={tweet.attachmentUrl} alt="tweet-img" />
          )}
          {isOwner && (
            <div
              className="absolute top-0 right-0 p-1 cursor-pointer"
              onClick={handleEditModal}
            >
              <DotsHorizontal />
            </div>
          )}
        </div>
      </div>
      {isEditModalOpen && (
        <EditModal
          toggleEditing={toggleEditing}
          handleEditModal={handleEditModal}
          onDeleteClick={onDeleteClick}
        />
      )}
      {editing && (
        <div className="w-screen h-fit p-2 max-w-4xl">
          <form
            onSubmit={onSubmit}
            className="flex flex-col justify-center items-center py-6 space-y-10"
          >
            <input
              type="text"
              value={newTweet}
              placeholder="수정 내용을 입력하세요."
              onChange={onChange}
              required
              autoFocus
              className="w-[90%] h-10 px-2 border-2"
            />
            <div className="flex space-x-8">
              <input
                type="submit"
                value="수정"
                className="border-2 rounded-full w-24 h-8 text-center cursor-pointer"
              />
              <div
                onClick={toggleEditing}
                className="border-2 rounded-full w-24 h-8 text-center cursor-pointer"
              >
                취소
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Tweet;
