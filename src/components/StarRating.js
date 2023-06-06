import { React, useState } from 'react';
import '../stylings/StarRating.css'
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';
import axios from 'axios';

const StarRating = (props) => {
  const { header, food, idx } = props;

const [rating, setRating] = useState(food.rating);
const [hover, setHover] = useState(food.rating);


const handleClick = (index) => {
    setRating(index)
    const foodRating = {
      Rating: rating
    }
    axios.put(`https://foodie-app-six.vercel.app/rating/${food.food_id}`, foodRating, header)
    .then(response => console.log(response))
}

    return (
        <div className="star-rating">
      {[...Array(5)].map((star, index) => {  index += 1;      
        return (
            <button
            type='button'
            key={index}
            className={index <= ((rating && hover) || hover) ? "on" : "off"}
            onClick={() => handleClick(index)}
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

