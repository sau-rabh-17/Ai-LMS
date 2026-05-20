// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FaPlayCircle } from 'react-icons/fa';
// import { FaArrowLeftLong } from "react-icons/fa6";

// function ViewLecture() {
//   const { courseId } = useParams();
//   const { courseData } = useSelector((state) => state.course);
//   const {userData} = useSelector((state) => state.user)
//   const selectedCourse = courseData?.find((course) => course._id === courseId);

//   const [selectedLecture, setSelectedLecture] = useState(
//     selectedCourse?.lectures?.[0] || null
//   );
//   const navigate = useNavigate()
//   const courseCreator = userData?._id === selectedCourse?.creator ? userData : null;


//   return (
//     <div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">

//       {/* Left - Video & Course Info */}
//       <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
//         {/* Course Details */}
//         <div className="mb-6" >

//           <h1 className="text-2xl font-bold flex items-center justify-start gap-[20px]  text-gray-800"><FaArrowLeftLong  className=' text-black w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>{selectedCourse?.title}</h1>

//           <div className="mt-2 flex gap-4 text-sm text-gray-500 font-medium">
//             <span>Category: {selectedCourse?.category}</span>
//             <span>Level: {selectedCourse?.level}</span>
//           </div>
//         </div>

//         {/* Video Player */}
//         <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-300">
//           {selectedLecture?.videoUrl ? (
//             <video
//               src={selectedLecture.videoUrl}
//               controls
//               className="w-full h-full object-cover"
//               crossOrigin="anonymous"
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full text-white">
//               Select a lecture to start watching
//             </div>
//           )}
//         </div>

//         {/* Selected Lecture Info */}
//         <div className="mt-2">
//           <h2 className="text-lg font-semibold text-gray-800">{selectedLecture?.lectureTitle}</h2>

//         </div>
//       </div>

//       {/* Right - All Lectures + Creator Info */}
//       <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">All Lectures</h2>
//         <div className="flex flex-col gap-3 mb-6">
//           {selectedCourse?.lectures?.length > 0 ? (
//             selectedCourse.lectures.map((lecture, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedLecture(lecture)}
//                 className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${
//                   selectedLecture?._id === lecture._id
//                     ? 'bg-gray-200 border-gray-500'
//                     : 'hover:bg-gray-50 border-gray-300'
//                 }`}
//               >
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-800">{lecture.lectureTitle}</h4>

//                 </div>
//                 <FaPlayCircle className="text-black text-xl" />
//               </button>
//             ))
//           ) : (
//             <p className="text-gray-500">No lectures available.</p>
//           )}
//         </div>

//         {/* Creator Info */}
//         {courseCreator && (
//   <div className="mt-4 border-t pt-4">
//     <h3 className="text-md font-semibold text-gray-700 mb-3">Instructor</h3>
//     <div className="flex items-center gap-4">
//       <img
//         src={courseCreator.photoUrl || '/default-avatar.png'}
//         alt="Instructor"
//         className="w-14 h-14 rounded-full object-cover border"
//       />
//       <div>
//         <h4 className="text-base font-medium text-gray-800">{courseCreator.name}</h4>
//         <p className="text-sm text-gray-600">
//           {courseCreator.description || 'No bio available.'}
//         </p>
//       </div>
//     </div>
//   </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ViewLecture;



////new  content

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { serverUrl } from '../App';
import ReactMarkdown from "react-markdown";

function ViewLecture() {
  const { courseId } = useParams();

  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);

  const selectedCourse = courseData?.find(
    (course) => course._id === courseId
  );

  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );

  const navigate = useNavigate();

  const courseCreator =
    userData?._id === selectedCourse?.creator ? userData : null;

  // AI Chat States
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi 👋 Ask me anything about this lecture.",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  // Ask AI Function
  const askAI = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;

    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post(
        serverUrl + "/api/ai/ask-questions",
        {
          question: `
          Course Title: ${selectedCourse?.title}
          Category: ${selectedCourse?.category}
          Level: ${selectedCourse?.level}

          Current Lecture:
          ${selectedLecture?.lectureTitle}

          User Question:
          ${currentQuestion}
          `,
        }
      );

      const aiMessage = {
        role: "ai",
        text: res.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong while generating response.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">

      {/* Left Section */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">

        {/* Course Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center justify-start gap-[20px] text-gray-800">
            <FaArrowLeftLong
              className='text-black w-[22px] h-[22px] cursor-pointer'
              onClick={() => navigate("/")}
            />

            {selectedCourse?.title}
          </h1>

          <div className="mt-2 flex gap-4 text-sm text-gray-500 font-medium">
            <span>Category: {selectedCourse?.category}</span>
            <span>Level: {selectedCourse?.level}</span>
          </div>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-300">
          {selectedLecture?.videoUrl ? (
            <video
              src={selectedLecture.videoUrl}
              controls
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Select a lecture to start watching
            </div>
          )}
        </div>

        {/* Lecture Info */}
        <div className="mt-2">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedLecture?.lectureTitle}
          </h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit">

        {/* Lectures List */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          All Lectures
        </h2>

        <div className="flex flex-col gap-3 mb-6">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse.lectures.map((lecture, index) => (
              <button
                key={index}
                onClick={() => setSelectedLecture(lecture)}
                className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${selectedLecture?._id === lecture._id
                    ? 'bg-gray-200 border-gray-500'
                    : 'hover:bg-gray-50 border-gray-300'
                  }`}
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    {lecture.lectureTitle}
                  </h4>
                </div>

                <FaPlayCircle className="text-black text-xl" />
              </button>
            ))
          ) : (
            <p className="text-gray-500">
              No lectures available.
            </p>
          )}
        </div>

        {/* Creator Info */}
        {courseCreator && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-3">
              Instructor
            </h3>

            <div className="flex items-center gap-4">
              <img
                src={courseCreator.photoUrl || '/default-avatar.png'}
                alt="Instructor"
                className="w-14 h-14 rounded-full object-cover border"
              />

              <div>
                <h4 className="text-base font-medium text-gray-800">
                  {courseCreator.name}
                </h4>

                <p className="text-sm text-gray-600">
                  {courseCreator.description || 'No bio available.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Chatbot */}
        <div className="mt-6 border-t pt-5">

          <h3 className="text-md font-semibold text-gray-700 mb-4">
            AI Assistant
          </h3>

          {/* Messages */}
          <div className="h-[350px] overflow-y-auto flex flex-col gap-3 bg-gray-50 p-3 rounded-xl border">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.role === "user"
                    ? "bg-black text-white self-end"
                    : "bg-white border text-gray-800 self-start"
                  }`}
              >
                <ReactMarkdown>
                  {msg.text}
                </ReactMarkdown>
              </div>
            ))}

            {loading && (
              <div className="bg-white border text-gray-700 self-start px-4 py-2 rounded-xl text-sm">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 mt-4">

            <input
              type="text"
              placeholder="Ask about this lecture..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAI();
                }
              }}
              className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <button
              onClick={askAI}
              disabled={loading}
              className="bg-black text-white px-5 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
            >
              Send
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewLecture;