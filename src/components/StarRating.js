import { React, useState } from 'react';
import '../stylings/StarRating.css'
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';

const StarRating = () => {

const [rating, setRating] = useState(0);
const [hover, setHover] = useState(0);

    return (
        <div className="star-rating">
      {[...Array(5)].map((star, index) => {  index += 1;      
        return (
            <button
            type='button'
            key={index}
            className={index <= ((rating && hover) || hover) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            >      
          <span className="star">
            <StarPurple500SharpIcon fontSize='medium'/>
            </span>
          </button>         
        );
      })}
    </div>  
    )
}

export default StarRating;

