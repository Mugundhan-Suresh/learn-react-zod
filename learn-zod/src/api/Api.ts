import { z } from "zod";

const getUserSchema = z.object({
    limit: z.number(),
    offset: z.number()
})

type IUserFilters = z.infer<typeof getUserSchema>;

export async function getUsers(filters: IUserFilters){

    const results = getUserSchema.safeParse(filters)
    console.log(results)

}

// Define a schema for the API response
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
});

// Function to fetch user data
export async function fetchUserData(userId: number) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const data = await response.json();

    // Validate the API response
    const result = userSchema.safeParse(data);

    if (result.success) {
      console.log("Valid user data:", result.data);
    } else {
      console.error("Invalid response data:", result.error.format());
    }
  } catch (error) {
    console.error("API request failed:", error);
  }
}
