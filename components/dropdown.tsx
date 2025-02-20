"use client"
import classNames from "classnames"
import React, { Fragment, useState } from "react"

interface DropdownProps {
  label: string
  options: { id: number; name: string }[]
  selected: string
  setSelected: (value: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, setSelected }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const filteredOptions = options.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <Fragment>
      <div className="relative">
        <button onClick={() => setOpen(!open)} className="flex w-full rounded-lg border p-2">
          {selected || label}
        </button>
        {open && (
          <div className="absolute z-20 w-full rounded-lg border bg-white p-2">
            <input
              className="w-full rounded-lg border p-2"
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`ค้นหา${label}`}
            />
            <div className="flex flex-col gap-2 pt-2">
              {filteredOptions.map((item) => (
                <button
                  key={item.id}
                  className="flex rounded-lg p-2 hover:bg-gray-200"
                  onClick={() => {
                    setOpen(false)
                    setSelected(item.name)
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        className={classNames("fixed inset-0 z-10 h-full w-full bg-black", open ? "bg-opacity-0" : "hidden")}
        onClick={() => setOpen(false)}
      ></div>
    </Fragment>
  )
}
export default Dropdown
