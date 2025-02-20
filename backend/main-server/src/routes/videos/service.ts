import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../../lib/prisma";
import { getMimeType, s3 } from "../../lib/s3";
import { Video } from "../../types";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

export const getPresignedUrl = async (payload: any) => {
  try {
    const { ext, exp } = payload;
    const date = new Date().getTime();
    const command = new PutObjectCommand({
      Bucket: "garun-surveillance-video",
      Key: `uploads/${date}-file.${ext}`,
      // Expires: exp || 3600 ,
      ContentType: getMimeType(ext),
    });

    console.log(payload);

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
  } catch (err) {
    throw err;
  }
};
