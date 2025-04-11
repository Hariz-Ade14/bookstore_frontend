import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";
import { IoIosStar } from "react-icons/io";

const Home = () => {
  const [books, getBooks] = useState([]);
  // const [ID,setID] = useState("");

  const getBooksFromServer = async () => {
    const response = await fetch("https://bookstore-h11a.onrender.com/allbooks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data.books);
    getBooks(data.books);
  };

  useEffect(() => {
    getBooksFromServer();
  }, []);

  const navigate = useNavigate();
  const getDetails = (id: string) => {
        navigate(`/books/${id}`);
  }
  return (
    <Layout>
      <div className="flex p-4 flex-col gap-5">
        <div className="flex flex-col text-center gap-2">
          <h1 className="text-[30px] text-emerald-900 font-bold">BookWorm</h1>
          <p className="fonr-semibold text-[20px] text-emerald-700">
            Discover GreatMinds from the community
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {books.map(
            (
              { user, userName, image, title, rating, caption, date,_id },
              index
            ) => {
              return (
                <div
                  className="flex flex-col gap-3 bg-emerald-100 p-3 rounded-[10px]"
                  key={index}
                  onClick={() => getDetails(_id)}
                >
                  <div className="flex gap-2 items-center">
                    <img src={user} />
                    <p>{userName}</p>
                  </div>
                  <img src={image} />
                  <h2 className="text-[20px] text-emerald-900 font-bold">
                    {title}
                  </h2>
                  <div className="flex flex-row">
                    {[...Array(rating)].map((_, index) => (
                      <IoIosStar key={index} color="gold" size={20} />
                    ))}{" "}
                  </div>
                  <p className="text-[15px] text-emerald-700">{caption}</p>
                  <p className="text-[15px] text-emerald-700">{date}</p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
