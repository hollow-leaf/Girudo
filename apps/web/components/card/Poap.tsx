import Image from "next/image";
import { CalendarDays, PartyPopper } from "lucide-react";
import { datetimeFormatter } from "@/lib/sui/format";

interface Props {
  image_url: string;
  name: string;
  start: string;
  end: string;
}

export function POAP({ image_url, name, start, end }: Props) {
  return (
    <div className="flex justify-center w-[150px] md:w-56 m-2 md:m-4 p-1 md:p-4 cursor-pointer glass border-2  border-cBlue rounded-lg shadow">
      <div>
        <div>
          <Image
            src={image_url}
            width={180}
            height={180}
            alt="Picture of the author"
          />
        </div>
        <div className="mt-2 text-black">
          <div className="flex items-center gap-2">
            <PartyPopper size={16} />
            <div className="text-sm md:text-lg">{name}</div>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} strokeWidth={1} />
            <div className="text-sm flex flex-col gap-1">
              <span>From: {datetimeFormatter(start)}</span>
              <span>To: {datetimeFormatter(end)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
