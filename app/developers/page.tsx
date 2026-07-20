"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import {
  getApiKeys,
  createApiKey,
  revokeApiKey,
} from "../services/api";

export default function DevelopersPage() {
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKeys();
  }, []);

  async function loadKeys() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const data = await getApiKeys(token);

console.log("RETURNED FROM FUNCTION:", data);
console.log("KEYS:", data?.keys);
console.log("LENGTH:", data?.keys?.length);

setKeys(data?.keys ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

    async function handleCreateKey() {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    console.log("Button clicked");

    await createApiKey(
      token,
      `API Key ${keys.length + 1}`
    );

    console.log("API Key created");

    await loadKeys();
  } catch (error) {
    console.error(error);
  }
}

  async function handleRevokeKey(id: string) {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const confirmed = window.confirm(
  "Are you sure you want to revoke this API Key?"
);

if (!confirmed) {
  return;
}

await revokeApiKey(token, id);

      await loadKeys();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <p>Loading API Keys...</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Developers
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your API credentials and integrations.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            {keys.length} API Key(s) Active
          </p>
        </div>

        <button
          onClick={handleCreateKey}
          className="
            rounded-xl
            bg-green-500
            px-5
            py-3
            font-semibold
            text-black
            transition
            hover:scale-105
          "
        >
          Create API Key
        </button>
      </div>

      <div className="mt-10 space-y-6">
        <p className="text-red-500">
  Total API Keys: {keys.length}
</p>

        {keys.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400">
              No API Keys found.
            </p>
          </div>
        ) : (
          keys.map((key) => (
            <div
              key={key.id}
              className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-6
              "
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    {key.name}
                  </p>

                  <p className="mt-2 font-mono text-white">
                    {key.public_key.slice(0, 15)}***************
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
  Environment: Live
</p>

<p className="text-xs text-green-400">
  Status: Active
</p>
                </div>

                <div className="flex gap-3">

  <button
    onClick={() =>
      navigator.clipboard.writeText(
        key.public_key
      )
    }
    className="
      rounded-xl
      bg-slate-700
      px-4
      py-2
      text-sm
      text-white
    "
  >
    Copy
  </button>

  <button
    onClick={() =>
      handleRevokeKey(key.id)
    }
    className="
      rounded-xl
      bg-red-500
      px-4
      py-2
      text-sm
      text-white
    "
  >
    Revoke
  </button>

</div>
              </div>
            </div>
          ))
        )}

      </div>
    </AppLayout>
  );
}