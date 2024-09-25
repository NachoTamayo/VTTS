import React from "react";
interface CommentsProps {
  comment?: string;
}

export const Comments: React.FC<CommentsProps> = (props) => {
  return (
    <div
      className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-gray-800"
      dangerouslySetInnerHTML={{ __html: props.comment || "" }}
    />
  );
};
