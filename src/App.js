import Axios from "axios";
import React from "react";
import { useInfiniteQuery } from "react-query";
import "./App.css";

const fetchData = async (key, page = 1) => {
  // console.log("key >>>", key);
  console.log("page >>>", page);
  const resp = await Axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
  );
  return resp.data;
};

function App() {
  const {
    data,
    status,
    fetchMore,
    canFetchMore,
    isFetching,
  } = useInfiniteQuery("getPosts", fetchData, {
    getFetchMore: (lastGroup) => {
      console.log("lastGroup >>>", lastGroup);
      const nextPage = lastGroup.length / 5 + 1;
      console.log("nextPage >>>", nextPage);
      return nextPage;
    },
    refetchOnWindowFocus: false,
  });

  // console.log("data >>>", data);

  const posts = data?.flatMap((data) => data);

  // console.log("posts >>>", posts);
  console.log("canFetchMore >>>", canFetchMore);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li className="post" key={post.id}>
            <h3>{post.id}</h3>
            <p>{post.title}</p>
          </li>
        ))}
      </ul>
      <button
        disabled={!canFetchMore || isFetching}
        onClick={fetchMore}
        className="btn"
      >
        Fetch more
      </button>
    </div>
  );
}

export default App;
