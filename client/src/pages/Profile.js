import React from "react";
// Redirect lets us redirect the user to another
// route within the app, but uses react's
// ability to not reload
import { useParams, Redirect } from "react-router-dom";

import ThoughtList from "../components/ThoughtList";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import FriendList from "../FriendList";
import Auth from "../utils/auth";
//import { Redirect, useParams } from "react-router-dom";

const Profile = () => {
  // get username from params
  const { username: userParam } = useParams();
  // Query either me or another user
  // if there is a value in user param query that user
  // if there is none..query myself
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // handles each type of user
  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is logged in users
  // If I click my own username take me to /profile not /profile/:username
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          {/* if /profile/username  or use your */}
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
