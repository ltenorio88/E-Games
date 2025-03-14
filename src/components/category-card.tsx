import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export default function CategoryCard({
  title,
  description,
  icon: Icon,
  href,
}: CategoryCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-gray-700 rounded-xl p-8 text-center transition-all hover:bg-purple-700 hover:shadow-xl">
        <Icon className="w-16 h-16 mx-auto mb-4 text-purple-400 group-hover:text-white" />
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </Link>
  );
}
