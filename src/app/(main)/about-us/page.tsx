import { teamMembers } from "@/app/constants/team-members";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Metadata } from "next";
import Link from "next/link";

// METADATA
export const metadata: Metadata = {
  title: "About Us",
};


export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-card rounded-md">
      {/* <header className="py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-primary">Our Company</h1>
        </div>
      </header> */}

      <main className="container mx-auto px-4 py-12">
        <section className="mb-20 text-center">
          <h2 className="text-4xl font-extrabold text-primary mb-4">
            About Us
          </h2>
          <p className="text-xl max-w-4xl mx-auto">
            We&apos;re a passionate team dedicated to creating innovative
            solutions that make a difference. Our mission is to empower
            businesses and individuals through cutting-edge technology and
            exceptional service.
          </p>
        </section>

        <section className="mb-20 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Our Mission
          </h2>

          <p className="text-lg leading-relaxed text-center max-w-6xl">
            At Our Company, we strive to revolutionize the industry by
            delivering unparalleled value to our clients. We believe in
            fostering innovation, embracing challenges, and continuously pushing
            the boundaries of what&apos;s possible. Our commitment to excellence
            and customer satisfaction drives everything we do.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Our Team
          </h2>
          <div className="flex space-x-8 pb-8">
            <InfiniteMovingCards items={teamMembers} speed="slow" />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Join Our Journey
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We&apos;re always looking for talented individuals to join our team.
            If you&apos;re passionate about technology and want to make a
            difference, we&apos;d love to hear from you.
          </p>
          <Link href={"/"}>
            <Button className="bg-primary hover:bg-primary/70 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300">
              Follow Us
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
