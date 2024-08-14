"use client";

import { formatTime } from "@/utils/utils";
import React from "react";

interface TimelineProps {
  eventData: GameEvent[];
}

export function Timeline({ eventData }: TimelineProps) {
    const filteredEvents = eventData.filter(
      (event) => event.EventName !== "ChampionKill"
    ).reverse();
    return (
        <>

          <div className="overflow-y-auto p-4 bg-base-200  rounded-lg">
          <h2 className="card-title text-center">Event Timeline</h2>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact w-[350px] timeline-vertical">
              {filteredEvents.map((event) => (
                <li key={event.EventID}>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-start mb-10">
                    <time className="font-mono italic">{formatTime(event.EventTime)}</time>
                    <div className="text-lg font-black">{event.EventName}</div>
                    {event.Assisters && (
                      <p className="text-sm text-gray-500">
                        Assisters: {event.Assisters.join(", ")}
                      </p>
                    )}
                    {event.KillerName && (
                      <p className="text-sm text-gray-500">Killer: {event.KillerName}</p>
                    )}
                    {event.TurretKilled && (
                      <p className="text-sm text-gray-500">
                        Turret Killed: {event.TurretKilled}
                      </p>
                    )}
                  </div>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    }
    
    export default Timeline;