/**
 * 《React进阶指南》-第八章demo
 */
import React from "react";
import { getRandomRgbaColor } from "../../utils/random";

export default function RandomComponent() {
  wait();
  return (
    <div
      style={{ width: 100, height: 100, backgroundColor: getRandomRgbaColor() }}
    />
  );
}

const wait = () => {
  for (let i = 0; i < 1000000000; i++);
};
