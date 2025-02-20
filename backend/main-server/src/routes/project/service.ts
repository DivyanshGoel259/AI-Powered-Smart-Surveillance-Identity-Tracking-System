import { prisma } from "../../lib/prisma";
import { Project } from "../../types";

export const createProject = async (payload: Project) => {
  try {
    console.log();
    const project = await prisma.project.create({
      data: {
        name: payload.name,
        description: payload.description,
        user: {
          connect: {
            id: payload.user_id,
          },
        },
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        description: true,
      },
    });

    return project;
  } catch (err) {
    throw err;
  }
};

export const getProject = async (user_id: string, project_id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: project_id,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        description: true,
        videos: {
          select: {
            id: true,
            description: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            url: true,
            status: true,
          },
        },
        targets: {
          select: {
            id: true,
            images_url: true,
            createdAt: true,
            updatedAt: true,
            name: true,
            type: true,
          },
        },
        report: {
          select: {
            id: true,
            status: true,
            suspectDetails: {
              select: {
                id: true,
                report_id: true,
                target_id: true,
                timestamps: true,
                video_id: true,
              },
            },
          },
        },
      },
    });

    return project;
  } catch (err) {
    throw err;
  }
};

export const getProjects = async (user_id: string) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        user_id: user_id,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        description: true,
      },
    });

    return projects;
  } catch (err) {
    throw err;
  }
};
