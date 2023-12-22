import { ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "~/root";

export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const name = formData.get("name")

    let errors : {email?:string, password?:string} = {}
    if (!email) {
        errors.email = "Email is required"
    }

    const createUser = () => {
        prisma.user.create({
            data: {
                email: email as string,
                name: name as string,
                password: password as string,
            }
        })
    }

    return 
}