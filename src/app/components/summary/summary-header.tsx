import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SummaryHeaderProps {
  title: string
  icon: React.ReactNode
  description: string
}

export function SummaryHeader({
  title,
  description,
  icon,
}: SummaryHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        {icon}
      </div>
      <CardDescription className="text-xs">{description}</CardDescription>
    </CardHeader>
  )
}
