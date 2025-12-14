import EasyPost from "@easypost/api";

export function getEasyPostClient() {
  const key = process.env.EASYPOST_API_KEY;
  if (!key) throw new Error("Missing EASYPOST_API_KEY");
  return new EasyPost(key);
}
