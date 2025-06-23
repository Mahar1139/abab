
import SchoolInfoChatbot from "@/components/ai/SchoolInfoChatbot";

export default function AIAssistantPage() {
  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:250%_250%] animate-gradient-slide -z-10" />
      
      {/* Content */}
      <div className="relative z-0 flex flex-col h-full">
        <SchoolInfoChatbot />
      </div>
    </div>
  );
}
