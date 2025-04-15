"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../components/ui/animated-modal";
import { SignupFormDemo } from "./signUpForm";
import { SeachInput } from "../forms/search-input";
import { useState } from "react";

export function SearchModal() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    console.log("Search value from child:", value);
  };
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger>
          <SignupFormDemo />
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <div className="flex flex-col gap-4">
              <div className="w-full flex items-center gap-2">
                <SeachInput onSearchChange={handleSearchChange} />
              </div>
            </div>
          </ModalContent>
          {searchValue && (
            <ModalFooter className="gap-4">
              <p className="text-white">Search value: {searchValue}</p>
              <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                Cancel
              </button>
              <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                Book Now
              </button>
            </ModalFooter>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}
