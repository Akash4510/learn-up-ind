import { HomePageContent } from "@/lib/sanity/types";

export const Milestone = ({
  content,
}: {
  content: HomePageContent["milestonesSection"];
}) => {
  return (
    <div className="space-y-10 mt-10 md:mt-20 py-4">
      <div className="lg:text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">
          {content.sectionText}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {content.milestones?.map((milestone) => (
          <div
            key={milestone.subtitle}
            className="flex flex-col md:items-center justify-center gap-2 rounded-md p-4 py-8 md:py-16 bg-gradient-to-tr from-card to-accent border text-primary/90 hover:scale-[102%] transition-all"
          >
            <p className="font-bold text-3xl">{milestone.title}</p>
            <p className="text-2xl">{milestone.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
