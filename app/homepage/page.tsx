"use client"

import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { fetchBrands } from "@/app/api/brands"
import { fetchModels } from "@/app/api/models"
import { fetchPhones } from "@/app/api/phones"
import Dropdown from "@/components/dropdown"

type FormValues = {
  brand: string
  model: string
  storage: string
}

const Homepage: React.FC = () => {
  const { control, watch, setValue, handleSubmit } = useForm<FormValues>()
  const [brand, setBrand] = useState<{ brand_id: number; name: string }[]>([])
  const [model, setModel] = useState<{ brand_id: number; model_id: number; name: string }[]>([])
  const [phone, setPhone] = useState<
    {
      phone_id: number
      brand_id: number
      model_id: number
      storage: string
      original_price: number
    }[]
  >([])

  useEffect(() => {
    async function loadData() {
      setBrand(await fetchBrands())
      setModel(await fetchModels())
      setPhone(await fetchPhones())
    }
    loadData()
  }, [])

  const selectedBrand = watch("brand")
  const selectedModel = watch("model")
  const selectedStorage = watch("storage")

  const submit = handleSubmit((data) => {
    if (!data.brand || !data.model || !data.storage) return
    const queryParams = new URLSearchParams(data as Record<string, string>).toString()
    window.location.href = `detail?${queryParams}`

  })

  return (
    <div className="flex h-fit items-center justify-center bg-yellow-300 p-4">
      <div className="flex w-full flex-col gap-4 rounded-lg border bg-white p-4 md:w-9/12">
        <p className="flex justify-center text-lg font-bold">ประเมินราคาโทรศัพท์ที่ต้องการขาย</p>
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="เลือกยี่ห้อโทรศัพท์"
              options={brand
          .filter((b) => b.brand_id === 1)
          .map((b) => ({ id: b.brand_id, name: b.name }))}
              selected={field.value}
              setSelected={(value) => {
                field.onChange(value)
                setValue("model", "")
                setValue("storage", "")
              }}
            />
          )}
        />

        <Controller
          name="model"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="รุ่น"
              options={model
                .filter((m) => brand.find((b) => b.name === selectedBrand)?.brand_id === m.brand_id)
                .map((m) => ({ id: m.model_id, name: m.name }))}
              selected={field.value}
              setSelected={(value) => {
                field.onChange(value)
                setValue("storage", "")
              }}
            />
          )}
        />

        <Controller
          name="storage"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="ความจุ (GB)"
              options={phone
                .filter((p) => model.find((m) => m.name === selectedModel)?.model_id === p.model_id)
                .sort((a, b) => a.phone_id - b.phone_id)
                .map((p) => ({ id: p.phone_id, name: p.storage }))}
              selected={field.value}
              setSelected={field.onChange}
            />
          )}
        />

        <button
          type="button"
          onClick={submit}
          className="w-full rounded-lg bg-yellow-300 p-2 hover:bg-yellow-200 disabled:bg-yellow-100 disabled:text-gray-500"
          disabled={!selectedStorage}
        >
          ประเมินราคา
        </button>
      </div>
    </div>
  )
}

export default Homepage
