import Image from "next/image";

const LiveOffersPage = () => {
  return (
    <div className="space-y-6">
      <div className="h-[400px] max-w-[690px] rounded-lg bg-accent p-2">
        <div className="relative h-full w-full">
          <Image
            src="/test.jpg"
            alt="live-offer"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LiveOffersPage;
