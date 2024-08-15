"use client";

import React from 'react';
import Image from 'next/image';

interface ChampSelectCardProps {
  championName: string;
  summonerName: string;
  role: string;
}

export function ChampSelectCard({ championName, summonerName, role }: ChampSelectCardProps) {
  return (
    <div className="card-body bg-base-100 p-6 w-full flex items-center">
      <div className="ml-4">
        <div className="text-xl font-bold">{summonerName}</div>
        <div className="text-lg">{role} - {championName}</div>
      </div>
    </div>
  );
}

export default ChampSelectCard;
