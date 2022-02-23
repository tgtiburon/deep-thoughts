import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";
// import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import FriendList from "../FriendList";

const Home = () => {
  // user useQuery hook to make a query request
  // @apollo/client provides loading to indicate
  // query is not done.
  // When it's done it will be stored in the destructed data
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extra `data` from the `use query` hook's
  // response and rename it `userData to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // optional chaining.  Negates the need to see if an object exists
  // before accessing it's properties
  // so if data exists store it in the thoughts constant
  // if no data then store it to an empty thoughts[]
  const thoughts = data?.thoughts || [];
  // console.log(thoughts);

  const loggedIn = Auth.loggedIn();
  // if not logged in span whole page
  // if logged in span only 8 and leave 4 for side panel
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
