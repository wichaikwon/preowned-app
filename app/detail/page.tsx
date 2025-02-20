"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { fetchBrands } from "@/app/api/brands"
import { fetchModels } from "@/app/api/models"
import { fetchPhones } from "@/app/api/phones"
import classNames from "classnames"

const Detail: React.FC = () => {
  const [openModel, setOpenModel] = useState(false)
  const [openWanranty, setOpenWanranty] = useState(false)
  const [openMachineCondition, setOpenMachineCondition] = useState(false)
  const [openScreenCondition, setOpenScreenCondition] = useState(false)
  const [openTouchScreenCondition, setOpenTouchScreenCondition] = useState(false)
  const [openBatteryCondition, setOpenBatteryCondition] = useState(false)
  const [extension, setExtension] = useState(false)
  const [defectCondition, setDefectCondition] = useState(false)
  const [selectedModel, setSelectedModel] = useState<string | string[]>("")
  const [selectedWanranty, setSelectedWanranty] = useState<string | string[]>("")
  const [selectedMachineCondition, setSelectedMachineCondition] = useState<string | string[]>("")
  const [selectedScreenCondition, setSelectedScreenCondition] = useState<string | string[]>("")
  const [selectedTouchScreenCondition, setSelectedTouchScreenCondition] = useState<string | string[]>("")
  const [selectedBatteryCondition, setSelectedBatteryCondition] = useState<string | string[]>("")
  const [selectedExtension, setSelectedExtension] = useState<string | string[]>("")
  const [selectedDefectCondition, setSelectedDefectCondition] = useState<string | string[] | string[]>([])

  const searchParams = useSearchParams()
  const formData = {
    brand: searchParams?.get("brand") || "",
    model: searchParams?.get("model") || "",
    storage: searchParams?.get("storage") || "",
  }
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
  const findPhone = phone.find(
    (p) =>
      p.brand_id === (brand.find((b) => b.name === formData.brand)?.brand_id || 0) &&
      p.model_id === (model.find((m) => m.name === formData.model)?.model_id || 0)
  ) || { phone_id: 0, brand_id: 0, model_id: 0, storage: "", original_price: 0 }

  return (
    <div className="flex items-center justify-center bg-yellow-300 md:p-4">
      <div className="hidden w-full items-center justify-center sm:flex">
        <p>1</p>
        <p>1</p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border bg-white p-4">
        <p>
          ระบุข้อมูลการขาย {formData.brand} {formData.model} {formData.storage}
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-slate-100 p-2">
          {[
            {
              title: "Model",
              state: openModel,
              setState: setOpenModel,
              selected: selectedModel,
              setSelected: setSelectedModel,
              options: ["เครื่องไทย TH", "Model ZP 14,15,16 Series", "เครื่องนอกโมเดลอื่น"],
            },
            {
              title: "Warranty",
              state: openWanranty,
              setState: setOpenWanranty,
              selected: selectedWanranty,
              setSelected: setSelectedWanranty,
              options: ["ประกันเหลือมากกว่า 4 เดือน", "ประกันเหลือน้อยกว่า 4 เดือน", "หมดประกัน"],
            },
            {
              title: "Machine",
              state: openMachineCondition,
              setState: setOpenMachineCondition,
              selected: selectedMachineCondition,
              setSelected: setSelectedMachineCondition,
              options: [
                "ไม่มีรอยขีดข่วน",
                "มีรอยนิดหน่อย รอยเคส",
                "มีรอยมาก ถลอก สีหลุด",
                "ตัวเครื่องมีรอยตก / เบี้ยว / แตก / งอ ",
                "ฝาหลัง / กระจกหลังแตก",
              ],
            },
            {
              title: "Screen",
              state: openScreenCondition,
              setState: setOpenScreenCondition,
              selected: selectedScreenCondition,
              setSelected: setSelectedScreenCondition,
              options: ["หน้าจอไม่มีรอย", "หน้าจอมีรอยบางๆ", "หน้าจอมีรอยสะดุด", "หน้าจอมีรอยแตกชำรุด"],
            },
            {
              title: "TouchScreen",
              state: openTouchScreenCondition,
              setState: setOpenTouchScreenCondition,
              selected: selectedTouchScreenCondition,
              setSelected: setSelectedTouchScreenCondition,
              options: [
                "แสดงภาพหน้าจอปกติ",
                "จุด Bright / ฝุ่นในจอ / ขอบจอเงา",
                "จุด Dead / จุดสี / ลายเส้น / จอปลอม",
                "ไม่สามารถแสดงภาพหน้าจอ",
              ],
            },
            {
              title: "Battery",
              state: openBatteryCondition,
              setState: setOpenBatteryCondition,
              selected: selectedBatteryCondition,
              setSelected: setSelectedBatteryCondition,
              options: ["แบตเตอรี่ มากกว่า 80%", "แบตเตอรี่ ต่ำกว่า 80%"],
            },
            {
              title: "Extension",
              state: extension,
              setState: setExtension,
              selected: selectedExtension,
              setSelected: setSelectedExtension,
              options: ["มีกล่อง / อุปกรณ์ครบ", "มีกล่อง / อุปกรณ์ไม่ครบ", "ไม่มีกล่อง"],
            },
            {
              title: "Defect (select more 1 choice)",
              state: defectCondition,
              setState: setDefectCondition,
              selected: selectedDefectCondition,
              setSelected: setSelectedDefectCondition,
              options: [
                "ระบบสัมผัส",
                "wifi Bluetooth GPS",
                "ระบบสั่น",
                "โทรออก, รับสาย มีปัญหา",
                "สแกนนิ้ว, Face Scan",
                "ปุ่มHomeมีปัญหา",
                "ลำโพงบน ล่าง",
                "Sensor",
                "ปุ่มล็อก power volume",
                "ไม่มีปัญหา",
              ],
              isMultiSelect: true,
            },
          ].map((item, index) => (
            <div key={index} className="flex w-full flex-col rounded-lg bg-slate-200 p-2">
              <div
              className="flex w-full cursor-pointer items-center justify-between"
              onClick={() => item.setState(!item.state)}
              >
              <p>{item.title}</p>
              <p className="text-xs text-yellow-500">
                {item.isMultiSelect
                ? item.selected.length > 0 && !item.selected.includes("ไม่มีปัญหา")
                  ? `มี ${item.selected.length} ข้อ`
                  : ""
                : item.selected}
              </p>
              </div>
              <div
              className={`overflow-hidden transition-all duration-500 ${
                item.state ? "max-h-96 pt-2 opacity-100" : "max-h-0 opacity-0"
              }`}
              >
              <div
                className={`grid gap-2 ${item.title === "Defect (select more 1 choice)" ? "grid-cols-3" : "grid-cols-1"} md:grid-cols-3 md:gap-4`}
              >
                {item.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => {
                  if (item.isMultiSelect) {
                    item.setSelected((prev) => {
                    if (i === 9) {
                      return ["ไม่มีปัญหา"]
                    }
                    if (prev.includes("ไม่มีปัญหา")) {
                      return [option]
                    }
                    return prev.includes(option)
                      ? Array.isArray(prev)
                      ? prev.filter((defect) => defect !== option)
                      : prev
                      : [...prev, option]
                    })
                  } else {
                    item.setSelected(item.isMultiSelect ? [option] : (option as string))
                    item.setState(false)
                  }
                  }}
                  className={classNames(
                  "flex w-full rounded-lg border bg-white p-2 text-xs text-black hover:border-yellow-500 hover:bg-yellow-50",
                  {
                    "bg-yellow-100": item.isMultiSelect && item.selected.includes(option),
                    "bg-white": !item.isMultiSelect || !item.selected.includes(option),
                  }
                  )}
                >
                  {option}
                </button>
                ))}
              </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full rounded-md bg-black p-2 text-sm text-white md:w-3/12">ประเมินราคา</button>
        <button className="w-full rounded-md border p-2 text-sm text-black md:hidden">ย้อนกลับ</button>
      </div>
    </div>
  )
}

export default Detail
