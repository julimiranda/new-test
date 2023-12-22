import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { validate } from "./validate";
import { useActionData } from "@remix-run/react";
import { createUser } from "./user.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const name = String(formData.get("name"));

  const errors = validate(email, name, password);

  if (errors) return json(errors);

  await createUser(email, name, password);

  return redirect("/");
}

export default function SignUp() {
  const email = useActionData<typeof action>();
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <h1 className="font-bold text-2xl">Sign Up</h1>
        <form method="POST">
          <div>
            <div>{email?.email}</div>
            <label htmlFor="email">Email {}</label>
            <div>
              <input
                className="outline outline-1 rounded-sm"
                type="text"
                name="email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <div>
              <input
                className="outline outline-1 rounded-sm"
                type="text"
                name="name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                className="outline outline-1 rounded-sm"
                type="password"
                name="password"
              />
            </div>
          </div>
          <div>
            <button className="bg-blue-400 text-white font-bold w-full rounded-sm mt-5">
              Send
            </button>
          </div>
        </form>
        <div className="mt-5 text-sm">
          <p>
            Already have an account? <span>Log In</span>
          </p>
        </div>
      </div>
    </>
  );
}
