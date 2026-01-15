import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="relative w-full min-h-screen">
        {/* Dark Horizon Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
          }}
        />
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center z-1 ">
          <img
            src="404_NotFound.png"
            alt="not found"
            className="max-w-full mb-6 w-96"
          />{" "}
          <p className="text-xl font-semibold">
            You are entering the same forbidden area
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 mt-6 font-medium text-white transition shadow-md rounded-2xl bg-primary hover:bg-primary-dark"
          >
            Return to home page
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
