import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tight text-foreground group-hover:text-blue-600 transition-colors">
                MediCare <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Connect</span>
              </span>
              <span className="text-[10px] text-blue-500 font-bold tracking-widest uppercase hidden sm:block">
                Healthcare System
              </span>
            </div>
        </Link>
    );
};

export default Logo;