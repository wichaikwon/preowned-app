"use client"
import React, { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { fetchBrands } from "@/app/api/brands"
import { fetchModels } from "@/app/api/models"
import { fetchPhones } from "@/app/api/phones"
import Section from "@/components/section"
import classNames from "classnames"

const Detail: React.FC = () => {
  const [openModel, setOpenModel] = useState(true)
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
  const [price, setPrice] = useState<number>(1)
  const test = () => {
    let calculatedPrice = findPhone.original_price
    if (selectedModel === "เครื่องไทย TH") {
      calculatedPrice -= 0
    } else if (selectedModel === "Model ZP 14,15,16 Series") {
      calculatedPrice -= 0
    } else if (selectedModel === "เครื่องนอกโมเดลอื่น") {
      calculatedPrice -= 1000
    }

    if (selectedWanranty === "ประกันเหลือมากกว่า 4 เดือน") {
      calculatedPrice -= 0
    } else if (selectedWanranty === "ประกันเหลือน้อยกว่า 4 เดือน") {
      calculatedPrice -= 300
    } else if (selectedWanranty === "หมดประกัน") {
      calculatedPrice -= 500
    }

    if (selectedMachineCondition === "ไม่มีรอยขีดข่วน") {
      calculatedPrice -= 0
    } else if (selectedMachineCondition === "มีรอยนิดหน่อย รอยเคส") {
      calculatedPrice -= 1160
    } else if (selectedMachineCondition === "มีรอยมาก ถลอก สีหลุด") {
      calculatedPrice -= 2320
    } else if (selectedMachineCondition === "ตัวเครื่องมีรอยตก / เบี้ยว / แตก / งอ ") {
      calculatedPrice -= 0.63 * calculatedPrice
    } else if (selectedMachineCondition === "ฝาหลัง / กระจกหลังแตก") {
      calculatedPrice -= 0.51 * calculatedPrice
    }

    if (selectedScreenCondition === "หน้าจอไม่มีรอย") {
      calculatedPrice -= 0
    } else if (selectedScreenCondition === "หน้าจอมีรอยบางๆ") {
      calculatedPrice -= 1160
    } else if (selectedScreenCondition === "หน้าจอมีรอยสะดุด") {
      calculatedPrice -= 2320
    } else if (selectedScreenCondition === "หน้าจอมีรอยแตกชำรุด") {
      calculatedPrice -= 0.55 * calculatedPrice
    }

    if (selectedTouchScreenCondition === "แสดงภาพหน้าจอปกติ") {
      calculatedPrice -= 0
    } else if (selectedTouchScreenCondition === "จุด Bright / ฝุ่นในจอ / ขอบจอเงา") {
      calculatedPrice -= 0.35 * calculatedPrice
    } else if (selectedTouchScreenCondition === "จุด Dead / จุดสี / ลายเส้น / จอปลอม") {
      calculatedPrice -= 0.63 * calculatedPrice
    } else if (selectedTouchScreenCondition === "ไม่สามารถแสดงภาพหน้าจอ") {
      calculatedPrice -= 0.85 * calculatedPrice
    }

    if (selectedBatteryCondition === "แบตเตอรี่ มากกว่า 80%") {
      calculatedPrice -= 0
    } else if (selectedBatteryCondition === "แบตเตอรี่ ต่ำกว่า 80%") {
      calculatedPrice -= 2000
    }

    if (selectedExtension === "มีกล่อง / อุปกรณ์ครบ") {
      calculatedPrice -= 0
    } else if (selectedExtension === "มีกล่อง / อุปกรณ์ไม่ครบ") {
      calculatedPrice -= 0
    } else if (selectedExtension === "ไม่มีกล่อง") {
      calculatedPrice -= 500
    }

    if (selectedDefectCondition.includes("ไม่มีปัญหา")) {
      calculatedPrice -= 0
    } else if (selectedDefectCondition.includes("ระบบสัมผัส")) {
      calculatedPrice -= 0.37 * calculatedPrice
    } else if (selectedDefectCondition.includes("wifi Bluetooth GPS")) {
      calculatedPrice -= 0.15 * calculatedPrice
    } else if (selectedDefectCondition.includes("ระบบสั่น")) {
      calculatedPrice -= 0
    } else if (selectedDefectCondition.includes("โทรออก, รับสาย มีปัญหา")) {
      calculatedPrice -= 0.37 * calculatedPrice
    } else if (selectedDefectCondition.includes("สแกนนิ้ว, Face Scan")) {
      calculatedPrice -= 0.45 * calculatedPrice
    } else if (selectedDefectCondition.includes("ปุ่มHomeมีปัญหา")) {
      calculatedPrice -= 0.49 * calculatedPrice
    } else if (selectedDefectCondition.includes("ลำโพงบน ล่าง")) {
      calculatedPrice -= 0
    } else if (selectedDefectCondition.includes("กล้องหน้า หลัง แฟลช")) {
      calculatedPrice -= 0.45 * calculatedPrice
    } else if (selectedDefectCondition.includes("Sensor")) {
      calculatedPrice -= 0.49 * calculatedPrice
    } else if (selectedDefectCondition.includes("ปุ่มล็อก power volume")) {
      calculatedPrice -= 0.65 * calculatedPrice
    }

    setPrice(calculatedPrice)
  }
  return (
    <div className="flex flex-col bg-yellow-300 md:flex-row md:p-4">
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border bg-white p-4">
        <p>
          ระบุข้อมูลการขาย {formData.brand} {formData.model} {formData.storage}
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-slate-100 p-2">
          <Section
            title="Model"
            state={openModel}
            setState={setOpenModel}
            selected={Array.isArray(selectedModel) ? selectedModel.join(", ") : selectedModel}
            setSelected={(value) => {
              setSelectedModel(value)
              setOpenWanranty(true)
            }}
            options={["เครื่องไทย TH", "Model ZP 14,15,16 Series", "เครื่องนอกโมเดลอื่น"]}
          />
          <Section
            title="Warranty"
            state={openWanranty}
            setState={setOpenWanranty}
            selected={selectedWanranty}
            setSelected={(value) => {
              setSelectedWanranty(value)
              setOpenMachineCondition(true)
            }}
            options={["ประกันเหลือมากกว่า 4 เดือน", "ประกันเหลือน้อยกว่า 4 เดือน", "หมดประกัน"]}
          />
          <Section
            title="Machine"
            state={openMachineCondition}
            setState={setOpenMachineCondition}
            selected={selectedMachineCondition}
            setSelected={(value) => {
              setSelectedMachineCondition(value)
              setOpenScreenCondition(true)
            }}
            options={[
              "ไม่มีรอยขีดข่วน",
              "มีรอยนิดหน่อย รอยเคส",
              "มีรอยมาก ถลอก สีหลุด",
              "ตัวเครื่องมีรอยตก / เบี้ยว / แตก / งอ ",
              "ฝาหลัง / กระจกหลังแตก",
            ]}
          />
          <Section
            title="Screen"
            state={openScreenCondition}
            setState={setOpenScreenCondition}
            selected={selectedScreenCondition}
            setSelected={(value) => {
              setSelectedScreenCondition(value)
              setOpenTouchScreenCondition(true)
            }}
            options={["หน้าจอไม่มีรอย", "หน้าจอมีรอยบางๆ", "หน้าจอมีรอยสะดุด", "หน้าจอมีรอยแตกชำรุด"]}
          />
          <Section
            title="TouchScreen"
            state={openTouchScreenCondition}
            setState={setOpenTouchScreenCondition}
            selected={selectedTouchScreenCondition}
            setSelected={(value) => {
              setSelectedTouchScreenCondition(value)
              setOpenBatteryCondition(true)
            }}
            options={[
              "แสดงภาพหน้าจอปกติ",
              "จุด Bright / ฝุ่นในจอ / ขอบจอเงา",
              "จุด Dead / จุดสี / ลายเส้น / จอปลอม",
              "ไม่สามารถแสดงภาพหน้าจอ",
            ]}
          />
          <Section
            title="Battery"
            state={openBatteryCondition}
            setState={setOpenBatteryCondition}
            selected={selectedBatteryCondition}
            setSelected={(value) => {
              setSelectedBatteryCondition(value)
              setExtension(true)
            }}
            options={["แบตเตอรี่ มากกว่า 80%", "แบตเตอรี่ ต่ำกว่า 80%"]}
          />
          <Section
            title="Extension"
            state={extension}
            setState={setExtension}
            selected={selectedExtension}
            setSelected={(value) => {
              setSelectedExtension(value)
              setDefectCondition(true)
            }}
            options={["มีกล่อง / อุปกรณ์ครบ", "มีกล่อง / อุปกรณ์ไม่ครบ", "ไม่มีกล่อง"]}
          />
          <Section
            title="Defect (select more 1 choice)"
            state={defectCondition}
            setState={setDefectCondition}
            selected={selectedDefectCondition}
            setSelected={(value) => {
              setSelectedDefectCondition(value)
            }}
            options={[
              "ระบบสัมผัส",
              "wifi Bluetooth GPS",
              "ระบบสั่น",
              "โทรออก, รับสาย มีปัญหา",
              "สแกนนิ้ว, Face Scan",
              "ปุ่มHomeมีปัญหา",
              "ลำโพงบน ล่าง",
              "กล้องหน้า หลัง แฟลช",
              "Sensor",
              "ปุ่มล็อก power volume",
              "ไม่มีปัญหา",
            ]}
            isMultiSelect={true}
          />
        </div>
        <button onClick={test} className="w-full rounded-md bg-black p-2 text-sm text-white md:w-3/12">
          ประเมินราคา
        </button>
        <button className="w-full rounded-md border p-2 text-sm text-black md:hidden">ย้อนกลับ</button>
      </div>
      <div className="w-full items-start justify-center sm:flex">
        <div className={classNames("flex text-2xl", { hidden: price === 1 })}>
          ราคาประเมิน &nbsp; <p className="text-green-500">{price < 0 ? 0 : price}</p>&nbsp; บาท
          ราคา &nbsp; <p className="text-green-500">{price < 0 ? 0 : price}</p>&nbsp; บาท
        </div>
      </div>
    </div>
  )
}

const DetailPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Detail />
    </Suspense>
  )
}

export default DetailPage
