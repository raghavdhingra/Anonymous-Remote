import { Appwrite } from "appwrite";

const appwrite = new Appwrite();
appwrite.setEndpoint("http://167.71.231.179/v1").setProject("appwrite-hack");

export const addUserEvent = async (event) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const data = { ...user, event };
  return await appwrite.database.createDocument(
    "appwrite-hack-robo-collection",
    "unique()",
    data
  );
};

export default appwrite;
