import { Button } from "@/components/ui/button";

export function LoginButton() {
  return (
    <div>
      <Button
        className="bg-transparent border-none outline outline-black hover:bg-cBlue"
        variant="outline"
      >
        Sign in
      </Button>
    </div>
  );
}
