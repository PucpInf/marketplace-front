/**
 * rating star component
 */
/* eslint-disable */
import React from 'react';
import { getAverageRating } from "@helpers";

function createStars(avg){
   var stars = [];
   for ( let i = 1 ; i <= 5 ; i++) {
      if((avg - i) > 0 ){
         stars.push({select:"active",icon: "star"});
         if((avg - i) > 0 && (avg - i) < 1){
            stars.push({select:"active",icon: "star_half"});
         }
      }
      else{
         stars.push({icon: 'star'});
      }  
   }
   return stars;
}

export default function RatingStar(props) {
   const {ratingAvg} = props;
   // const avg = getAverageRating(ratings);
   var avg;
   if(!ratingAvg){
      avg = 0;
   }
   else{
      avg = ratingAvg;
   }
   const stars = createStars(avg);
   return (
      <div className="rating-star">
         <ul className="mb-0">
            {stars.map((star, index) => {
               return (
                  <li key={index} className={star.select}>
                     <i className="material-icons">{star.icon}</i>
                  </li>
               )
            })}
         </ul>
      </div>
   )
}