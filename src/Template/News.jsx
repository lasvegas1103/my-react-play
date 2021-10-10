import React from "react";
import { useQuery } from "react-query";

const News = () => {
  const { data, isLoading, isError, error } = useQuery("users", async () => {
    const res = fetch(
      "https://newsapi.org/v2/everything?q=ビットコイン&apiKey=#key#"
    ).then((res) => res.json());

    return res;
  });

  console.log(data);

  if (isLoading) {
    return <span>Loading..</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ul>
      {data.articles.length &&
        data.articles.map((article) => (
          <li key={article.name}>{article.title}</li>
        ))}
    </ul>
  );
};

export default News;
