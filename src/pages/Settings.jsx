import { Bell, Moon, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

function validatePhoneNumber(phone) {
  if (!phone) {
    return "Phone number is required.";
  }

  if (!/^\d+$/.test(phone)) {
    return "Phone number must contain digits only.";
  }

  if (phone.length !== 10) {
    return "Phone number must contain exactly 10 digits.";
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    return "Enter a valid Indian mobile number starting with 6, 7, 8, or 9.";
  }

  if (/^(\d)\1{9}$/.test(phone)) {
    return "Please enter a valid phone number.";
  }

  if (
    phone === "0123456789" ||
    phone === "1234567890" ||
    phone === "0987654321"
  ) {
    return "Please enter a valid phone number.";
  }

  return "";
}

function validateEmail(email) {
  if (!email) {
    return "Email address is required.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return "Enter a valid email address.";
  }

  return "";
}

function Settings() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    notifications: true,
    weeklySummary: true,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load saved user information when Settings opens
  useEffect(() => {
    const savedUser = localStorage.getItem("spendwiseUser");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        setProfile({
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
        });
      } catch (error) {
        console.error("Unable to load profile information:", error);
      }
    }
  }, []);

  const updateProfile = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    if (field === "name") {
      setErrors((current) => ({
        ...current,
        name: value.trim() ? "" : "Name is required.",
      }));
    }

    if (field === "email") {
      setErrors((current) => ({
        ...current,
        email: validateEmail(value.trim()),
      }));
    }

    if (field === "phone") {
      // Allow only digits while typing
      if (!/^\d*$/.test(value)) {
        setErrors((current) => ({
          ...current,
          phone: "Phone number must contain digits only.",
        }));

        return;
      }

      // Limit phone number to 10 digits
      const phoneValue = value.slice(0, 10);

      setProfile((current) => ({
        ...current,
        phone: phoneValue,
      }));

      setErrors((current) => ({
        ...current,
        phone: phoneValue ? validatePhoneNumber(phoneValue) : "",
      }));
    }
  };

  const saveProfile = () => {
    const name = profile.name.trim();
    const email = profile.email.trim().toLowerCase();
    const phone = profile.phone.trim();

    const nameError = name ? "" : "Name is required.";
    const emailError = validateEmail(email);
    const phoneError = validatePhoneNumber(phone);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
    });

    if (nameError || emailError || phoneError) {
      alert("Please correct the errors before saving.");
      return;
    }

    let existingUser = {};

    try {
      existingUser = JSON.parse(
        localStorage.getItem("spendwiseUser") || "{}"
      );
    } catch (error) {
      console.error("Unable to read saved user information:", error);
    }

    const updatedUser = {
      ...existingUser,
      name,
      email,
      phone,
    };

    localStorage.setItem("spendwiseUser", JSON.stringify(updatedUser));

    setProfile({
      name,
      email,
      phone,
    });

    alert("Profile updated successfully.");
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
          <div>
            <Input
              label="Name"
              value={profile.name}
              onChange={(value) => updateProfile("name", value)}
              placeholder="Enter your name"
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <Input
              label="Email address"
              inputType="email"
              value={profile.email}
              onChange={(value) => updateProfile("email", value)}
              placeholder="Enter your email"
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              label="Phone number"
              inputType="tel"
              value={profile.phone}
              onChange={(value) => updateProfile("phone", value)}
              placeholder="Enter your phone number"
              maxLength={10}
              inputMode="numeric"
            />

            {errors.phone && (
              <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
            )}

            <p className="mt-1 text-xs text-white/35">
              Enter a valid 10-digit Indian mobile number.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={saveProfile}>Save changes</Button>
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
