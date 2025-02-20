import { prisma } from "../../lib/prisma";
import { User } from "../../types";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// export const clerkSignin = async (payload:User)=>{
//     try {
//         if(!JWT_SECRET){throw new Error(`Please Provide Valid JWT Secret key`)}
//         const checkUser = await prisma.users.findUnique({
//             where:{
//                 email:payload.email,
//                 password:payload.password
//             }, select:{
//                 id:true,
//                 email:true,
//                 password:true,
//                 username:true,
//                 createdAt:true,
//                 updatedAt:true,
//             }
//         })

//         if(checkUser?.id){
//             const token = sign({id:checkUser.id},JWT_SECRET)
//             let user = checkUser
//             return {token,user}
//         } else {
//             const createdUser = await prisma.users.create({
//                 data:{
//                     username:payload.username,
//                     email:payload.email,
//                     password:payload.password,
//                 }, select:{
//                     id:true,
//                     email:true,
//                     password:true,
//                     username:true,
//                     createdAt:true,
//                     updatedAt:true,
//                 }
//             })
//             const token = sign({id:createdUser.id},JWT_SECRET)
//             let user = createdUser
//             return {token,user}

//         }

//     } catch (err){
//         throw err
//     }
// }

export const signin = async (payload: Pick<User, "email" | "password">) => {
  try {
    if (!JWT_SECRET) {
      throw new Error(`Please Provide Valid JWT Secret key`);
    }
    const checkUser = await prisma.users.findUnique({
      where: {
        email: payload.email,
        password: payload.password,
      },
      select: {
        id: true,
        email: true,
        password: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (checkUser?.id) {
      const token = sign({ id: checkUser.id }, JWT_SECRET);
      let user = checkUser;
      return { token, user };
    }
  } catch (err) {
    throw err;
  }
};

export const signup = async (payload: User) => {
  try {
    if (!JWT_SECRET) {
      throw new Error(`Please Provide Valid JWT Secret key`);
    }
    const checkUser = await prisma.users.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
      },
    });

    if (checkUser?.id) {
      throw new Error(`Email Already Exists`);
    }

    const checkUsername = await prisma.users.findUnique({
      where: {
        username: payload.username,
      },
      select: {
        id: true,
      },
    });

    if (checkUsername?.id) {
      throw new Error(`Username Already Exists`);
    }

    const createdUser = await prisma.users.create({
      data: {
        username: payload.username,
        email: payload.email,
        password: payload.password,
      },
      select: {
        id: true,
        email: true,
        password: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const token = sign({ id: createdUser.id }, JWT_SECRET);
    let user = createdUser;
    return { token, user };
  } catch (err) {
    throw err;
  }
};
