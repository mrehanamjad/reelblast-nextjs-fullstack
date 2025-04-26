"use client";
import ScreenLoader from "@/components/ScreenLoader";
import SearchTabs from "@/components/SearchTabs";
import { apiClient, SearchResponse } from "@/lib/api-client";
import { Button, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Search } from "lucide-react";

import React, { useState } from "react";

function page() {
    const [searched, setSearched] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if(searchText.trim() === "") {
      setLoading(false);
      notifications.show({
        title: "Error",
        message: "Please enter a search term",
        color: "red",
      });
      return;
    }
    
    try {
      const data: SearchResponse = await apiClient.search(searchText.trim());
      setSearchResult(data);
        setSearched(searchText);
      setLoading(false);
    } catch (error) {
      console.error("Error searchText:", error);
      setLoading(false);
      notifications.show({
        title: "Error",
        message: "Failed to search",
        color: "red",
      });
    }
  };

  return (
    <div className="min-h-screen max-w-7xl w-full py-2 px-5 mx-auto bg-gray-50 dark:bg-black/90">
      <h1 className="text-4xl font-bold mt-8 px-8 ">Search</h1>
      <form className="flex  gap-2 w-full px-8 my-4 " onSubmit={submit}>
        <TextInput
          size="lg"
          className="mb-4 w-full"
          leftSectionPointerEvents="none"
          leftSection={<Search size={24} />}
          type="text"
          placeholder="Search for videos, users..."
          required
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button size="lg" type="submit">
          Search..
        </Button>
      </form>

      <main>
        {loading && (
          <div className="flex justify-center items-center h-64">
            <ScreenLoader />
          </div>
        )}
        
        {searchResult && searchResult.videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-xl font-medium text-gray-600 dark:text-white">
              No results found for "{searched}"
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Try searching for something else.
            </p>
          </div>
        ) : searched && (
          <SearchTabs data={searchResult!} loading={loading} />
        )}
      </main>
    </div>
  );
}

export default page;
