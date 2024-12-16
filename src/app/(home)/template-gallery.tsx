'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { template } from "@/constants/templates";

export default function TemplateGallery() {
    const isCreatig = false
    return (
        <div className="bg-[#F1F3F4]">
            <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
                <h3 className="font-medium">Start a new document</h3>
                <Carousel>
                    <CarouselContent className="-mt-4">
                        {template.map((template) => (
                            <CarouselItem
                                key={template.id}
                                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
                            >
                                <div className={cn(
                                    "aspect-[3/4] flex flex-col gap-y-2.5",
                                    isCreatig && "pointer-events-none opacity.50"
                                )}>
                                    <button 
                                    disabled={isCreatig}
                                        onClick={() => {}}
                                        style={{
                                            backgroundImage: `url(${template.imageUrl})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                        className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                                    />

                                    <p className="text-sm font-medium truncate">
                                        {template.label}
                                    </p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}