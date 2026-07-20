"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function SettingsPage() {
  const [merchant, setMerchant] = useState<any>({});

  useEffect(() => {
    const merchantData = localStorage.getItem("merchant");

    if (merchantData) {
      setMerchant(JSON.parse(merchantData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("merchant");

    window.location.href = "/login";
  };

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold">
        Settings
      </h1>

      <p className="mt-2 text-slate-500">
        Manage your merchant account.
      </p>

      {/* Company Information */}

      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          Company Information
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm text-slate-500">
              Company Name
            </p>

            <p className="text-white">
              {merchant.company_name || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="text-white">
              {merchant.email || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Security */}

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          Security
        </h2>

        <div className="mt-6 space-y-4">
          <button
            className="
              rounded-xl
              bg-slate-700
              px-5
              py-3
              text-white
            "
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Account */}

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          Account
        </h2>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="
              rounded-xl
              bg-red-500
              px-5
              py-3
              text-white
              hover:bg-red-600
            "
          >
            Logout
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

