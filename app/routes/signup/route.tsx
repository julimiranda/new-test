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
          <form method="post">
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
      
      </div>
  );
}
