"use client";

import { formatTime } from "@/utils/utils";
import React from "react";

interface TimelineProps {
  eventData: GameEvent[];
}

export function Timeline({ eventData }: TimelineProps) {
  const filteredEvents = eventData
    .filter((event) => event.EventName !== "ChampionKill")
    .reverse();

  return (
    <div className="overflow-y-auto w-[15vw] h-[35vh] bg-base-100">
      <h2 className="card-title text-center pt-4">Event Timeline</h2>
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {filteredEvents.map((event) => (
          <li key={event.EventID}>
            <div className="timeline-middle">
              <div className="card bg-base-900 p-2 rounded-lg mb-5">
                <time className="font-mono italic">{formatTime(event.EventTime)}</time>
                <div className="text-lg font-black">{event.EventName}</div>
                {event.Assisters && (
                  <p className="text-sm text-base-500">
                    Assisters: {event.Assisters.join(", ")}
                  </p>
                )}
                {event.KillerName && (
                  <p className="text-sm text-base-500">Killer: {event.KillerName}</p>
                )}
                {event.TurretKilled && (
                  <p className="text-sm text-base-500">
                    Turret Killed: {event.TurretKilled}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Timeline;
