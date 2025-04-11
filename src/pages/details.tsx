import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const [details, setDetails] = useState({
    title: "",
    caption: "",
    image: "",
    description: "",
  });
  const { id } = useParams();
  const getBookDetailsByName = async () => {
    const response = await fetch(`http://bookstore-h11a.onrender.com/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data.book);
    setDetails(data.book);
  };

  useEffect(() => {
    getBookDetailsByName();
  }, []);
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="font-bold text-[30px] text-emerald-900">Book Details</h1>
      <div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-emerald-900 text-[25px]">
            {details.title}
          </p>
          <p className="font-semibold text-emerald-900 text-[15px]">
            {details.caption}
          </p>
          <img src={details.image} />
          <p>{details.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
