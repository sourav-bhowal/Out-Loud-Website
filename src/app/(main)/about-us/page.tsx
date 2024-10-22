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
          <p className="text-lg max-w-5xl mx-auto">
            At Out Loud, we are dedicated to fostering a vibrant culture of
            intellectual discourse and artistic expression among college and
            university students. We aim to cultivate a spirit of fine arts, inspiring
            students to explore their passions and engage with the world around
            them. Join us in celebrating the power of words and art to transform
            ideas and ignite change.
          </p>
        </section>

        <section className="mb-20 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Our Mission
          </h2>

          <p className="text-lg leading-relaxed text-center max-w-6xl">
            At the heart of our mission is the belief that meaningful dialogue
            and creative expression are essential to personal and societal
            growth. We are committed to fostering a dynamic culture of debate on
            significant national and international issues, helping college and
            university students develop critical thinking and effective
            communication skills. Additionally, we seek to inspire a passion for
            poetry, literary creativity, and the fine arts, offering students
            the opportunity to explore and express their talents in a supportive
            and enriching environment.
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
