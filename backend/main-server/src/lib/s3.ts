import { S3Client} from "@aws-sdk/client-s3";

const mimeTypes: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  svg: "image/svg+xml",
  webp: "image/webp",
  webm: "image/webm",
  mp4: "video/mp4",
  mov: "video/quicktime",
  avi: "video/x-msvideo",
  wmv: "video/x-ms-wmv",
  mkv: "video/x-matroska",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  pdf: "application/pdf",
  json: "application/json",
  txt: "text/plain",
  csv: "text/csv",
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  zip: "application/zip",
  tar: "application/x-tar",
  "7z": "application/x-7z-compressed",
};

export function getMimeType(extension: string) {
  return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
}

export const s3 = new S3Client({
  region: "us-east-1", // Change as per your region
  endpoint: `https://${process.env.CLOUDINARY_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});
