import dbConnection from "../utils/mongo";

async function loginFunction () {
  const db = await dbConnection();
  const collections = await db.listCollections().toArray();
  
  console.log(collections)

  collections.forEach(collection => {
    console.log('Collection Name:', collection.name);
  });

  console.log(process.env.MONGODB_URI)
}

function Login() {
    loginFunction ();

    return (
      <h1>Logged In!</h1>
    );
  }

export default Login;
