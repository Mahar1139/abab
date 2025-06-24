
import SchoolInfoChatbot from "@/components/ai/SchoolInfoChatbot";

export default function AIAssistantPage() {
  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-black">
      {/* Animated Blobs Background Container */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full">
        <div className="relative h-full w-full">
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 mix-blend-screen blur-3xl animate-blob-1" />
          <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 mix-blend-screen blur-3xl animate-blob-2" />
          <div className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mix-blend-screen blur-3xl animate-blob-3" />
          <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-green-400 to-teal-400 mix-blend-screen blur-3xl animate-blob-4" />
        </div>
      </div>

      {/* Frosted Glass Overlay */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-black/30 backdrop-blur-xl"></div>
      
      {/* Content */}
      <div className="relative z-0 flex flex-col h-full">
        <SchoolInfoChatbot />
      </div>
    </div>
  );
}
