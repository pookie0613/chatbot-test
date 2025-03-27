import React from 'react';  

interface StarRatingProps {  
  rating: number;  
  comment: string;
  handleChangeComment: (value: string) => void;
  starClick: (rating: number) => void;  
}  

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating,
  comment,
  handleChangeComment,
  starClick,
}) => {  
  return (  
    <div className="flex flex-col cursor-pointer">  
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (  
          <span  
            key={star}  
            onClick={() => starClick(star)}  
            className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}  
          >  
            ★  
          </span>  
        ))}
      </div>
      <textarea  
        className="mt-2 p-2 border rounded"  
        rows={4}  
        placeholder="Leave a comment..."  
        value={comment}  
        onChange={(e) => handleChangeComment(e.target.value)}
      />
    </div>  
  );  
};