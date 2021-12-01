const { MongoClient } = require("mongodb");
// Connection URI
// const uri = "mongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=majority";
const uri = "mongodb+srv://ReiRyerson:Password123@cluster0.e3oft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

class Users {
  // Create a new MongoClient

  async loginUser(usernameArg, passwordArg) {
    try {
      await client.connect();
      const dbo = client.db("mydb");
      // Creating a regex to be able to perform case insensitive search =)
      const nameRegex = '^' + usernameArg + '$';
      const query = { 'username': { '$regex': nameRegex, $options: 'i' } }
      // const query = { username: { $eq: usernameArg } }

      const userDocument = await dbo.collection("Users").findOne(query);

      if (userDocument !== undefined && userDocument !== null && passwordArg === userDocument.password) {
        return { status: 200, data: { user: userDocument.username } }
      }
      else {
        return { status: 401, data: { user: null } }
      }
      // console.log("userDocument: ", userDocument)

    } catch (error) {
      return { status: 401, data: { user: null, error: error.message } }
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  async SignUpUser(usernameArg, passwordArg) {

    try {
      await client.connect();
      const dbo = client.db("mydb");
      const newUser = { username: usernameArg, password: passwordArg }
      const userDocument = await dbo.collection("Users").insertOne(newUser);

      if (userDocument.acknowledged === true) {
        return { status: 200, data: { user: usernameArg } }
      }
      else {
        return { status: 401, data: { user: null } }
      }

    } catch (error) {
      return { status: 401, data: { user: null, error: error.message } }
    }
    finally {
      await client.close();
    }
  }

}

module.exports = Users