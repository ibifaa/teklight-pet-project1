import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import fish from "./assets/png/fish.png";
import beef from "./assets/png/beef.png";
import chicken from "./assets/png/fried-chicken.png";
import foodImage from "./assets/png/food.png";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

function App() {
  const notify = () => toast("Choose a protein to load ingredients");
 

const [food, setfood] = useState([]);
const [ingredient, setIngredient] = useState({});
const currentYear = new Date().getFullYear();

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
        .get("https://teklight-pet-project1-1.onrender.com")
        .then((response) => setfood(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    console.log(id);
    try {
      axios
        .get(`https://teklight-pet-project1-1.onrender.com/recipe/${id}`)
        .then((response) => setIngredient(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    notify();
    fetchApi();

   
  
    
  }, [ingredient]);

  return (
    <div className="bg h-[100vh]">
    
      <div className="h-[30px]"></div>
      <ToastContainer/>
      <div className=" flex w-[100%] justify-center items-center content-center ">
      <div className="flex justify-center items-center bg-white p-1 md:w-[40%] w-[100%]">
        <div className="">
          <h1 className="text-[#03a9f4f] text-center text-[50px] font-bold">Taco Recipes</h1>
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
            className="bg-white p-2 rounded-full md:w-[7%] w-[15%] "
            onClick={() => handleClick(item.id)}
          >
            {" "}
            <img src={item.url} alt="proteins" />
          </div>
        ))}
      </div>
      <div className="flex bg-white text-black justify-center w-[100%]">
        <div className="p-5">
        <h2 className="text-[#03a9f4f] text-[24px] font-bold">{ingredient.name}</h2>
        <h3 className="font-bold leading-6">List of Ingredients</h3>
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
      <div className="flex flex-col justify-center mt-[80px] bg-white p-2 md:w-[20%] w-[100%] ">
      <p className="font-bold  text-center">Coded with love @ teklight</p>
      <p className="text-[10px] text-center  font-bold">teklight @ {currentYear}</p>
      <p></p>
      </div>
  
    </div>
  );
}

export default App;
