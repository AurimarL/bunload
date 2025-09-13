import config from "@payload-config";
import { headers as getHeaders } from "next/headers";
import Image from "next/image";
import { getPayload } from "payload";
import type React from "react";
import type { Media } from "@/payload-types";

const ProfilePicture: React.FC = async () => {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  return (
    <Image
      style={{
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
      src={
        (user?.photo as Media).url ||
        "https://www.gravatar.com/avatar/218644472ede33e83ae2002c4f4336d3?default=mp&r=g&s=50"
      }
      alt="yas"
      width={25}
      height={25}
    />
  );
};

export default ProfilePicture;
