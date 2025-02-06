import React, { useState, useMemo } from "react";
import { View, Collection, Text, SearchField } from "@aws-amplify/ui-react";
import { mockData } from "../data/books";
import { BookCard } from "../components/BookCard";

export const BooksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return mockData.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <View padding="1.5rem">
      <View maxWidth="1280px" margin="0 auto">
        <View marginBottom="2rem">
          <View position="relative">
            <SearchField
              placeholder="Search books by title or author..."
              value={searchQuery}
              onClear={() => setSearchQuery("")}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="large"
              label="Search"
            />
          </View>
        </View>

        <Collection
          type="grid"
          items={filteredBooks}
          templateColumns={{
            base: "1fr",
            medium: "1fr 1fr",
            large: "1fr 1fr 1fr",
          }}
          gap="1.5rem"
        >
          {(book) => <BookCard key={book.id} book={book} />}
        </Collection>

        {filteredBooks.length === 0 && (
          <View textAlign="center" padding="3rem">
            <Text color="gray.60">No books found matching your search.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default BooksPage;
