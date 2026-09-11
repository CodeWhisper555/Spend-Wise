import { Bell, Moon, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

function Settings() {
  const [profile, setProfile] = useState({
    name: "SpendWise User",
    email: "user@example.com",
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    notifications: true,
    weeklySummary: true,
  });

  const updateProfile = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const togglePreference = (field) => {
    setPreferences((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  return (
    
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/35">
            Preferences
          </p>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Manage your profile and application preferences.
          </p>
        </div>

        <Card>
          <div className="flex items-center gap-3 border-b border-white/[0.07] pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9a928]/10 text-[#d9a928]">
              <UserRound size={19} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white/85">
                Profile information
              </h2>
              <p className="mt-1 text-xs text-white/35">
                Update your personal account details.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Input
              label="Name"
              value={profile.name}
              onChange={(value) => updateProfile("name", value)}
              placeholder="Enter your name"
            />

            <Input
              label="Email address"
              inputType="email"
              value={profile.email}
              onChange={(value) => updateProfile("email", value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button>Save changes</Button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 border-b border-white/[0.07] pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9a928]/10 text-[#d9a928]">
              <Bell size={19} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white/85">
                Notifications
              </h2>
              <p className="mt-1 text-xs text-white/35">
                Choose which updates you want to receive.
              </p>
            </div>
          </div>

          <div className="mt-2 divide-y divide-white/[0.07]">
            <PreferenceRow
              title="Expense reminders"
              description="Receive reminders to record your daily expenses."
              checked={preferences.notifications}
              onChange={() => togglePreference("notifications")}
            />

            <PreferenceRow
              title="Weekly spending summary"
              description="Get a summary of your spending activity each week."
              checked={preferences.weeklySummary}
              onChange={() => togglePreference("weeklySummary")}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 border-b border-white/[0.07] pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9a928]/10 text-[#d9a928]">
              <Moon size={19} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white/85">
                Appearance
              </h2>
              <p className="mt-1 text-xs text-white/35">
                Customize how SpendWise looks on your device.
              </p>
            </div>
          </div>

          <div className="mt-2">
            <PreferenceRow
              title="Dark mode"
              description="Use the dark interface for a comfortable viewing experience."
              checked={preferences.darkMode}
              onChange={() => togglePreference("darkMode")}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 border-b border-white/[0.07] pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9a928]/10 text-[#d9a928]">
              <ShieldCheck size={19} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white/85">
                Privacy and security
              </h2>
              <p className="mt-1 text-xs text-white/35">
                Your financial information stays private.
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-white/45">
            SpendWise stores your local preferences securely in your browser.
            No financial information is shared with third parties.
          </p>
        </Card>
      </div>
    
  );
}

function PreferenceRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-5 py-5">
      <div>
        <p className="text-sm font-medium text-white/80">{title}</p>
        <p className="mt-1 max-w-xl text-xs leading-5 text-white/35">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#d9a928]" : "bg-white/[0.12]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export default Settings;