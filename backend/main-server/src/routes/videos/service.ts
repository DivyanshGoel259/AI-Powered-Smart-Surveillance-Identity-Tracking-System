import { HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../../lib/prisma";
import { getMimeType, s3 } from "../../lib/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const uploadVideo = async (payload: any) => {
  const { videoId, filename } = payload;

  // Verify R2 upload using headObject
  console.log(`uploadVideo: videoId ${videoId} filename: ${filename}`);
  const headCommand = new HeadObjectCommand({
    Bucket: "garun-surveillance-video",
    Key: `uploads/${videoId}-${filename.trim().toLowerCase()}`,
  });

  const res = await s3.send(headCommand);
  console.log(res);
  if (!res) {
    throw new Error("video not uploaded successfully.");
  }

  try {
    const video = await prisma.video.update({
      where: { id: videoId },
      data: {
        status: "UPLOADED",
        url: `${process.env.R2_PUBLIC_DOMAIN}/uploads/${videoId}-${filename.trim().toLowerCase()}`,
      },
    });

    return video;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPresignedUrl = async (payload: any) => {
  try {
    const { title, description, filename, ext } = payload;

    if (!title && !description && !filename && !ext) {
      throw new Error("Title or description or filename or ext not provided");
    }

    const video = await prisma.video.create({
      data: {
        url: "",
        description,
        name: title,
        status: "QEUED",
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

    const newFileName = `uploads/${video.id}-${filename.trim().toLowerCase()}`;

    console.log(`getPresignedUrl filename ${newFileName}`);

    const command = new PutObjectCommand({
      Bucket: "garun-surveillance-video",
      Key: newFileName,
      ContentType: getMimeType(ext),
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return {
      presignedUrl: url,
      videoId: video.id,
      publicUrl: `${process.env.R2_PUBLIC_DOMAIN}/${newFileName}`,
    };
  } catch (err) {
    throw err;
  }
};