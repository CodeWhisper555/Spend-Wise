import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function NotFound() {
  return (
    <AppShell>
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d9a928]/10 text-[#d9a928]">
            <Compass size={30} strokeWidth={1.6} />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#d9a928]">
            Error 404
          </p>

          <h1 className="mt-3 font-display text-2xl font-semibold text-white">
            Page not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/45">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <Link to="/" className="mt-7 inline-block">
            <Button>
              <ArrowLeft size={16} strokeWidth={1.8} />
              Back to dashboard
            </Button>
          </Link>
        </Card>
      </div>
    </AppShell>
  );
}

export default NotFound;