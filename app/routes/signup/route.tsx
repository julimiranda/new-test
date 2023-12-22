import { ActionFunctionArgs, json, redirect } from "@remix-run/node"
import { validate } from "./validate"
import { prisma } from "~/root"
import { useActionData } from "@remix-run/react"

export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData()
    const email = String(formData.get("email"))
    const password = String(formData.get("password"))
    const name = String(formData.get("name"))

    const errors = validate(email, name, password)

    if (errors){
        return json(errors)
    } else if (!errors) {
         
    const createUser = (email?:string, name?:string, password?:string) => {
        prisma.user.create({
            data: {
                email: email as string,
                name: name as string,
                password: password as string,
            }
        })
    }
}
    return redirect("/")
}

export default function SignUp(){
    const actionData = useActionData<typeof action>()
    const emailError = actionData?.errors?.email
    const nameError = actionData?.errors?.name 
    const passwordError = actionData?.errors?.password 

    return (
        <>
        <div className="flex flex-col min-h-screen justify-center items-center">
            <h1 className="font-bold text-2xl">Sign Up</h1>
            <form method="POST">
                <div>
                    <label htmlFor="email">Email {" "} { }</label>
                    <div>
                    <input className="outline outline-1 rounded-sm" type="text" name="email" />
                    </div>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <div>
                    <input className="outline outline-1 rounded-sm" type="text" name="name" />
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div>
                    <input className="outline outline-1 rounded-sm" type="password" name="password" />
                    </div>
                </div>
                <div>
                    <button className="bg-blue-400 text-white font-bold w-full rounded-sm mt-5">Send</button>
                </div>
            </form>
            <div className="mt-5 text-sm">
                <p>Already have an account? <span>Log In</span></p>
            </div>
            </div>
        </>
    )
}