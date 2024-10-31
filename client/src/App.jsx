import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import fish from "./assets/png/fish.png";
import beef from "./assets/png/beef.png";
import chicken from "./assets/png/fried-chicken.png";
import foodImage from "./assets/png/food.png";


function App() {
const [food, setfood] = useState([]);
const [ingredient, setIngredient] = useState({});

const {id, type, ingredients} = ingredient;
const {protein, salsa, toppings} = ingredients || {};
 
  const items = [
    { id: "fish", url: fish },
    { id: "beef", url: beef },
    { id: "chicken", url: chicken },
  ];

  const fetchApi = () => {
    try {
      axios
        .get("http://localhost:3000")
        .then((response) => setfood(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    console.log(id);
    try {
      axios
        .get(`http://localhost:3000/recipe/${id}`)
        .then((response) => setIngredient(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [ingredient]);

  return (
    <div className="bg h-[100vh]">
      <div className="h-[30px]"></div>
      <div className=" flex w-[100%] justify-center items-center content-center ">
      <div className="flex justify-center items-center bg-white p-1 w-[40%]  ">
        <div className="">
          <h1 className="text-[#03a9f4f] text-center text-[50px] font-bold">Taco</h1>
        </div>
        <div className="">
          {" "}
          <img className="h-[100px]" src={foodImage} alt="" />
        </div>
      </div>
      </div>
      

      <div className="flex gap-5 justify-center items-center my-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white p-2 rounded-full w-[7%] "
            onClick={() => handleClick(item.id)}
          >
            {" "}
            <img src={item.url} alt="" />
          </div>
        ))}
      </div>
      <div className="flex bg-white text-black justify-center w-[100%]">
        <div>
        <h2 className="text-[#03a9f4f] text-[24px] font-bold">{ingredient.name}</h2>
        <h3>Ingredients</h3>
        {
          toppings && toppings.map((item, index)=>(
            <div key={index}>
              <div className="flex gap-2">
              <p >{item.name}</p>
              <p>-</p>
              <p>{item.quantity}</p>
              </div>
                 
            </div>
        
          ))
        }
     </div>
      </div>
    </div>
  );
}

export default App;
