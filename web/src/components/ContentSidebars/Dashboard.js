import React from "react";
import Aside from "../Sidebars.js/Aside";

const Dashboard = () => {
  return (
    <>
      <Aside />

      <div class="p-4 sm:ml-64 bg-gray-200">
        <div class="p-4 border-2 border-gray-200 bg-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="grid grid-cols-2 gap-4 mb-4 bg-">
            <div class="flex items-center  justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-black-50 dark:text-gray-500">
                Open Tasks: 10
              </p>
            </div>
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-black-50 dark:text-gray-500">
                Closed Tasks: 0
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex rounded bg-gray-50 h-48 dark:bg-gray-800">
              <div class="text-xl m-10 text-black-50 dark:text-gray-500">
                <p>Projects:</p>{" "}
                <div className="ml-24">
                  <p> sample project</p>
                  <p> sample second project</p>
                </div>
              </div>
            </div>
            <div class="flex rounded bg-gray-50 h-48 dark:bg-gray-800">
              <p class="text-xl m-10 text-black-50 dark:text-gray-500">
                <p>Available Tasks:</p>{" "}
                <div className="ml-24">
                  <p> sample task</p>
                  <p> sample second task</p>
                </div>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                class="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
