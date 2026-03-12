import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import { usePlan } from "@/lib/planContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user, cafeId, loading: authLoading } = useAuth();
  const { setCafeId } = usePlan();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-redirect if already logged in and café resolved
  useEffect(() => {
    if (user && cafeId) {
      setCafeId(cafeId);
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, cafeId]);

  const handleAuth = async () => {
    if (!email || !password) return;
    setLoading(true);

    if (mode === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      }
      // Navigation happens via useEffect once cafeId is resolved
    } else {
      if (!fullName) {
        toast({ title: "Name required", variant: "destructive" });
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account created!", description: "Check your email for verification." });
      }
    }
    setLoading(false);
  };

  // Show loader while checking auth
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="h-10 w-10 rounded-[9px] bg-primary flex items-center justify-center animate-pulse">
          <span className="text-primary-foreground font-bold text-sm font-display">R</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-card">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-background border rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-[9px] bg-primary mb-3">
              <span className="text-primary-foreground font-bold text-lg font-display">R</span>
            </div>
            <h1 className="text-2xl font-display">Revistra</h1>
            <p className="text-sm text-muted-foreground mt-1 font-body">
              {mode === "login" ? "Sign in to your café dashboard" : "Create your café admin account"}
            </p>
          </div>

          <div className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Arjun Mehta"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 h-10 text-sm rounded-xl"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="admin@yourcafe.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 text-sm rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-10 text-sm rounded-xl"
                  onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                />
              </div>
            </div>

            <Button
              className="w-full h-10 text-sm font-semibold rounded-xl"
              onClick={handleAuth}
              disabled={loading || !email || !password}
            >
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            <div className="text-center">
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-xs text-primary font-medium hover:underline"
              >
                {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Need help? Contact support@revistra.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
