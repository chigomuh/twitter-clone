import { signOut, User, updateProfile } from "firebase/auth";
import { authService, cloudDatabase } from "firebaseConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDefaultImage from "images/UserDefaultImage";
import FetchLoading from "components/FetchLoading";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import EditImage from "images/EditImage";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Tweet from "components/Tweet";
import { TweetData } from "./Home";

interface Props {
  user: User;
  refreshUser: () => void;
}

const Profile = ({ user, refreshUser }: Props) => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userTweets, setUserTweets] = useState<TweetData[]>([]);
  const userDisplayName = user.displayName
    ? user.displayName
    : user.email?.split("@")[0];

  const navigator = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userDisplayName);

  const onLogOutClick = () => {
    try {
      signOut(authService).then(() => {
        navigator("/", { replace: true });
        refreshUser();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setNewDisplayName(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (authService.currentUser && userDisplayName !== newDisplayName) {
      setLoading(true);
      updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      })
        .then(() => {
          refreshUser();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          setEditProfileOpen(false);
        });
    }
  };

  const onClickEditDisplayName = () => {
    setEditProfileOpen((prev) => !prev);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;

    if (files) {
      const currentFile = files[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        if (typeof reader.result === "string") {
          const result = reader.result;

          if (authService.currentUser && result !== user.photoURL) {
            setLoading(true);

            const attachmentRef = ref(getStorage(), `${user.uid}/profile`);

            if (result) {
              await uploadString(attachmentRef, result, "data_url");

              const photoURL = await getDownloadURL(attachmentRef);

              updateProfile(authService.currentUser, {
                photoURL,
              })
                .then(() => {
                  refreshUser();
                })
                .catch((error) => {
                  console.error(error);
                })
                .finally(() => {
                  setLoading(false);
                });
            }
          }
        }
      };
      reader.readAsDataURL(currentFile);
    }
  };

  useEffect(() => {
    const q = query(
      collection(cloudDatabase, "tweets"),
      where("uid", "==", user.uid),
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

      setUserTweets(tweetArray);
    });
  }, [user.uid]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="p-4">
          {loading && <FetchLoading />}
          <div className="flex justify-between items-end">
            <div className="flex items-end">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <div>
                  <UserDefaultImage width="100px" height="100px" />
                </div>
              )}
              <label htmlFor="profileImageInput">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profileImageInput"
                  onChange={onFileChange}
                />
                <div className="cursor-pointer">
                  <EditImage />
                </div>
              </label>
            </div>
            <button
              className="rounded-full bg-[#03A9F4] text-white font-bold w-28 h-8"
              onClick={onLogOutClick}
            >
              로그아웃
            </button>
          </div>
          <div className="flex space-x-2 mt-10">
            <div className="text-xl font-bold">{userDisplayName}</div>
            {!editProfileOpen && (
              <button onClick={onClickEditDisplayName}>
                <EditImage />
              </button>
            )}
          </div>
          {editProfileOpen && (
            <form onSubmit={onSubmit} className="mt-4 space-y-6">
              <div className="w-full flex justify-center items-center">
                <input
                  type="text"
                  placeholder="닉네임"
                  onChange={onChange}
                  value={newDisplayName}
                  className="border-2 w-[90%] px-2 h-10 text-center"
                  autoFocus
                />
              </div>
              <div className="flex justify-center space-x-8">
                <div
                  onClick={onClickEditDisplayName}
                  className="rounded-full border-2 w-24 text-center cursor-pointer"
                >
                  취소
                </div>
                <input
                  type="submit"
                  value="변경하기"
                  className="rounded-full border-2 w-24 text-center cursor-pointer"
                />
              </div>
            </form>
          )}
        </div>
        <div className="h-max flex justify-center items-center font-bold">
          {userTweets.length !== 0 ? (
            `작성한 트윗`
          ) : (
            <span className="mt-20 text-xl">새로운 트윗을 작성해보세요!</span>
          )}
        </div>
        {userTweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} isOwner={true} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
