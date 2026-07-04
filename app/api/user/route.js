
import { connectDB } from "../../../lib/connectDB";
import { getLoggedInUser } from "../../../lib/auth.js";


export async function GET() {
  await connectDB();
  
  const user = await getLoggedInUser()
if (user instanceof Response) {
  return user;
}
 
  return Response.json(user);
}

