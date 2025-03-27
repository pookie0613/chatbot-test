import React, { useState } from 'react';
import { Message } from '../types';
import { Icon } from '@iconify/react';
import { FilePreview } from './file-preview';
import { StarRating } from './star-rating';

interface ChatMessageProps {
  message: Message;
  handleMessageVote: (id: number, liked?: boolean, rating?: number, comment?: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  handleMessageVote,
}) => {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleStarClick = (rating: number) => {  
    setUserRating(rating);
  };

  const handleChangeComment = (value: string) => {  
    setComment(value);
  };

  const handleThumbUpClick = () => {
    setIsRatingModalOpen(true);
  };

  const handleSubmit = () => {
    if (message.id && userRating) {
      handleMessageVote(message.id, true, userRating, comment);
      setIsRatingModalOpen(false);
    } else if (!userRating) {
      setError('Please select at least one star');
    }
  };

  const handleThumbDownClick = () => {
    if (message.id) {
      handleMessageVote(
        message.id,
        message.liked === false ? undefined : false
      );
    }
  };

  return (
    <div className="mb-4">
      <div
        className={`text-lg p-3 rounded-lg ${
          message.role === 'user'
            ? 'text-right bg-blue-200 ml-5'
            : 'text-left border border-gray-300 mr-5'
        }`}
      >
        {message.files && message.files?.length > 0 && (
          <div className="flex mb-2 gap-2">
            {message.files.map((file) => (
              <div key={file.id} className="mt-2 p-2 bg-gray-100 rounded-lg">
                <FilePreview file={file} />
              </div>
            ))}
          </div>
        )}

        {message.content}

        {message.role === 'assistant' && (
          <div className="flex justify-between border-t-2 border-gray-300 mt-2 pt-2 text-xs text-gray-500">
            Was this response helpful?
            <div className="flex items-center gap-2">
              <Icon
                className={`cursor-pointer ${
                  message.liked ? 'text-yellow-500' : ''
                }`}
                icon={
                  message.liked
                    ? 'material-symbols:thumb-up'
                    : 'material-symbols:thumb-up-outline'
                }
                width="16"
                height="16"
                onClick={handleThumbUpClick}
              />
              <Icon
                className={`cursor-pointer ${
                  message.liked === false ? 'text-yellow-500' : ''
                }`}
                icon={
                  message.liked === false
                    ? 'material-symbols:thumb-down'
                    : 'material-symbols:thumb-down-outline'
                }
                width="16"
                height="16"
                onClick={handleThumbDownClick}
              />
            </div>
          </div>
        )}

        {isRatingModalOpen && (  
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[9999]">
            <div className="flex flex-col bg-white p-8 rounded-lg">  
              <h2 className="text-lg mb-2">Rating!</h2>  
              <StarRating
                rating={userRating}
                comment={comment}
                handleChangeComment={handleChangeComment}
                starClick={handleStarClick}
              />
              {
                error && <div className="text-red-500">{error}</div>
              }
              <div className="flex justify-between space-x-2 mt-4">
                <button
                  onClick={() => setIsRatingModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button  
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleSubmit}
                >  
                  Submit  
                </button>
              </div>
            </div>  
          </div>  
        )}  
      </div>
    </div>
  );
};
