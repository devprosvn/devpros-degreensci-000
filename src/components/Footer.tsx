import logoDeGreenSci from "@/assets/logo-degreensci.png";
import logoDevPros from "@/assets/logo-devpros.png";

export const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={logoDeGreenSci} alt="DeGreenSci" className="h-10 w-10" />
            <div>
              <p className="text-sm font-semibold text-foreground">DeGreenSci</p>
              <p className="text-xs text-muted-foreground">Decentralized Science Platform</p>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>© 2025 DeGreenSci. Built on Sui Blockchain.</p>
            <p className="mt-1">Empowering researchers with Data NFTs</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Developed by</p>
              <p className="text-sm font-semibold text-foreground">DevPros</p>
            </div>
            <img src={logoDevPros} alt="DevPros" className="h-10 w-10 rounded-lg" />
          </div>
        </div>
      </div>
    </footer>
  );
};
