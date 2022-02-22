import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";

const Home = () => {
  // user useQuery hook to make a query request
  // @apollo/client provides loading to indicate
  // query is not done.
  // When it's done it will be stored in the destructed data
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // optional chaining.  Negates the need to see if an object exisats
  // before accessing it's properties
  // so if data exists store it in the thoughts constant
  // if no data then store it to an empty thoughts[]
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
