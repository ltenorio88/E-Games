"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

interface BannerPromotion {
  id: number;
  title: string;
  description: string;
  image: string;
  cta: string;
  link: string;
}

interface BannerCarouselProps {
  promotions: BannerPromotion[];
}

export default function BannerCarousel({ promotions }: BannerCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {promotions.map((promo) => (
          <CarouselItem key={promo.id}>
            <div className="relative h-[500px] w-full overflow-hidden">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <Image
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-start z-20 p-10 md:p-20">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                  {promo.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-xl text-white/90">
                  {promo.description}
                </p>
                <Button
                  size="lg"
                  asChild
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Link href={promo.link}>
                    {promo.cta}
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
