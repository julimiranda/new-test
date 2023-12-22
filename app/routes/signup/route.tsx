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
      <div className="flex flex-col min-h-full justify-center px-6 py-12">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-2xl font-bold text-center leading-9 tracking-tight mt-10 text-pink-400">Sign Up</h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST">
            <div className="mt-3">
              <label className="font-bold text-sm" htmlFor="email">Email address</label>
              <div className="mt-2">
                <input type="text" id="email" name="email" className="ring-1 ring-inset ring-gray-300 shadow-sm w-full h-8 rounded-sm"/>
              </div>
            </div>

            <div className="mt-3">
              <label className="font-bold text-sm" htmlFor="email">Name</label>
              <div className="mt-2">
                <input type="text" id="name" name="name" className="ring-1 ring-inset ring-gray-300 shadow-sm w-full h-8 rounded-sm"/>
              </div>
              </div>

              <div className="mt-3">
              <label className="font-bold text-sm" htmlFor="email">Password</label>
              <div className="mt-2">
                <input type="password" id="password" name="password" className="ring-1 ring-inset ring-gray-300 shadow-sm w-full h-8 rounded-sm"/>
              </div>
              </div>
              <div className="mt-7">
                <button className="bg-pink-400 rounded-sm text-white font-bold w-full h-8 hover:bg-pink-700 text-md">Submit</button>
              </div>
          </form>
        </div>
        {/* 
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
        </div> */}
      </div>
  );
}
