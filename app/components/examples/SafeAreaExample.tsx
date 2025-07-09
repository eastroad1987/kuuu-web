"use client";

import React from "react";
import SafeArea from "@/components/common/SafeArea";

const SafeAreaExample: React.FC = () => {
  return (
    <SafeArea className="flex flex-col h-screen bg-white">
      {/* Header with safe area at the top */}
      <SafeArea
        className="bg-blue-500 text-white p-4"
        top={true}
        bottom={false}
        left={true}
        right={true}
      >
        <h1 className="text-xl font-bold">Safe Header</h1>
      </SafeArea>

      {/* Content area */}
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Content Area</h2>
        <p>
          This content area is not affected by safe area insets directly.
          It will scroll normally between the header and footer.
        </p>
        {/* Add more content as needed */}
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <p key={i} className="my-2">
              Scrollable content item {i + 1}
            </p>
          ))}
      </div>

      {/* Footer with safe area at the bottom */}
      <SafeArea
        className="bg-gray-800 text-white p-4"
        top={false}
        bottom={true}
        left={true}
        right={true}
      >
        <div className="flex justify-between items-center">
          <button className="p-2">Home</button>
          <button className="p-2">Search</button>
          <button className="p-2">Profile</button>
        </div>
      </SafeArea>
    </SafeArea>
  );
};

export default SafeAreaExample;
