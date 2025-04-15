"use client";

import { PlaceholdersAndVanishInput } from "../../components/ui/placeholders-and-vanish-input";

export function SeachInput({
  onSearchChange,
}: {
  onSearchChange: (value: string) => void;
}) {
  const placeholders = [
    "Discover trends — search by company or stock symbol…",
    "Which stock are you watching today?",
    "Real-time updates? Start with a stock name…",
    "Get insights instantly — try “Coforge” or “MSFT”…",
    "Track your favorite stock — start typing…",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="w-full flex flex-col justify-center  items-center">
      <h1 className="mb-5 text-xl sm:text-5xl dark:text-white text-black">
        Search. Track. Win the Market.
      </h1>
      <h2 className="mb-8 dark:text-white">
        Find everything you need to stay ahead, all in one simple search.
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
