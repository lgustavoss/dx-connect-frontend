import type { ReactNode } from 'react'

export interface FieldProps {
  name: string
  label?: ReactNode
  helpText?: ReactNode
  required?: boolean
  isInvalid?: boolean
  errorMessage?: ReactNode
  children: ReactNode
}

export default function Field(props: FieldProps) {
  const { name, label, helpText, required, isInvalid, errorMessage, children } = props
  return (
    <div data-field={name} className={`dxc-field${isInvalid ? ' is-invalid' : ''}`}>
      {label && (
        <div className="dxc-input-label">
          {label}
          {required && <span className="dxc-required"> *</span>}
        </div>
      )}
      {children}
      {helpText && <div className="dxc-help">{helpText}</div>}
      {isInvalid && errorMessage && <div className="dxc-error">{errorMessage}</div>}
    </div>
  )}


