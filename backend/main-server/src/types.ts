export interface AuthResponse {
  data?: any;
  error?: {
    message: string;
  };
}

export interface User {
  id?: string;
  email: string;
  password: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Project {
  id?: string;
  user_id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

type FetchedProjects = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  videos: {
    id: string;
    description: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    status: string;
  }[];
  targets: {
    id: string;
    images_url: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    type: string;
  }[];
  report: {
    id: string;
    status: string;
    suspectDetails: {
      id: string;
      report_id: string;
      target_id: string;
      timestamps: Date;
      video_id: string;
    }[];
  } | null;
};

export interface Video {
  id?: string;
  project_id: string;
  name: string;
  url: string;
  status?: VideoStatus;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum VideoStatus {
  PENDING = "PENDING",

  STARTED = "STARTED",
  FAILED = "FAILED",
  QEUED = "QEUED",
}


export interface Target {
  id:string
  name:string
  type:string,
  images_url:string[]
  createdAt:Date
  updatedAt:Date
  project_id:string
  description:string
}