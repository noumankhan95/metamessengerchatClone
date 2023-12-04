"use client";
import { useRouter } from "next/navigation";

function SingleConversation({ u }: any) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/Chat?id=${u._id}&email=${u.email}`);
      }}
    >
      {u._id}
      {u.name}
    </div>
  );
}

export default SingleConversation;
