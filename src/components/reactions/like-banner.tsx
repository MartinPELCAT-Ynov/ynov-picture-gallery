import clsx from "clsx";
import { useEffect, useState } from "react";
import { useToggleLikeMutation } from "src/__generated__";

type Props = { likes: number; liked: boolean; entityUuid?: string };

export const LikeBanner = ({ likes, liked, entityUuid }: Props) => {
  const [likesCount, setLikesCount] = useState(likes);
  const [likedState, setLikedState] = useState(liked);

  const [toggleLike] = useToggleLikeMutation();

  useEffect(() => {
    setLikesCount(likes);
  }, [likes]);

  useEffect(() => {
    setLikedState(liked);
  }, [liked]);

  useEffect(() => {
    if (likedState && !liked) {
      setLikesCount((prev) => prev + 1);
    } else if (!likedState && !liked) {
      setLikesCount((prev) => (prev - 1 < 0 ? 0 : prev - 1));
    }
  }, [likedState]);

  const handleLikeClick = async () => {
    try {
      await toggleLike({ variables: { id: entityUuid! } });
      setLikedState((prev) => !prev);
    } catch (error) {}
  };

  if (!entityUuid) return null;
  return (
    <div
      role="button"
      className="bg-gray-200 flex divide-x divide-indigo-500"
      onClick={handleLikeClick}
    >
      <div
        className={clsx(
          likedState && "bg-indigo-500 text-white",
          "font-medium text-center w-1/2 p-2"
        )}
      >
        {likedState ? "Liked" : "Like"}
      </div>
      <div className="font-medium text-center w-1/2 p-2">
        {likesCount} likes
      </div>
    </div>
  );
};
