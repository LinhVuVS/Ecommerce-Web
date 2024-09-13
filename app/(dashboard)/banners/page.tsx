"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { columns } from "@/components/banner/BannerColumns";
import { DataTable } from "@/components/customui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/customui/Loader";

const Banner = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState([]);

  const getBanner = async () => {
    try {
      const res = await fetch("/api/banners", {
        method: "GET",
      });
      const data = await res.json();
      setBanner(data);
      setLoading(false);
    } catch (err) {
      console.log("[banner_GET]", err);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Banner</p>
        <Button className="bg-blue-1 text-white" onClick={() => router.push("/banners/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Banner
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={banner} searchKey="title" />
    </div>
  );
};

export default Banner;