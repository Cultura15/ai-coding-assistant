import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// interface User{
//    email: string;
//    password: string;
// }

// const users: User[] = [];

export async function GET(){
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true
        }
    })
    return NextResponse.json(users)
}

export async function POST(request: NextRequest){
    // const data = await request.json()
    const {email, password} = await request.json()

    if (!email || !password){
        return NextResponse.json({error: 'Missing fields'}, {status: 400})
    }

    const newUser = await prisma.user.create({
        data: {
            email, 
            password
        }
    })

    // users.push({email, password})
    return NextResponse.json(newUser, {status: 201})
}

export async function PUT(request: NextRequest){
    const {id,email, password} = await request.json()

    if (!id || (!email && !password)) {
        return NextResponse.json({error: 'Missing fields'}, {status: 400})
    }

    const updatedUser = await prisma.user.update({
        where: {id},
        data: {
            ...(email && {email}),
            ...(password && {password})
        }
    })

    return NextResponse.json(updatedUser)
}

export async function DELETE(request: NextRequest){
    const {id} = await request.json()

    if (!id){
        return NextResponse.json({error: 'Missing User Id'}, {status: 400})
    }

    await prisma.user.delete({
        where: {id}
    })

    return NextResponse.json({message: 'User ${id} deleted'})
}