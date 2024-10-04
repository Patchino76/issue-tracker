"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const MplChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHtmlContent = async () => {
      const response = await axios.get("/images/chart.html");
      const html = await response.data;

      if (containerRef.current) {
        containerRef.current.innerHTML = html;
      }
      const scripts = containerRef.current!.getElementsByTagName("script");
      for (let script of scripts) {
        const newScript = document.createElement("script");
        newScript.innerHTML = script.innerHTML;
        document.body.appendChild(newScript);
        script.remove();
      }
    };

    fetchHtmlContent();
  }, []);
  return <div ref={containerRef}></div>;
};

export default MplChart;
