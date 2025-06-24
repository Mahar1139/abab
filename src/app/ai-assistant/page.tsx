
import SchoolInfoChatbot from "@/components/ai/SchoolInfoChatbot";

export default function AIAssistantPage() {
  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-black">
      {/* Animated Blobs Background Container */}
      <div aria-hidden="true" className="absolute inset-0 z-0 h-full w-full opacity-70">
        <div className="relative h-full w-full">
          <div className="absolute -top-20 -left-40 h-[40rem] w-[40rem] rounded-full bg-gradient-to-r from-purple-600 to-blue-900 blur-3xl animate-blob-1" />
          <div className="absolute -bottom-20 -right-40 h-[40rem] w-[40rem] rounded-full bg-gradient-to-r from-pink-300 to-orange-500 blur-3xl animate-blob-2" />
          <div className="absolute top-1/3 left-1/3 h-[30rem] w-[30rem] rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 blur-3xl animate-blob-3" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <SchoolInfoChatbot />
      </div>
    </div>
  );
}
