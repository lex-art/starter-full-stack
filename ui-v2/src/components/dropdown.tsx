import { useTranslations } from 'next-intl'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from './ui/select'

interface DropdownProps {
  label: string
  placeholder?: string
  options: {
    label: string
    value: string
  }[]
}

export default function Dropdown({
  label,
  placeholder,
  options
}: DropdownProps) {
  const t = useTranslations()
	return (
		<Select>
			<SelectTrigger className="w-[280px]">
				<SelectValue placeholder={placeholder ?? t('elements.selectAnOption')} />
			</SelectTrigger>
			<SelectContent>
        <SelectGroup>
          {/* <SelectLabel>{label}</SelectLabel> */}
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
          </SelectGroup>
			
			</SelectContent>
		</Select>
	)
}
