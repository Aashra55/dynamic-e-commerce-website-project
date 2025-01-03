import { useState } from "react";

export default function Comments() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [data, setData] = useState<{ name: string; comment: string }[]>([]);
  const handleComment = () => {
    if (name.trim() !== "" && comment.trim() !== "") {
      setData([{ name, comment }, ...data]);
      setName("");
      setComment("");
    }
  };
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate);
  return (
    <div className="w-[100%] h-auto p-[10px] md:p-[50px] flex flex-col">
      <h1 className="text-gray-800 text-2xl font-medium leading-[70px]">
        Give Your FeedBack!
      </h1>
      <input
        className="bg-yellow-100 rounded-lg py-2 px-4 mb-2 focus:outline-none"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="bg-yellow-100 rounded-lg py-2 px-4 mb-2 focus:outline-none"
        type="text"
        placeholder="Leave a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        onClick={handleComment}
        className="bg-yellow-400 hover:bg-yellow-500 w-[150px] md:ml-[80%] ml-[50%] py-2 rounded-lg mb-4 focus:outline-none"
      >
        Submit
      </button>
      {data.map((e,index) => (
        <div key={index} className="bg-yellow-100 px-5 py-3 mt-2 rounded-lg">
          <div className="flex md:gap-[20px] gap-[40px] items-center">
            <p className="md:text-lg text-gray-800 font-medium">{e.name}</p>
            <p className="text-gray-700 md:text-[14px] text-[12px]">{formattedDate}</p>
          </div>
          <p className="mt-2">{e.comment}</p>
        </div>
      ))}
    </div>
  );
}
