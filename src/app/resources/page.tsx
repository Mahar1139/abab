import SectionWrapper from "@/components/shared/SectionWrapper";
import ResourceLink from "@/components/resources/ResourceLink";
import { resources } from "./resources-data";
import type { DownloadableResource as ResourceType } from "@/types";

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-8">
      <SectionWrapper title="Downloadable Resources">
        <p className="text-center text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
          Access important documents, forms, and guides. All resources are available in PDF format for your convenience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {resources.map((resource: ResourceType) => (
            <ResourceLink key={resource.id} resource={resource} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
