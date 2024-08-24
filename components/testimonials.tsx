import { dataTestimonials } from "@/data";
import Title from "./shared/title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const Testimonials = () => {
  return (
    <div className="p-4 md:px-12 md:py-44 max-w-5xl mx-auto">
      <Title title="Testimonios" subtitle="Reviews de los clientes" />
      <Carousel className="mx-auto mt-6">
        <CarouselContent className="mx-10 gap-8">
          {dataTestimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="md:basis-1/3 p-4 text-center flex flex-col items-center border-slate-400 border-2 rounded-lg"
            >
              <Avatar>
                <AvatarImage src={testimonial.imageUrl} alt="Profile avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="min-h-12 text-2xl mt-4">{testimonial.name}</p>
                <p>{testimonial.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Testimonials;
