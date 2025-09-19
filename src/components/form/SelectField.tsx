import { Controller, useFormContext } from 'react-hook-form'
import { useEffect, useMemo, useRef, useState } from 'react'
import Field from './Field'

export interface SelectOption { value: string | number; label: string }
export interface SelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  options: SelectOption[]
  required?: boolean
  helpText?: string
}

export default function SelectField({ name, label, placeholder, options, required, helpText }: SelectFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field name={name} label={label} required={required} helpText={helpText} isInvalid={!!fieldState.error} errorMessage={fieldState.error?.message}>
          <CustomSelect value={field.value} onChange={field.onChange} placeholder={placeholder} options={options} />
        </Field>
      )}
    />
  )
}

interface CustomSelectProps {
  value?: string | number
  onChange: (value: any) => void
  placeholder?: string
  options: SelectOption[]
}

function CustomSelect({ value, onChange, placeholder = 'Selecione', options }: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  const selected = useMemo(() => options.find((o) => String(o.value) === String(value)) ?? null, [options, value])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault(); setOpen(true); setActiveIndex(Math.max(0, options.findIndex((o) => String(o.value) === String(value))))
      return
    }
    if (!open) return
    if (e.key === 'Escape') { setOpen(false); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(options.length - 1, i + 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(0, i - 1)) }
    if (e.key === 'Enter') {
      e.preventDefault()
      const opt = options[activeIndex]
      if (opt) { onChange(opt.value); setOpen(false) }
    }
  }

  return (
    <div className="dxc-select-wrap" ref={wrapRef}>
      <div
        className={`dxc-input dxc-select${open ? ' is-open' : ''}`}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
      >
        <span className={!selected ? 'dxc-placeholder' : undefined}>
          {selected ? selected.label : placeholder}
        </span>
      </div>
      {open && (
        <div className="dxc-select-menu" role="listbox">
          {options.map((opt, idx) => {
            const isSelected = String(opt.value) === String(value)
            const isActive = idx === activeIndex
            return (
              <div
                key={String(opt.value)}
                role="option"
                aria-selected={isSelected}
                className={`dxc-option${isSelected ? ' is-selected' : ''}${isActive ? ' is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => { onChange(opt.value); setOpen(false) }}
              >
                {opt.label}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}


