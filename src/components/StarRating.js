import { React, useState } from 'react';
import '../stylings/StarRating.css'
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';
import axios from 'axios';

const StarRating = (props) => {
  const { header, food, idx, id, setFood } = props;

  const [rating, setRating] = useState(food.rating);
  const [hover, setHover] = useState(food.rating);


  const handleClick = (rating) => {
    // console.log(setFood())
    console.log(food)
    console.log(food.food_id)
    const foodRating = {
      Rating: rating
    }
    axios.put(`https://foodie-app-six.vercel.app/food/rating/${id}`, foodRating, header)
      .then(response => console.log(response))
      .catch(error => console.error('There was an error!', error))
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type='button'
            key={index}
            className={index <= ((rating && hover) || hover) ? "on" : "off"}
            onClick={() => {
              setFood({
                [rating]: food.rating
              });
              handleClick(rating)
            }}
            onMouseEnter={() => {
              setHover(index)
              setRating(index)
            }}
          // onMouseLeave={() => setHover(rating)}
          >
            <span className="star">
              <StarPurple500SharpIcon fontSize='medium' />
            </span>
          </button>
        );
      })}
    </div>
  )
}

export default StarRating;

