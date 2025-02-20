import { prisma } from "../../lib/prisma";
import { Target } from "../../types";

export const createTarget = async (payload: Target) => {
  try {
    const target = await prisma.target.create({
      data: {
        name: payload.name,
        type: payload.type,
        description: payload.description,
        images_url: payload.images_url,
        projects: {
          connect: {
            id: payload.project_id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        images_url: true,
        type: true,
        updatedAt: true,
        description: true,
      },
    });

    return target;
  } catch (err) {
    throw err;
  }
};

export const deleteTarget = async (target_id: string) => {
  try {
    const deletedTarget = await prisma.target.delete({
      where: {
        id: target_id,
      },
      select: {
        id: true,
      },
    });

    return deletedTarget;
  } catch (err) {
    throw err;
  }
};
