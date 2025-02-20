import { prisma } from "../../lib/prisma";
import { Video } from "../../types";

export const uploadVideo = async (payload: Video) => {
  try {
    const video = await prisma.video.create({
      data: {
        url: payload.url,
        description: payload.description || null,
        name: payload.name || null,
        projects: {
          connect: {
            id: payload.project_id,
          },
        },
      },
      select: {
        id: true,
        description: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        url: true,
        status: true,
      },
    });

    return video;
  } catch (err) {
    throw err;
  }
};
