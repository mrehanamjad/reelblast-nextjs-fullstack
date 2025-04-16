// "use client";
// import React, { useRef, useState, useEffect } from 'react';

// function Page() {
//   const [count, setCount] = useState(1);
//   const countRef = useRef(count); // Initialize useRef with the initial state value

//   useEffect(() => {
//     countRef.current = count; // Update useRef whenever 'count' changes
//   }, [count]);

//   const increment = () => {
//     setCount(prevCount => prevCount + 1);
//   };

//   const showPreviousCount = () => {
//     alert(`Previous count was: ${countRef.current}`);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-8">Using useRef Example</h1>
//       <div className="text-xl mb-4">
//         Current Count: <span className="font-semibold">{count}</span>
//       </div>
//       <div className="flex space-x-4">
//         <button
//           onClick={increment}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Increment
//         </button>
//         <button
//           onClick={showPreviousCount}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Show Previous Count
//         </button>
//       </div>
//       <div className="mt-8 p-4 bg-white rounded shadow-md w-96">
//         <p className="text-sm text-gray-600">
//           <strong>Explanation:</strong>
//           <br />
//           - We use <code>useRef</code> to store the previous value of the count.
//           <br />
//           - <code>countRef.current</code> always holds the latest rendered value of <code>count</code>.
//           <br />
//           - This is useful when you need to access a value from a previous render without causing a re-render.
//           <br />
//           - In this example, clicking "Show Previous Count" displays the value of <code>count</code> from the previous render.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Page;



"use client";
import { Button } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';

function Page() {
  const [a, sa] = useState(1);
  const b = useRef(2); // Use useRef for 'b'

  console.log("hello");
  const refB = useRef(null); // useRef for the button element

  function inc() {
    sa((prev) => prev + 1);
    b.current = b.current + 1; // Update using .current
    console.log("b", b.current);
  }


  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">The Value Is:</h1>
        <div className="text-6xl font-extrabold text-indigo-600 animate-pulse mb-4">
          {a}
        </div>
        <button ref={refB} className="text-4xl font-extrabold text-indigo-600 mb-4">
          B-curr: {b.current}
        </button>
        <Button onClick={inc}>Increase the value</Button>
      </div>
    </div>
  );
}

export default Page;