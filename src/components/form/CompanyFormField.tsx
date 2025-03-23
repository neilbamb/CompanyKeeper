
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompanyFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

const CompanyFormField: React.FC<CompanyFormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} {required && <span className="text-red-500">*</span>}</Label>
      <Input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={error ? "border-red-500" : ""}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CompanyFormField;
