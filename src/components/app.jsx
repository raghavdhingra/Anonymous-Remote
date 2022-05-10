import React from "react";
import { Appwrite } from "appwrite";

// Init your Web SDK
const appwrite = new Appwrite();

appwrite
  .setEndpoint("http://167.71.231.179/v1") // Your Appwrite Endpoint
  .setProject("appwrite-hack"); // Your project ID

const App = () => {
  console.log(appwrite);

  return (
    <>
      <div>yo</div>
    </>
  );
};

export default App;
