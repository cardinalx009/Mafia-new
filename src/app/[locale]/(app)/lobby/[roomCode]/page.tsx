import {LobbyClient} from "./lobby-client";

export default function LobbyPage({
  params,
}: {
  params: Promise<{roomCode: string}>;
}) {
  return <LobbyClient params={params} />;
}

