import React, { useState } from "react";
import Aside from "../../Sidebars.js/Aside";
import { Link } from "react-router-dom";
import StatusDropdown from "../../MiniComponents.js/StatusDropdown";
import DueDateDropdown from "../../MiniComponents.js/DueDateDropdown";
import PriorityDropdown from "../../MiniComponents.js/PriorityDropdown";
import AddTask from "../../MiniComponents.js/Modals/AddTask";

const ProjectContents = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [tasks, setTasks] = useState([])

  const addNewTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setModalOpen(false); // Close the modal after adding the task
  };

  return (
    <>
      <Aside />
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg pb-60">
            <div class="flex pb-4 bg-white dark:bg-gray-900 flex-row justify-between">
              <label for="table-search" class="sr-only">
                Search
              </label>
              <div class="relative mt-1">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
              <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li class="inline-flex items-center">
                    <Link to="/dashboard">
                      <div
                        href="/dashboard"
                        class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        <svg
                          class="w-3 h-3 me-2.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Home
                      </div>
                    </Link>
                  </li>
                  <li>
                    <div class="flex items-center">
                      <svg
                        class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <Link to="/projects">
                        <div class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                          Projects
                        </div>
                      </Link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div class="flex items-center">
                      <svg
                        class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                        "Current Name Project"
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>{" "}
              <div>
                <button
                  type="submit"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  class="text-white mr-24 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  + Add Task
                </button>
              </div>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-all-search" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Task
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Due Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Assignee
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <Link to="/groups/view_group">
                      <a className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-1000 dark:text-gray-400 dark:hover:text-white mt-4">
                        <td className="px-6 py-4">{task.taskName}</td>
                      </a>
                    </Link>
                    <td className="px-6 py-4">
                      <StatusDropdown />
                    </td>
                    <td className="px-6 py-4">
                      {task.selectedStartDate} - {task.selectedEndDate}
                    </td>
                    <td className="px-6 py-4">{task.asignee}</td>
                    <td className="px-6 py-4">
                      <PriorityDropdown />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <AddTask closemodal={setModalOpen} addNewTask={addNewTask} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectContents;
