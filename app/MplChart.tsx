"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const MplChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: html, error, isLoading } =     useQuery({
    queryKey: ["data"],
    queryFn: () => axios.get("/images/chart.html").then((res) => res.data),
    staleTime: 500, 
    retry: 3,
    refetchInterval: 1000, // refetch every 3 seconds
  })

  useEffect(() => {
    if (html && containerRef.current) {
      containerRef.current.innerHTML = html;
      const scripts = containerRef.current!.getElementsByTagName("script");
      for (let script of scripts) {
        const newScript = document.createElement("script");
        newScript.innerHTML = script.innerHTML;
        document.body.appendChild(newScript);
      }
    }
  }, [html, containerRef]);



  return <div ref={containerRef}></div>;
};

export default MplChart;
