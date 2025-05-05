import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          {/* Optional: Add small logo here if desired */}
          <p className="text-sm font-semibold">כלים AI למורים</p>
        </Link>

        <p className="text-xs text-muted-foreground">
          © {currentYear} כל הזכויות שמורות לחפציה בן ארצי.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 