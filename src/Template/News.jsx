import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const fetchNews = async (page = 0) => {
  const { data } = await axios.get(
    "https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&page=" +
      page +
      "&apiKey=#key#"
  );
  return data;
};

const News = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const {
    status,
    data,
    error,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
  } = useQuery(["News", page], () => fetchNews(page), {
    keepPreviousData: true,
    staleTime: 5000,
  });

  const handleNextPage = () => {
    setCount(count + 20);
    setPage((old) => (data?.totalResults > count ? old + 1 : old));
  };

  const handlePrevPage = () => {
    setPage((old) => Math.max(old - 1, 1));
  };

  useEffect(() => {
    if (data?.totalResults > count) {
      queryClient.prefetchQuery(["News", page + 1], () => fetchNews(page + 1));
    }
  }, [data, page, queryClient]);

  if (isLoading) {
    return <span>Loading..</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="container mx-auto px-8">
      <h1 className="text-4xl font-bold text-left">ニュース一覧</h1>
      <div className="pb-4" />
      <ul className="list-disc">
        {data.articles.length &&
          data.articles.map((article, index) => (
            <li key={index}>
              <a href={article.url}>{article.title}</a>
            </li>
          ))}
      </ul>
      <div>最新ページ：{page}</div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-xs text-white font-bold py-1 px-2 border border-blue-700 rounded"
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          前ページへ
        </button>
        <span className="pl-3" />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-xs text-white font-bold py-1 px-2 border border-blue-700 rounded"
          onClick={handleNextPage}
        >
          次ページへ
        </button>
      </div>
      {isFetching ? <span> Loading...</span> : null}{" "}
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default News;
