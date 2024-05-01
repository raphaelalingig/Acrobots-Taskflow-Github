import React, { useState, useEffect } from "react";
import Aside from "../Sidebars.js/Aside";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import AddGroup from "../MiniComponents.js/Modals/AddGroup";

const Group = () => {
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [dropdownStates, setDropdownStates] = useState([]); // State for each dropdown
  const [projectNameData, setProjectNameData] = useState([]);

  useEffect(() => {
    fetchGroup();
    fetchProjectName();
  }, []);

  const fetchGroup = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/group/");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setGroupData(data);
      // Initialize dropdown states based on the number of projects
      setDropdownStates(Array(data.length).fill(false));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchProjectName = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/groupProject_assoc/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setGroupData(data);
      // Initialize dropdown states based on the number of projects
      setDropdownStates(Array(data.length).fill(false));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addNewProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const toggleDropdown = (index) => {
    setDropdownStates((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <>
      <Aside />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg pb-60">
            <div className="flex pb-4 bg-white dark:bg-gray-900 flex-row justify-between ">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>

              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  id="table-search"
                  className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setAddProjectModal(true);
                }}
                className="mr-24 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                + Add Group
              </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Group Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Members
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupData.map((group, index) => (
                  <tr key={group.id} value={group.id}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <Link to="/groups/view_group">
                      <div className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-1000 dark:text-gray-400 dark:hover:text-white mt-4 cursor-pointer">
                        <td className="px-6 py-4">{group.name}</td>
                      </div>
                    </Link>
                    <td className="px-6 py-4">
                      <div className="relative inline-block text-left">
                        <button
                          id={`dropdownButton-${index}`}
                          onClick={() => toggleDropdown(index)}
                          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                          type="button"
                        >
                          Members
                          <svg
                            className={`w-2.5 h-2.5 ms-3 ${
                              dropdownStates[index]
                                ? "transform rotate-180"
                                : ""
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </button>
                        {dropdownStates[index] && (
                          <div
                            id={`dropdown-${index}`}
                            className="z-10 absolute mt-1 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                          >
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby={`dropdownButton-${index}`}
                            >
                              {group.members.map((member, memberIndex) => (
                                <li key={memberIndex}>
                                  <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    {member}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">{group.projects}</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        EDIT
                      </button>
                      <button
                        type="button"
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {addProjectModal && (
            <AddGroup
              closemodal={setAddProjectModal}
              addNewProject={addNewProject}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Group;
