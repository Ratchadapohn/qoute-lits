// "use client";
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

// const QuoteLiked = () => {
//   const [likedQuotes, setLikedQuotes] = useState<
//     { quote: string; count: number }[]
//   >([]);

//   useEffect(() => {
//     // Retrieve liked quotes from localStorage
//     const storedLikes = localStorage.getItem("likedQuotes");
//     const likedIndices = storedLikes ? JSON.parse(storedLikes) : [];

//     // Fetch quotes to display
//     const fetchLikedQuotes = async () => {
//       // Replace this with your actual fetch function or logic to get quotes
//       const response = await fetch("/api/quotes");
//       const quotes = await response.json();

//       const likedQuoteDetails = likedIndices.map((index: number) => ({
//         quote: quotes[index]?.quote || "",
//         count: likedIndices.filter((i: number) => i === index).length,
//       }));

//       setLikedQuotes(likedQuoteDetails);
//     };

//     fetchLikedQuotes();
//   }, []);

//   const chartData = {
//     labels: likedQuotes.map((q) => q.quote),
//     datasets: [
//       {
//         label: "Likes Count",
//         data: likedQuotes.map((q) => q.count),
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div id="quote-liked">
//       <h1>Liked Quotes</h1>
//       <div>
//         <Bar
//           data={chartData}
//           options={{
//             plugins: {
//               title: {
//                 display: true,
//                 text: "Quotes Ranked by Likes",
//               },
//             },
//             responsive: true,
//             maintainAspectRatio: false,
//           }}
//         />
//       </div>
//       <div>
//         <h2>Ranking of Liked Quotes</h2>
//         <ol>
//           {likedQuotes
//             .sort((a, b) => b.count - a.count)
//             .map((quote, index) => (
//               <li key={index}>
//                 "{quote.quote}" - {quote.count} likes
//               </li>
//             ))}
//         </ol>
//       </div>
//     </div>
//   );
// };

// export default QuoteLiked;
