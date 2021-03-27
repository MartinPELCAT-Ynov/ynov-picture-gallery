import { FormEventHandler, useContext, useEffect, useState } from "react";
import { SessionContext } from "src/contexts/session-context";
import { generateFormDatas } from "src/utils/form-utils";
import {
  CommentFragmentFragment,
  useAddCommentMutation,
} from "src/__generated__";

type CommentDataType = { content: string };

type Props = { entityUuid?: string; comments?: CommentFragmentFragment[] };

export const CommentColumn = ({ comments, entityUuid }: Props) => {
  const { user } = useContext(SessionContext);
  const [addComment] = useAddCommentMutation();
  const [allComments, setAllComments] = useState(comments ?? []);

  useEffect(() => {
    setAllComments(comments ?? []);
  }, [comments]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      const formDatas = generateFormDatas<CommentDataType>(e.currentTarget);
      const { data } = await addComment({
        variables: { content: formDatas.content, id: entityUuid! },
      });
      const commentData = data!.addComment;
      const newComment: CommentFragmentFragment = {
        content: commentData.content,
        uuid: commentData.uuid,
        user: { firstName: user!.firstName },
        createdAt: Date.now().toString(),
      };
      setAllComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error(error);
    }
  };

  if (!entityUuid) return null;
  return (
    <div className="space-y-4 p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          id="content"
          className="rounded-full p-2 w-full"
          placeholder="Message"
        />
      </form>

      <div className="space-y-2">
        {allComments.map((com) => (
          <div className="bg-white rounded-md p-2" key={com.uuid}>
            <div className="flex items-center justify-between">
              <div className="font-semibold text">{com.user?.firstName}</div>
              <div className="text-xs">
                {new Date(parseInt(com.createdAt)).toLocaleDateString()}
              </div>
            </div>
            {com.content}
          </div>
        ))}
      </div>
    </div>
  );
};
