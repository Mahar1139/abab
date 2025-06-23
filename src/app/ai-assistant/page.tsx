
import SchoolInfoChatbot from "@/components/ai/SchoolInfoChatbot";

export default function AIAssistantPage() {
  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-black">
      {/* Animated Gradient Background Container */}
      <div className="absolute inset-0 -z-20 h-full w-full opacity-50">
          {/* Layer 1 */}
          <div
              className="absolute h-full w-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 animate-gradient-flow-right"
          />
          {/* Layer 2 */}
           <div
              className="absolute h-full w-full bg-gradient-to-tl from-green-400 via-cyan-500 to-blue-600 animate-gradient-flow-up mix-blend-screen"
          />
          {/* Layer 3 */}
          <div
              className="absolute h-full w-full bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 animate-gradient-flow-diagonal mix-blend-screen"
          />
      </div>
      {/* Frosted Glass Overlay */}
       <div className="absolute inset-0 -z-10 h-full w-full bg-black/30 backdrop-blur-2xl"></div>
      
      {/* Content */}
      <div className="relative z-0 flex flex-col h-full">
        <SchoolInfoChatbot />
      </div>
    </div>
  );
}
