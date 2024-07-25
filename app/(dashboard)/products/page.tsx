"use client"

import React, { useEffect, useState } from 'react'

import { DataTable } from '@/components/customui/DataTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Loader from '@/components/customui/Loader';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from '@/components/products/ProductColumns';

const Product = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType[]>([]);

  const getProduct = async () => {
    try{
      const res = await fetch("api/products",{
        method: "GET",
      })
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    } catch(err){
      console.log("[products_GET]", err)
    }
  }
   
  useEffect(() =>{
    getProduct();
  },[])

  return loading ? <Loader /> : (
    <div className='px-10 py-5'>
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Products</p>
        <Button className="bg-blue-1 text-white" onClick={() => router.push("/products/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={product} searchKey="title" />
    </div>
  )
}

export default Product