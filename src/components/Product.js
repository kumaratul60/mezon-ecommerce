import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const Max_Rating = 5;
const Min_Rating = 1;

function Product({ id, title, price, description, category, image }) {
  // State is a set of data to manage component and it has sort term memory per component
  // useState take initial state.

  //  Sending the product via an action to the redux store [= basket "slice"]
  const dispatch = useDispatch(addToBasket);

  //const [rating] = useState(5);

  const [rating] = useState(
    Math.floor(Math.random() * (Max_Rating - Min_Rating + 1)) + Min_Rating // to generate random num
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };

    // Sending the product as an action to the  REDUX store (the basket slice)
    dispatch(addToBasket(product)); // dispatching the action
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 growing-hover">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain " />

      <h4 className="my-3 ">{title}</h4>

      <div className="flex">
        {/*    {Array(rating).fill() -> create a array and fill up with empty 
          value and map through those values, it takes 2 parameter, initial value and index */}

        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      {/* mt-2 mb-2 == my-2 */}
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        {/* GBP */}
        <Currency quantity={price} currency="INR" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="mt-auto button">
        Add to basket
      </button>
    </div>
  );
}

export default Product;
