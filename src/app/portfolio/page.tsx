import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand/constants';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: `See ${BRAND.name}'s before-and-after transformations across ${BRAND.location.city}. Real homes, real results, lasting systems.`,
};

// Placeholder portfolio projects - to be replaced with Sanity CMS data
const projects = [
  {
    id: '1',
    title: 'Modern Pantry Makeover',
    location: 'Buckhead',
    roomType: 'Kitchen/Pantry',
    description: 'Transformed a chaotic pantry into a streamlined system with clear containers, custom labels, and zone-based organization.',
    beforeImage: '/images/portfolio/project-1.svg',
    afterImage: '/images/portfolio/project-2.svg',
    duration: '6 hours',
    tier: 'Focused Space',
  },
  {
    id: '2',
    title: 'Primary Closet Transformation',
    location: 'Virginia-Highland',
    roomType: 'Closet',
    description: 'Created a boutique-style closet with seasonal rotation, color coordination, and custom drawer organizers.',
    beforeImage: '/images/portfolio/project-3.svg',
    afterImage: '/images/portfolio/project-4.svg',
    duration: '8 hours',
    tier: 'Focused Space',
  },
  {
    id: '3',
    title: 'Home Office Overhaul',
    location: 'Decatur',
    roomType: 'Office',
    description: 'Designed a productive workspace with paper management systems, cable organization, and ergonomic layout.',
    beforeImage: '/images/portfolio/project-5.svg',
    afterImage: '/images/portfolio/project-6.svg',
    duration: '5 hours',
    tier: 'Focused Space',
  },
  {
    id: '4',
    title: 'Whole Kitchen Refresh',
    location: 'Midtown',
    roomType: 'Kitchen',
    description: 'Reorganized cabinets, drawers, and pantry with pull-out systems and custom spice organization.',
    beforeImage: '/images/portfolio/project-1.svg',
    afterImage: '/images/portfolio/project-2.svg',
    duration: '2 days',
    tier: 'Multi-Room',
  },
  {
    id: '5',
    title: 'Playroom & Kids Rooms',
    location: 'Sandy Springs',
    roomType: 'Kids',
    description: 'Created age-appropriate systems that kids can maintain, with labeled bins and rotating toy displays.',
    beforeImage: '/images/portfolio/project-3.svg',
    afterImage: '/images/portfolio/project-4.svg',
    duration: '3 days',
    tier: 'Multi-Room',
  },
  {
    id: '6',
    title: 'Garage to Functional Space',
    location: 'Brookhaven',
    roomType: 'Garage',
    description: 'Installed wall systems, overhead storage, and zones for sports, tools, and seasonal items.',
    beforeImage: '/images/portfolio/project-5.svg',
    afterImage: '/images/portfolio/project-6.svg',
    duration: '2 days',
    tier: 'Multi-Room',
  },
  {
    id: '7',
    title: 'New Home Setup',
    location: 'Inman Park',
    roomType: 'Whole Home',
    description: 'Unpacked and organized an entire home post-move, establishing systems for every room.',
    beforeImage: '/images/portfolio/project-1.svg',
    afterImage: '/images/portfolio/project-2.svg',
    duration: '1 week',
    tier: 'Move Support',
  },
  {
    id: '8',
    title: 'Downsizing Transition',
    location: 'Marietta',
    roomType: 'Whole Home',
    description: 'Helped clients downsize from a 4,000 sq ft home to a 2,000 sq ft condo with thoughtful curation.',
    beforeImage: '/images/portfolio/project-3.svg',
    afterImage: '/images/portfolio/project-4.svg',
    duration: '2 weeks',
    tier: 'Whole-Home',
  },
  {
    id: '9',
    title: 'Luxury Closet Suite',
    location: 'Buckhead',
    roomType: 'Closet',
    description: 'Designed a his-and-hers closet suite with custom cabinetry coordination and accessory displays.',
    beforeImage: '/images/portfolio/project-5.svg',
    afterImage: '/images/portfolio/project-6.svg',
    duration: '3 days',
    tier: 'Multi-Room',
  },
];

const roomTypes = ['All', 'Kitchen/Pantry', 'Closet', 'Office', 'Kids', 'Garage', 'Whole Home'];

export default function PortfolioPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-20 text-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl">
              Our Portfolio
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary/80">
              Real transformations from real {BRAND.location.city} homes. 
              See how {BRAND.name} creates lasting order and calm.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs - Visual only for now, functionality in Phase 2 */}
      <section className="border-b bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {roomTypes.map((type) => (
              <button
                key={type}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  type === 'All'
                    ? 'bg-primary text-secondary'
                    : 'bg-secondary text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Before/After Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  {/* Placeholder for before/after images */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-300 to-neutral-400">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-neutral-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-neutral-500">Before → After</p>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-full bg-accent px-6 py-2 font-medium text-primary">
                      View Project
                    </span>
                  </div>
                  {/* Room type badge */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary">
                    {project.roomType}
                  </span>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    {project.location}, {BRAND.location.state}
                  </p>
                  <p className="mt-3 text-sm text-neutral-600 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t pt-4 text-xs text-neutral-500">
                    <span>{project.duration}</span>
                    <span className="rounded-full bg-accent/10 px-2 py-1 text-accent">
                      {project.tier}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
            Ready for Your Transformation?
          </h2>
          <p className="mt-4 text-neutral-600">
            Your home could be our next success story. Book a consultation 
            and let&apos;s create your personalized plan.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">Book Your Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
